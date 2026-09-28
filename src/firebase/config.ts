import { initializeApp, getApps, getApp, deleteApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

export interface FirebaseClientConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId?: string;
  appId: string;
  firestoreDatabaseId?: string;
}

/**
 * Reads Firebase configuration from Vite environment variables or runtime window config.
 * Uses direct static access to import.meta.env per Vite build guidelines, with dynamic fallback.
 * Automatically trims any accidental surrounding whitespace.
 */
export const getFirebaseConfig = (): FirebaseClientConfig | null => {
  // Direct static property access for Vite compiler inlining
  const rawApiKey = import.meta.env.VITE_FIREBASE_API_KEY || (import.meta as any).env?.VITE_FIREBASE_API_KEY || '';
  const rawProjectId = import.meta.env.VITE_FIREBASE_PROJECT_ID || (import.meta as any).env?.VITE_FIREBASE_PROJECT_ID || '';
  const rawAuthDomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || (import.meta as any).env?.VITE_FIREBASE_AUTH_DOMAIN || '';
  const rawStorageBucket = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || (import.meta as any).env?.VITE_FIREBASE_STORAGE_BUCKET || '';
  const rawSenderId = import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || (import.meta as any).env?.VITE_FIREBASE_MESSAGING_SENDER_ID || '';
  const rawAppId = import.meta.env.VITE_FIREBASE_APP_ID || (import.meta as any).env?.VITE_FIREBASE_APP_ID || '';
  const rawDbId = import.meta.env.VITE_FIREBASE_FIRESTORE_DATABASE_ID || (import.meta as any).env?.VITE_FIREBASE_FIRESTORE_DATABASE_ID || '';

  const apiKey = typeof rawApiKey === 'string' ? rawApiKey.trim() : '';
  const projectId = typeof rawProjectId === 'string' ? rawProjectId.trim() : '';

  if (apiKey && projectId) {
    return {
      apiKey,
      authDomain: (typeof rawAuthDomain === 'string' && rawAuthDomain.trim()) 
        ? rawAuthDomain.trim() 
        : `${projectId}.firebaseapp.com`,
      projectId,
      storageBucket: (typeof rawStorageBucket === 'string' && rawStorageBucket.trim()) 
        ? rawStorageBucket.trim() 
        : `${projectId}.appspot.com`,
      messagingSenderId: typeof rawSenderId === 'string' ? rawSenderId.trim() : '',
      appId: typeof rawAppId === 'string' ? rawAppId.trim() : '',
      firestoreDatabaseId: (typeof rawDbId === 'string' && rawDbId.trim()) 
        ? rawDbId.trim() 
        : '(default)'
    };
  }

  // Check if configuration was injected at runtime (e.g. by host environment or window)
  if (typeof window !== 'undefined' && (window as any).__FIREBASE_CONFIG__) {
    const winConfig = (window as any).__FIREBASE_CONFIG__;
    if (winConfig && winConfig.apiKey && winConfig.projectId) {
      return winConfig;
    }
  }

  return null;
};

export const isFirebaseConfigured = (): boolean => {
  return getFirebaseConfig() !== null;
};

/**
 * Retrieves the configured Administrator UID(s) from environment variables
 */
export const getAdminUidConfig = (): string | null => {
  const rawUid = import.meta.env.VITE_FIREBASE_ADMIN_UID || (import.meta as any).env?.VITE_FIREBASE_ADMIN_UID;
  return rawUid ? String(rawUid).trim() : null;
};

export const getAdminUidsConfig = (): string[] => {
  const rawSingle = import.meta.env.VITE_FIREBASE_ADMIN_UID || (import.meta as any).env?.VITE_FIREBASE_ADMIN_UID;
  const rawMultiple = import.meta.env.VITE_FIREBASE_ADMIN_UIDS || (import.meta as any).env?.VITE_FIREBASE_ADMIN_UIDS;
  
  const single = rawSingle ? String(rawSingle).trim() : '';
  const multiple = rawMultiple ? String(rawMultiple).trim() : '';
  
  const uids: string[] = [];
  if (single) uids.push(single);
  if (multiple) {
    multiple.split(',').forEach((uid) => {
      const trimmed = uid.trim();
      if (trimmed && !uids.includes(trimmed)) {
        uids.push(trimmed);
      }
    });
  }
  return uids;
};

export interface FirebaseServices {
  app: FirebaseApp;
  auth: Auth;
  db: Firestore;
}

let cachedServices: FirebaseServices | null = null;
let cachedConfigSignature: string | null = null;

/**
 * Resets cached Firebase instances to prevent stale configuration lock-in
 */
export const resetFirebaseServices = async (): Promise<void> => {
  cachedServices = null;
  cachedConfigSignature = null;
  const apps = getApps();
  for (const app of apps) {
    try {
      await deleteApp(app);
    } catch {}
  }
};

export const getFirebaseServices = (): FirebaseServices | null => {
  const config = getFirebaseConfig();
  if (!config) {
    cachedServices = null;
    cachedConfigSignature = null;
    return null;
  }

  // Create signature to detect configuration changes
  const signature = `${config.apiKey}:${config.projectId}:${config.appId}:${config.firestoreDatabaseId}`;
  
  if (cachedServices && cachedConfigSignature === signature) {
    return cachedServices;
  }

  try {
    let app: FirebaseApp;
    const existingApps = getApps();
    const defaultApp = existingApps.find(a => a.name === '[DEFAULT]');

    if (defaultApp) {
      // Check if existing default app options match current config
      if (
        defaultApp.options.apiKey === config.apiKey &&
        defaultApp.options.projectId === config.projectId
      ) {
        app = defaultApp;
      } else {
        // Stale configuration detected in existing default app; re-initialize
        try {
          deleteApp(defaultApp);
        } catch {}
        app = initializeApp(config);
      }
    } else {
      app = initializeApp(config);
    }

    const auth = getAuth(app);
    // Use specified database ID if provided, otherwise default
    const db = config.firestoreDatabaseId && config.firestoreDatabaseId !== '(default)'
      ? getFirestore(app, config.firestoreDatabaseId)
      : getFirestore(app);
    
    cachedServices = { app, auth, db };
    cachedConfigSignature = signature;
    return cachedServices;
  } catch (error) {
    console.warn('Firebase initialization notice:', error);
    return null;
  }
};


