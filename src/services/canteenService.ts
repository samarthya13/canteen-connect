import { 
  CanteenStatus, 
  FoodItemData, 
  TodayLunchTiffin, 
  QueueRushLevel, 
  CanteenAnnouncement, 
  AvailabilityStatus 
} from '../types';
import { initialCanteenStatus } from '../data/canteenData';
import { 
  getFirebaseServices, 
  isFirebaseConfigured, 
  getAdminUidsConfig, 
  getAdminUidConfig 
} from '../firebase/config';
import { 
  doc, 
  onSnapshot, 
  setDoc, 
  getDoc 
} from 'firebase/firestore';
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  User 
} from 'firebase/auth';

const STORAGE_KEY_STATUS = 'canteen_connect_status_v5';
const SESSION_KEY_ADMIN = 'canteen_admin_auth_v5';
const BROADCAST_CHANNEL_NAME = 'canteen_connect_realtime_v1';

// Cross-tab real-time sync channel
let broadcastChannel: BroadcastChannel | null = null;
if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
  try {
    broadcastChannel = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
  } catch (e) {
    console.warn('BroadcastChannel not supported:', e);
  }
}

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): FirestoreErrorInfo {
  const firebase = getFirebaseServices();
  const currentUser = firebase?.auth.currentUser;
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: currentUser?.uid,
      email: currentUser?.email,
      emailVerified: currentUser?.emailVerified,
      isAnonymous: currentUser?.isAnonymous,
      tenantId: currentUser?.tenantId,
      providerInfo: currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  return errInfo;
}

/**
 * Retrieve cached or default initial canteen status
 */
export const getLocalCanteenStatus = (): CanteenStatus => {
  if (typeof window === 'undefined') return initialCanteenStatus;
  try {
    const saved = localStorage.getItem(STORAGE_KEY_STATUS);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && parsed.menuItems && parsed.menuItems.length > 0 && parsed.todayLunch) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error reading local canteen status:', e);
  }
  return initialCanteenStatus;
};

/**
 * Persist canteen status locally and broadcast to all open tabs
 */
export const saveLocalCanteenStatus = (status: CanteenStatus): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_STATUS, JSON.stringify(status));
    if (broadcastChannel) {
      broadcastChannel.postMessage({ type: 'STATUS_UPDATE', status });
    }
  } catch (e) {
    console.error('Error saving local canteen status:', e);
  }
};

/**
 * Subscribes to real-time updates for CanteenStatus.
 * If Firebase is configured, listens to Firestore `canteen_state/live` via onSnapshot.
 * If Firebase is not yet configured, listens to BroadcastChannel + localStorage storage events.
 */
export const subscribeToCanteenStatus = (
  callback: (status: CanteenStatus) => void
): (() => void) => {
  const firebase = getFirebaseServices();

  if (firebase) {
    const statusDocRef = doc(firebase.db, 'canteen_state', 'live');
    
    // Seed Firestore document if it does not yet exist
    getDoc(statusDocRef).then((snap) => {
      if (!snap.exists()) {
        const local = getLocalCanteenStatus();
        setDoc(statusDocRef, local).catch((err) => {
          handleFirestoreError(err, OperationType.WRITE, 'canteen_state/live');
        });
      }
    }).catch((err) => {
      handleFirestoreError(err, OperationType.GET, 'canteen_state/live');
    });

    const unsubscribe = onSnapshot(
      statusDocRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data() as CanteenStatus;
          saveLocalCanteenStatus(data);
          callback(data);
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, 'canteen_state/live');
      }
    );

    return unsubscribe;
  }

  // Fallback: Multi-tab real-time listener
  const handleBroadcast = (event: MessageEvent) => {
    if (event.data && event.data.type === 'STATUS_UPDATE' && event.data.status) {
      callback(event.data.status);
    }
  };

  const handleStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY_STATUS && e.newValue) {
      try {
        const parsed = JSON.parse(e.newValue);
        callback(parsed);
      } catch {}
    }
  };

  if (broadcastChannel) {
    broadcastChannel.addEventListener('message', handleBroadcast);
  }
  window.addEventListener('storage', handleStorage);

  return () => {
    if (broadcastChannel) {
      broadcastChannel.removeEventListener('message', handleBroadcast);
    }
    window.removeEventListener('storage', handleStorage);
  };
};

/**
 * Updates full or partial CanteenStatus in the shared data store.
 */
export const updateCanteenStatus = async (
  updater: (prev: CanteenStatus) => CanteenStatus
): Promise<CanteenStatus> => {
  const current = getLocalCanteenStatus();
  const updated = updater(current);
  saveLocalCanteenStatus(updated);

  const firebase = getFirebaseServices();
  if (firebase) {
    try {
      const statusDocRef = doc(firebase.db, 'canteen_state', 'live');
      await setDoc(statusDocRef, updated, { merge: true });
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, 'canteen_state/live');
    }
  }

  return updated;
};

/**
 * Update an individual menu item's availability
 */
export const updateMenuItemAvailability = async (
  itemId: string,
  newAvailability: AvailabilityStatus
): Promise<void> => {
  await updateCanteenStatus((prev) => {
    const updatedMenu = (prev.menuItems || []).map((item) =>
      item.id === itemId ? { ...item, availability: newAvailability } : item
    );
    return {
      ...prev,
      menuItems: updatedMenu
    };
  });
};

/**
 * Update Today's Lunch tiffin (Roti, Sabzi 1, Sabzi 2, Dal, Rice, price, etc.)
 */
export const updateTodayLunch = async (
  updatedLunch: TodayLunchTiffin
): Promise<void> => {
  await updateCanteenStatus((prev) => {
    const updatedMenu = (prev.menuItems || []).map((m) => {
      if (m.id === 'l-3' || m.name.toLowerCase().includes('full meal')) {
        return {
          ...m,
          name: `Full Meal (${updatedLunch.sabzi1} + ${updatedLunch.sabzi2})`,
          price: updatedLunch.price,
          availability: (updatedLunch.isAvailable ? 'AVAILABLE' : 'SOLD OUT') as AvailabilityStatus,
          description: `${updatedLunch.roti}, ${updatedLunch.sabzi1}, ${updatedLunch.sabzi2}, ${updatedLunch.dal || 'Dal'} & ${updatedLunch.rice || 'Rice'}.`
        };
      }
      return m;
    });

    return {
      ...prev,
      lunchTiffin: updatedLunch,
      todayLunch: updatedLunch,
      menuItems: updatedMenu
    };
  });
};

/**
 * Update Queue telemetry (rush, wait time, now serving, description)
 */
export const updateQueueTelemetry = async (
  rush: QueueRushLevel,
  waitTime?: string,
  nowServing?: string
): Promise<void> => {
  const wait = waitTime || (rush === 'LOW' ? '1-2 mins' : rush === 'HIGH' ? '8-12 mins' : '4-5 mins');
  await updateCanteenStatus((prev) => ({
    ...prev,
    queueRush: rush,
    queueStatus: rush,
    estimatedWaitTime: wait,
    nowServingToken: nowServing || prev.nowServingToken,
    queueDescription:
      rush === 'LOW'
        ? `Chill vibe — ~${wait} wait at billing counter`
        : rush === 'HIGH'
        ? `Peak rush post-lecture — ~${wait} wait`
        : `Moving steadily — ~${wait} wait at billing counter`
  }));
};

/**
 * Update Announcements on the Canteen Notice Board
 */
export const updateAnnouncements = async (
  announcements: CanteenAnnouncement[]
): Promise<void> => {
  await updateCanteenStatus((prev) => ({
    ...prev,
    announcements
  }));
};

/**
 * Add a new announcement
 */
export const addAnnouncement = async (
  announcement: CanteenAnnouncement
): Promise<void> => {
  await updateCanteenStatus((prev) => ({
    ...prev,
    announcements: [announcement, ...(prev.announcements || [])]
  }));
};

/**
 * Edit an existing announcement
 */
export const editAnnouncement = async (
  updatedAnnouncement: CanteenAnnouncement
): Promise<void> => {
  await updateCanteenStatus((prev) => ({
    ...prev,
    announcements: (prev.announcements || []).map((ann) =>
      ann.id === updatedAnnouncement.id ? updatedAnnouncement : ann
    )
  }));
};

/**
 * Delete an announcement
 */
export const deleteAnnouncement = async (
  announcementId: string
): Promise<void> => {
  await updateCanteenStatus((prev) => ({
    ...prev,
    announcements: (prev.announcements || []).filter((ann) => ann.id !== announcementId)
  }));
};

// ============================================================================
// ADMIN AUTHENTICATION & ROLE AUTHORIZATION SERVICE (UID ENFORCED)
// ============================================================================

export interface AdminAuthResult {
  success: boolean;
  isAdmin: boolean;
  userEmail?: string;
  adminUid?: string;
  errorMessage?: string;
}

/**
 * Check if the active session has verified admin privileges
 */
export const checkAdminSession = (): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    const raw = sessionStorage.getItem(SESSION_KEY_ADMIN);
    if (!raw) return false;
    const session = JSON.parse(raw);
    return session && session.isAdmin === true;
  } catch {
    return false;
  }
};

/**
 * Verify whether a specific Firebase Authentication UID is an authorized Administrator.
 * Checks:
 * 1. VITE_FIREBASE_ADMIN_UID / VITE_FIREBASE_ADMIN_UIDS environment variables
 * 2. Firestore 'admins/{uid}' document exists with role/isAdmin
 * 3. Firestore 'admin_users/{uid}' document exists with role === 'admin'
 */
export const verifyAdminAuthorizationByUid = async (
  uid: string,
  email?: string | null
): Promise<{ authorized: boolean; reason?: string }> => {
  if (!uid) return { authorized: false, reason: 'Missing user UID' };

  // 1. Check environment variable UIDs
  const configuredUids = getAdminUidsConfig();
  if (configuredUids.length > 0) {
    if (configuredUids.includes(uid)) {
      return { authorized: true };
    }
  }

  // 2. Check Firestore RBAC collections (admins/{uid} or admin_users/{uid})
  const firebase = getFirebaseServices();
  if (firebase) {
    try {
      const [adminDoc, userDoc] = await Promise.all([
        getDoc(doc(firebase.db, 'admins', uid)).catch(() => null),
        getDoc(doc(firebase.db, 'admin_users', uid)).catch(() => null)
      ]);

      if (adminDoc && adminDoc.exists()) {
        const data = adminDoc.data();
        if (data?.isAdmin !== false && data?.role !== 'student') {
          return { authorized: true };
        }
      }

      if (userDoc && userDoc.exists()) {
        const data = userDoc.data();
        if (data?.role === 'admin' || data?.isAdmin === true) {
          return { authorized: true };
        }
      }
    } catch (e) {
      console.warn('Firestore admin verification check error:', e);
    }

    // 3. Fallback check for optional admin email in environment
    const env = (import.meta as any).env || {};
    const adminEmail = env.VITE_FIREBASE_ADMIN_EMAIL;
    if (adminEmail && email && email.toLowerCase().trim() === adminEmail.toLowerCase().trim()) {
      return { authorized: true };
    }
  }

  return {
    authorized: false,
    reason: `Firebase UID '${uid}' is not registered as an authorized administrator in VITE_FIREBASE_ADMIN_UID or Firestore.`
  };
};

/**
 * Authenticate admin with credentials and verify UID-based role authorization
 */
export const loginAdmin = async (
  identifier: string,
  password: string
): Promise<AdminAuthResult> => {
  const cleanId = identifier.trim();
  const cleanPass = password.trim();

  if (!cleanId || !cleanPass) {
    return {
      success: false,
      isAdmin: false,
      errorMessage: 'Please enter both your email address and password.'
    };
  }

  const firebase = getFirebaseServices();

  // -------------------------------------------------------------------------
  // 1. PRODUCTION MODE: Firebase Authentication is configured
  // -------------------------------------------------------------------------
  if (firebase) {
    try {
      const email = cleanId.includes('@') ? cleanId : `${cleanId}@moderncoe.edu.in`;
      
      // Real Firebase Authentication sign-in
      const userCredential = await signInWithEmailAndPassword(firebase.auth, email, cleanPass);
      const user = userCredential.user;

      // Determine admin access using the Firebase Authentication UID
      const authCheck = await verifyAdminAuthorizationByUid(user.uid, user.email);

      if (!authCheck.authorized) {
        // Sign out unauthorized user immediately to maintain Zero-Trust
        await signOut(firebase.auth);
        sessionStorage.removeItem(SESSION_KEY_ADMIN);

        const shortUid = user.uid ? `${user.uid.slice(0, 8)}...` : 'Unknown';
        return {
          success: false,
          isAdmin: false,
          errorMessage: `Access Denied: Account '${user.email}' (UID: ${shortUid}) authenticated successfully, but has NOT been granted administrator privileges for Canteen Connect. Non-admin accounts cannot access the Canteen Control Room.`
        };
      }

      // Store authorized administrator session
      sessionStorage.setItem(
        SESSION_KEY_ADMIN,
        JSON.stringify({
          isAdmin: true,
          email: user.email,
          uid: user.uid,
          timestamp: Date.now()
        })
      );

      return {
        success: true,
        isAdmin: true,
        userEmail: user.email || email,
        adminUid: user.uid
      };
    } catch (firebaseError: any) {
      sessionStorage.removeItem(SESSION_KEY_ADMIN);
      let errorMsg = firebaseError.message || 'Firebase authentication failed.';
      
      if (
        firebaseError.code === 'auth/invalid-credential' ||
        firebaseError.code === 'auth/wrong-password' ||
        firebaseError.code === 'auth/user-not-found'
      ) {
        errorMsg = 'Incorrect email or password. Please verify your Firebase administrator credentials.';
      } else if (firebaseError.code === 'auth/too-many-requests') {
        errorMsg = 'Too many failed login attempts. Access has been temporarily locked for security. Please try again later.';
      } else if (firebaseError.code === 'auth/invalid-email') {
        errorMsg = 'Please enter a valid administrator email address.';
      } else if (
        firebaseError.code === 'auth/api-key-not-valid' ||
        String(firebaseError.message || '').includes('api-key-not-valid') ||
        String(firebaseError.message || '').includes('API key not valid')
      ) {
        errorMsg = 'Firebase API Key error: The configured VITE_FIREBASE_API_KEY was rejected by Google Identity Toolkit. Please verify the Web API Key in Firebase Console (Project Settings -> General -> Web API Key) and ensure it is complete and that the Identity Toolkit API is enabled.';
      }

      return {
        success: false,
        isAdmin: false,
        errorMessage: errorMsg
      };
    }
  }

  // -------------------------------------------------------------------------
  // 2. LOCAL OFFLINE DEVELOPMENT MODE (ONLY when Firebase is NOT configured)
  // Demo credentials ONLY function when Firebase config is completely absent.
  // -------------------------------------------------------------------------
  const lowerId = cleanId.toLowerCase();
  const isDemoAdminUser = lowerId === 'admin' || lowerId === 'admin@moderncoe.edu.in' || lowerId === 'canteen';
  const isDemoAdminPass = cleanPass === 'admin123' || cleanPass === 'canteen123';

  if (lowerId.includes('student') || (!isDemoAdminUser && lowerId.includes('@'))) {
    return {
      success: false,
      isAdmin: false,
      errorMessage: `Access Denied: Account '${cleanId}' is registered as a student/staff user and does NOT have administrative privileges. Only cafeteria managers can enter /admin.`
    };
  }

  if (isDemoAdminUser && isDemoAdminPass) {
    sessionStorage.setItem(
      SESSION_KEY_ADMIN,
      JSON.stringify({
        isAdmin: true,
        email: cleanId,
        uid: 'demo-local-admin',
        isLocalDev: true,
        timestamp: Date.now()
      })
    );

    return {
      success: true,
      isAdmin: true,
      userEmail: cleanId.includes('@') ? cleanId : `${cleanId}@moderncoe.edu.in`,
      adminUid: 'demo-local-admin'
    };
  }

  return {
    success: false,
    isAdmin: false,
    errorMessage: 'Invalid credentials. Firebase is not yet connected; configure Firebase environment variables to use real admin accounts.'
  };
};

/**
 * Log out of admin session
 */
export const logoutAdmin = async (): Promise<void> => {
  const firebase = getFirebaseServices();
  if (firebase) {
    try {
      await signOut(firebase.auth);
    } catch (e) {
      console.warn('Error during Firebase signOut:', e);
    }
  }
  try {
    sessionStorage.removeItem(SESSION_KEY_ADMIN);
  } catch {}
};

