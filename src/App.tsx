import React, { useState, useEffect } from 'react';
import { initialCanteenStatus } from './data/canteenData';
import { FoodCategory, FoodItemData, OrderToken, CanteenStatus } from './types';
import { 
  subscribeToCanteenStatus, 
  updateTodayLunch, 
  updateCanteenStatus, 
  updateQueueTelemetry, 
  updateAnnouncements, 
  checkAdminSession, 
  logoutAdmin,
  getLocalCanteenStatus
} from './services/canteenService';
import { CanteenLogo } from './components/CanteenLogo';
import { Hydro } from './components/Hydro';
import { NotebookPage } from './components/NotebookPage';
import { StickyNote } from './components/StickyNote';
import { Tiffin } from './components/Tiffin';
import { QueueWalkway } from './components/QueueWalkway';
import { FoodItem } from './components/FoodItem';
import { EngineeringDoodle } from './components/EngineeringDoodle';
import { OrderTokenCard } from './components/OrderTokenCard';
import { CanteenControlRoom } from './components/CanteenControlRoom';
import { RollingTableLoader } from './components/RollingTableLoader';
import { AdminLogin } from './components/AdminLogin';

// Initial sample token for immediate student inspection and testing
const sampleInitialTokens: OrderToken[] = [
  {
    id: 'tok-042',
    tokenNumber: '#E-042',
    timestamp: 'Today, 1:12 PM',
    status: 'READY',
    totalAmount: 33,
    counterLocation: 'Counter 1 (Express Snacks & Tea)',
    specialNotes: 'Ready on serving counter. Please pick up promptly.',
    items: [
      { id: 'bs-4', name: 'Vada Pav', price: 20, quantity: 1 },
      { id: 'hd-1', name: 'Tea', price: 13, quantity: 1 }
    ]
  }
];

const STORAGE_KEY_STATUS = 'canteen_connect_status_v5';
const STORAGE_KEY_TOKENS = 'canteen_connect_tokens_v5';

// Helper to determine route from current window URL / hash / search params
const getRouteFromUrl = (): 'student' | 'admin' => {
  if (typeof window === 'undefined') return 'student';
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  const search = window.location.search.toLowerCase();
  if (
    path === '/admin' ||
    path.startsWith('/admin') ||
    path.includes('/admin') ||
    hash === '#/admin' ||
    hash.startsWith('#/admin') ||
    hash.startsWith('#admin') ||
    search.includes('admin=true') ||
    search.includes('admin=1')
  ) {
    return 'admin';
  }
  return 'student';
};

export default function App() {
  // Navigation Route State: 'student' (default) or 'admin'
  const [currentRoute, setCurrentRoute] = useState<'student' | 'admin'>(getRouteFromUrl);

  // Admin authentication session state (verified admin authorization)
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return checkAdminSession();
  });

  // Single source of truth for Canteen Data (Shared across Student & Admin)
  const [canteenStatus, setCanteenStatus] = useState<CanteenStatus>(() => {
    return getLocalCanteenStatus();
  });

  // Subscribe to real-time sync across Firestore & open browser tabs
  useEffect(() => {
    const unsubscribe = subscribeToCanteenStatus((updated) => {
      setCanteenStatus(updated);
    });
    return () => unsubscribe();
  }, []);

  const [selectedCategory, setSelectedCategory] = useState<FoodCategory>('breakfast-snacks');
  const [searchQuery, setSearchQuery] = useState('');
  const [trayItems, setTrayItems] = useState<{ item: FoodItemData; quantity: number }[]>([]);
  const [isTrayOpen, setIsTrayOpen] = useState(false);
  const [trayStatusMessage, setTrayStatusMessage] = useState<string | null>(null);

  // Order Tokens State
  const [orderTokens, setOrderTokens] = useState<OrderToken[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_TOKENS);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse saved order tokens:', e);
    }
    return sampleInitialTokens;
  });

  const [activeToken, setActiveToken] = useState<OrderToken | null>(sampleInitialTokens[0]);
  const [isTokenModalOpen, setIsTokenModalOpen] = useState(false);
  const [isGeneratingToken, setIsGeneratingToken] = useState(false);

  // Time-based dynamic greeting
  const [greeting, setGreeting] = useState('Good Afternoon, Engineer 👋');

  // Dynamic live current time for Notice Board (auto-updating dynamically every minute)
  const [currentNoticeTime, setCurrentNoticeTime] = useState<string>(() => {
    return new Date().toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  });

  useEffect(() => {
    const updateNoticeTime = () => {
      setCurrentNoticeTime(
        new Date().toLocaleTimeString([], {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        })
      );
    };

    updateNoticeTime();
    // Check every 10 seconds so the time updates promptly on every minute
    const timerId = setInterval(updateNoticeTime, 10000);
    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('Good Morning, Engineer 👋');
    } else if (hour < 17) {
      setGreeting('Good Afternoon, Engineer 👋');
    } else {
      setGreeting('Good Evening, Engineer 👋');
    }
  }, []);

  // Listen to browser history / hash changes for direct routing
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentRoute(getRouteFromUrl());
    };
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Persist canteen status updates to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_STATUS, JSON.stringify(canteenStatus));
    } catch (e) {
      console.error('Failed to persist canteenStatus:', e);
    }
  }, [canteenStatus]);

  // Persist order tokens to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_TOKENS, JSON.stringify(orderTokens));
    } catch (e) {
      console.error('Failed to persist orderTokens:', e);
    }
  }, [orderTokens]);

  // Cross-tab real-time sync for shared data
  useEffect(() => {
    const handleStorageEvent = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY_STATUS && e.newValue) {
        try {
          setCanteenStatus(JSON.parse(e.newValue));
        } catch {}
      }
      if (e.key === STORAGE_KEY_TOKENS && e.newValue) {
        try {
          setOrderTokens(JSON.parse(e.newValue));
        } catch {}
      }
    };
    window.addEventListener('storage', handleStorageEvent);
    return () => window.removeEventListener('storage', handleStorageEvent);
  }, []);

  // Safe navigation function between routes
  const navigateTo = (route: 'student' | 'admin') => {
    if (route === 'admin') {
      try {
        if (window.history && window.history.pushState) {
          window.history.pushState({}, '', '/admin');
        }
      } catch (e) {
        console.warn('pushState failed:', e);
      }
      try {
        window.location.hash = '#/admin';
      } catch {}
    } else {
      try {
        if (window.history && window.history.pushState) {
          window.history.pushState({}, '', '/');
        }
      } catch (e) {
        console.warn('pushState failed:', e);
      }
      try {
        window.location.hash = '#/';
      } catch {}
    }
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add item to student tray
  const handleAddToTray = (item: FoodItemData) => {
    setTrayItems((prev) => {
      const existing = prev.find((entry) => entry.item.id === item.id);
      if (existing) {
        return prev.map((entry) =>
          entry.item.id === item.id ? { ...entry, quantity: entry.quantity + 1 } : entry
        );
      }
      return [...prev, { item, quantity: 1 }];
    });

    setTrayStatusMessage(`${item.name} added to snack tray!`);
    setTimeout(() => setTrayStatusMessage(null), 3000);
  };

  const handleRemoveFromTray = (itemId: string) => {
    setTrayItems((prev) => prev.filter((entry) => entry.item.id !== itemId));
  };

  const trayTotal = trayItems.reduce((acc, curr) => acc + (curr.item.price || 0) * curr.quantity, 0);
  const trayCount = trayItems.reduce((acc, curr) => acc + curr.quantity, 0);

  // Order confirmation & Token Generation
  const handleConfirmOrder = () => {
    if (trayItems.length === 0) return;
    setIsGeneratingToken(true);

    setTimeout(() => {
      const newTokenNum = `#E-${String(Math.floor(Math.random() * 900) + 100)}`;
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      const newToken: OrderToken = {
        id: `tok-${Date.now()}`,
        tokenNumber: newTokenNum,
        timestamp: `Today, ${timeStr}`,
        status: 'PREPARING',
        totalAmount: trayTotal,
        counterLocation: trayItems.some(i => i.item.category === 'lunch') 
          ? 'Counter 2 (Lunch & Thali Section)' 
          : 'Counter 1 (Snacks & Chai Express)',
        specialNotes: 'Preparing at counter. Keep this digital token open on your phone.',
        items: trayItems.map(({ item, quantity }) => ({
          id: item.id,
          name: item.name,
          price: item.price ?? 0,
          quantity
        }))
      };

      setOrderTokens((prev) => [newToken, ...prev]);
      setActiveToken(newToken);
      setIsGeneratingToken(false);
      setIsTrayOpen(false);
      setTrayItems([]);
      setIsTokenModalOpen(true);
      setTrayStatusMessage(`Token ${newTokenNum} generated! View below.`);
      setTimeout(() => setTrayStatusMessage(null), 4000);
    }, 900);
  };

  // Filtered menu items using live shared canteenStatus.menuItems
  const currentMenuItems = canteenStatus.menuItems || [];
  const filteredItems = currentMenuItems.filter((item) => {
    const matchesCat = item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  // Category tab styles resembling colored notebook dividers
  const categoryTabs: { id: FoodCategory; label: string; icon: string; colorClass: string; activeColor: string }[] = [
    { id: 'breakfast-snacks', label: 'Breakfast / Snacks', icon: '🥟', colorClass: 'hover:bg-[#FF7F6A]/30', activeColor: 'bg-[#FF7F6A] text-white border-[#f43f5e]' },
    { id: 'meals', label: 'Meals', icon: '🍛', colorClass: 'hover:bg-[#FF9F1C]/30', activeColor: 'bg-[#FF9F1C] text-slate-900 border-[#e08500]' },
    { id: 'lunch', label: 'Lunch', icon: '🍱', colorClass: 'hover:bg-[#2ED8A7]/30', activeColor: 'bg-[#2ED8A7] text-slate-900 border-[#10b981]' },
    { id: 'hot-drinks', label: 'Hot Drinks', icon: '☕', colorClass: 'hover:bg-[#FFD166]/30', activeColor: 'bg-[#FFD166] text-[#1F2937] border-[#e6b800]' },
    { id: 'cold-drinks', label: 'Cold Drinks', icon: '🥤', colorClass: 'hover:bg-[#7C5CFF]/30', activeColor: 'bg-[#7C5CFF] text-white border-[#6366f1]' },
  ];

  // =========================================================================
  // ROUTE 1: ADMIN INTERFACE (/admin)
  // Dedicated route, requires login, gives control of menu, lunch, queue & break
  // =========================================================================
  if (currentRoute === 'admin') {
    if (!isAdminLoggedIn) {
      return (
        <AdminLogin
          onLoginSuccess={() => {
            setIsAdminLoggedIn(true);
          }}
          onBackToStudent={() => navigateTo('student')}
        />
      );
    }

    return (
      <CanteenControlRoom
        status={canteenStatus}
        onUpdateTiffin={(updated) => {
          updateTodayLunch(updated);
        }}
        onUpdateMenu={(updatedMenu) => {
          updateCanteenStatus(prev => ({
            ...prev,
            menuItems: updatedMenu
          }));
        }}
        onUpdateNextBreak={(newNextBreak, label) => {
          updateCanteenStatus(prev => ({
            ...prev,
            nextBreak: newNextBreak,
            ...(label ? { nextBreakLabel: label } : {})
          }));
        }}
        onUpdateQueue={(rush, waitTime, nowServing) => {
          updateQueueTelemetry(rush, waitTime, nowServing);
        }}
        onUpdateAnnouncements={(updatedAnnouncements) => {
          updateAnnouncements(updatedAnnouncements);
        }}
        tokens={orderTokens}
        onUpdateTokenStatus={(tokenId, newStatus) => {
          setOrderTokens(prev => prev.map(t => t.id === tokenId ? { ...t, status: newStatus } : t));
          if (activeToken && activeToken.id === tokenId) {
            setActiveToken(prev => prev ? { ...prev, status: newStatus } : null);
          }
        }}
        onLogout={async () => {
          await logoutAdmin();
          setIsAdminLoggedIn(false);
          navigateTo('student');
        }}
        onViewStudentApp={() => navigateTo('student')}
      />
    );
  }

  // =========================================================================
  // ROUTE 2: STUDENT APP (DEFAULT INTERFACE)
  // Read-only student experience. NO Admin button in header or navigation.
  // =========================================================================
  return (
    <div className="min-h-screen notice-board-cork py-4 sm:py-8 px-2 sm:px-4 font-sans-rounded selection:bg-[#FFD166]">
      
      {/* Top Floating Utility Bar (Tray & Order Token - NO Admin button) */}
      <header className="max-w-6xl mx-auto mb-3 flex items-center justify-end px-3 sm:px-6">
        <div className="flex items-center gap-2">
          
          {/* Order Token Action */}
          {activeToken && (
            <button
              id="view-order-token-button"
              type="button"
              onClick={() => setIsTokenModalOpen(true)}
              className="relative flex items-center gap-1.5 bg-[#FFFDF8] hover:bg-white text-[#1F2937] px-3 py-1.5 rounded-xl border-2 border-[#7C5CFF]/60 shadow-xs transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span className="text-sm">🏷️</span>
              <span className="font-extrabold text-xs tracking-wider uppercase font-mono text-[#7C5CFF]">
                Token {activeToken.tokenNumber}
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </button>
          )}

          {/* Quick Tray Action */}
          <button
            id="tray-toggle-button"
            type="button"
            onClick={() => setIsTrayOpen(true)}
            className="relative flex items-center gap-2 bg-[#FFF8EE] hover:bg-white text-[#1F2937] px-3.5 py-1.5 rounded-xl border-2 border-[#1F2937]/20 shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span className="text-base">📋</span>
            <span className="font-extrabold text-xs tracking-wider uppercase font-mono">
              Snack Tray
            </span>
            {trayCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#FF7F6A] text-white text-[11px] font-black flex items-center justify-center -ml-0.5">
                {trayCount}
              </span>
            )}
            {trayTotal > 0 && (
              <span className="text-xs font-black text-[#7C5CFF] font-mono border-l border-slate-300 pl-1.5">
                ₹{trayTotal}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Main Open Notebook Sheet */}
      <NotebookPage id="canteen-main-notebook">
        
        {/* ======================================================== */}
        {/* HEADER & BRAND: Top-Down Round Canteen Table Logo + Greeting */}
        {/* ======================================================== */}
        <section className="mb-8 pb-6 border-b-2 border-[#1F2937]/15">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Left: Brand Identity with Top-Down View Wooden Table Logo */}
            <div className="flex items-center gap-4 sm:gap-6 text-center sm:text-left">
              <CanteenLogo size={135} showTagline={false} />
              
              <div>
                <div className="inline-block bg-[#FFD166]/50 px-2.5 py-0.5 rounded text-[11px] font-mono font-bold text-amber-900 uppercase tracking-widest mb-1 border border-amber-300">
                  SAAVI'S MODERN CAFETERIA • COLLEGE OF ENGINEERING
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1F2937] tracking-tight">
                  Canteen Connect
                </h1>
                <p className="font-handwriting text-xl sm:text-2xl text-[#7C5CFF] font-bold mt-0.5">
                  Your Student Canteen Companion.
                </p>
                <p className="text-xs text-slate-500 font-mono mt-1 hidden sm:block">
                  // Live queue tracking, honest tiffin lunch & fuel compilation for engineers
                </p>
              </div>
            </div>

            {/* Right: Dynamic Greeting + Hydro Mascot */}
            <div className="flex flex-col items-center md:items-end w-full md:w-auto">
              {/* Dynamic Greeting */}
              <div className="bg-white/80 border-2 border-[#1F2937]/20 rounded-2xl px-4 py-2 shadow-xs mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#2ED8A7]" />
                <span className="font-extrabold text-lg sm:text-xl text-[#1F2937] tracking-tight">
                  {greeting}
                </span>
              </div>

              {/* Hydro with Interactive Speech Bubble & Next Node */}
              <Hydro
                speechText="You've survived today's lecture. You deserve a snack."
                interactive={true}
              />
            </div>

          </div>
        </section>

        {/* ======================================================== */}
        {/* CANTEEN ANNOUNCEMENTS STRIP (Direct from Control Room)   */}
        {/* ======================================================== */}
        {canteenStatus.announcements && canteenStatus.announcements.length > 0 && (
          <div className="mb-8 p-3.5 bg-amber-100/70 border-2 border-dashed border-amber-400 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-2xs">
            <div className="flex items-center gap-2.5">
              <span className="text-xl">📢</span>
              <div>
                <span className="text-[10px] font-mono font-bold text-amber-900 uppercase tracking-wider block">
                  CANTEEN NOTICE BOARD // BROADCAST
                </span>
                <p className="font-handwriting text-[#1F2937] text-base font-bold leading-tight">
                  "{canteenStatus.announcements[0].text}"
                </p>
              </div>
            </div>
            <span
              id="notice-board-live-time"
              className="text-[10px] font-mono text-amber-800 bg-amber-200/80 px-2 py-0.5 rounded self-start sm:self-center font-bold"
            >
              {currentNoticeTime}
            </span>
          </div>
        )}

        {/* ======================================================== */}
        {/* SECTION 1: TODAY AT THE CANTEEN (3 Visual Areas)          */}
        {/* Next Break | Queue Walkway | Today's Special Sticky Note  */}
        {/* ======================================================== */}
        <section className="mb-10" id="today-at-canteen-section">
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">📌</span>
              <h2 className="font-extrabold text-2xl sm:text-3xl text-[#1F2937] tracking-tight uppercase">
                TODAY AT THE CANTEEN
              </h2>
            </div>
            
            {/* Subtle Easter Egg Compass Doodle */}
            <div className="hidden sm:flex items-center gap-2 text-xs font-handwriting text-[#7C5CFF]">
              <EngineeringDoodle type="compass" size={32} color="#7C5CFF" />
              <span>Live Campus Telemetry</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
            
            {/* AREA 1: NEXT BREAK (07 min + ruler doodle) */}
            <div className="md:col-span-4 bg-[#FFF8EE] rounded-2xl p-5 border-2 border-[#1F2937]/15 shadow-sm flex flex-col justify-between relative overflow-hidden group">
              {/* Corner tape */}
              <div className="absolute -top-2.5 left-6 w-16 h-4 washi-tape-mint -rotate-2" />
              
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-mono tracking-widest text-[#7C5CFF] font-bold">
                    NEXT BREAK
                  </span>
                  <span className="text-[11px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                    CAMPUS BELL
                  </span>
                </div>

                {/* Big Next Break Display */}
                <div className="mt-3 flex items-baseline gap-2">
                  <span id="student-next-break" className="font-black text-4xl sm:text-5xl text-[#1F2937] font-mono tracking-tight">
                    {canteenStatus.nextBreak || '07:32'}
                  </span>
                </div>

                <p className="font-handwriting text-slate-600 text-base mt-1">
                  {canteenStatus.nextBreakLabel}
                </p>
              </div>

              {/* Measurement Ruler Doodle */}
              <div className="mt-4 pt-3 border-t border-dashed border-slate-300">
                <EngineeringDoodle type="ruler" size={38} color="#7C5CFF" className="w-full" />
              </div>
            </div>

            {/* AREA 2: QUEUE (MEDIUM with tiny clay students & live now-serving) */}
            <div className="md:col-span-5 flex flex-col justify-between">
              <QueueWalkway
                density={canteenStatus.queueStatus}
                description={canteenStatus.queueDescription}
                className="h-full"
              />
              <div className="mt-2 flex items-center justify-between px-3 py-1.5 bg-white/75 rounded-xl border border-slate-300 text-xs font-mono">
                <span className="text-slate-600">Now Serving: <strong className="text-[#1F2937] text-sm">{canteenStatus.nowServingToken || '#042'}</strong></span>
                <span className="text-[#7C5CFF] font-bold">Wait: ~{canteenStatus.estimatedWaitTime || '4 mins'}</span>
              </div>
            </div>

            {/* AREA 3: TODAY'S SPECIAL (Paneer Wrap as Handwritten Sticky Note) */}
            <div className="md:col-span-3 flex flex-col">
              <StickyNote
                color="yellow"
                rotation={2}
                pinType="pin"
                title="⭐ TODAY'S SPECIAL"
                className="h-full flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-extrabold text-xl sm:text-2xl text-[#1F2937]">
                      {canteenStatus.todaysSpecial.name}
                    </span>
                    <span className="font-black text-xl font-mono text-amber-950 bg-amber-200/80 px-2 py-0.5 rounded">
                      ₹{canteenStatus.todaysSpecial.price}
                    </span>
                  </div>

                  <p className="mt-2 text-sm leading-tight text-slate-800">
                    {canteenStatus.todaysSpecial.description}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-amber-950/20 text-xs text-amber-900">
                  <div className="font-bold flex items-center gap-1">
                    <span>⚡ Note:</span>
                    <span>{canteenStatus.todaysSpecial.note}</span>
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => handleAddToTray({
                      id: 'bs-9',
                      name: canteenStatus.todaysSpecial.name,
                      price: canteenStatus.todaysSpecial.price,
                      category: 'breakfast-snacks',
                      availability: 'AVAILABLE',
                      description: canteenStatus.todaysSpecial.description
                    })}
                    className="mt-3 w-full bg-[#1F2937] hover:bg-slate-800 text-white font-bold py-1.5 px-3 rounded-lg text-xs tracking-wider uppercase clay-button cursor-pointer"
                  >
                    + Snag Special (₹{canteenStatus.todaysSpecial.price})
                  </button>
                </div>
              </StickyNote>
            </div>

          </div>
        </section>


        {/* ======================================================== */}
        {/* SECTION 2: TODAY'S LUNCH (Interactive Roti + 2 Sabzis)    */}
        {/* ======================================================== */}
        <section className="mb-10" id="todays-lunch-section">
          <Tiffin 
            data={canteenStatus.todayLunch || canteenStatus.lunchTiffin}
            onAddToTray={handleAddToTray}
          />
        </section>


        {/* ======================================================== */}
        {/* SECTION 3: MENU NAVIGATION & CATEGORIES                   */}
        {/* Breakfast | Lunch | Snacks | Drinks                       */}
        {/* ======================================================== */}
        <section className="mb-10" id="canteen-menu-section">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">📖</span>
                <h2 className="font-extrabold text-2xl sm:text-3xl text-[#1F2937] tracking-tight uppercase">
                  CANTEEN MENU REGISTER
                </h2>
              </div>
              <p className="font-handwriting text-lg text-[#7C5CFF] font-bold">
                Daily prepared batch logs • Student friendly rates
              </p>
            </div>

            {/* Quick search input */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search food item or chai..."
                className="w-full sm:w-64 bg-white/90 border-2 border-[#1F2937]/20 rounded-xl px-3 py-1.5 text-xs font-semibold focus:outline-none focus:border-[#7C5CFF] placeholder:text-slate-400 font-mono shadow-2xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Notebook Tabs Category Navigation */}
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 border-b-2 border-[#1F2937]/15">
            {categoryTabs.map((tab) => {
              const isActive = selectedCategory === tab.id;
              const countForTab = currentMenuItems.filter((m) => m.category === tab.id).length;
              return (
                <button
                  key={tab.id}
                  id={`tab-${tab.id}`}
                  type="button"
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-t-2xl font-extrabold text-sm sm:text-base border-t-2 border-x-2 transition-all flex-shrink-0 relative cursor-pointer ${
                    isActive
                      ? `${tab.activeColor} shadow-sm translate-y-[2px] z-10`
                      : `bg-[#ede3d1]/80 text-slate-700 border-[#1F2937]/15 ${tab.colorClass}`
                  }`}
                  style={{ fontFamily: "'Nunito', sans-serif" }}
                >
                  <span className="text-lg">{tab.icon}</span>
                  <span>{tab.label}</span>

                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                    isActive ? 'bg-black/15 text-current' : 'bg-black/5 text-slate-500'
                  }`}>
                    {countForTab}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Menu Items Grid */}
          <div className="pt-6">
            {filteredItems.length === 0 ? (
              <div className="text-center py-12 bg-white/40 rounded-2xl border-2 border-dashed border-slate-300">
                <span className="text-3xl">🔍</span>
                <p className="font-handwriting text-xl text-slate-600 font-bold mt-2">
                  No snack matched query: "{searchQuery}"
                </p>
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="mt-3 text-xs font-mono text-[#7C5CFF] underline cursor-pointer"
                >
                  Reset search filter
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredItems.map((item) => (
                  <FoodItem
                    key={item.id}
                    item={item}
                    onOrder={handleAddToTray}
                  />
                ))}
              </div>
            )}
          </div>

        </section>


        {/* ======================================================== */}
        {/* SECTION 4: ENGINEERING DETAILS & EASTER EGGS              */}
        {/* ======================================================== */}
        <section className="pt-4 border-t-2 border-dashed border-[#1F2937]/15">
          <div className="flex flex-wrap items-center justify-between gap-4">
            
            <div className="flex items-center gap-3">
              <EngineeringDoodle type="circuit" size={30} color="#7C5CFF" />
              <div>
                <span className="text-xs font-mono font-bold text-slate-700 block">
                  Canteen Circuit Board
                </span>
                <span className="text-[11px] font-handwriting text-[#7C5CFF]">
                  High impedance input, crispy samosa output
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <EngineeringDoodle type="formula" />
            </div>

          </div>
        </section>

      </NotebookPage>


      {/* ======================================================== */}
      {/* TRAY / COMPILED SNACKS DRAWER (MODAL OVERLAY)              */}
      {/* ======================================================== */}
      {isTrayOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="relative w-full max-w-md bg-[#FFF8EE] rounded-3xl p-6 border-3 border-[#1F2937] shadow-2xl overflow-hidden notebook-ruled-lines">
            
            {/* Top washi tape */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 washi-tape rotate-1 border-t border-b border-amber-300 shadow-xs" />

            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b-2 border-dashed border-[#1F2937]/20">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📋</span>
                <div>
                  <h3 className="font-black text-xl text-[#1F2937]">
                    Student Snack Slip
                  </h3>
                  <span className="text-[11px] font-mono text-[#7C5CFF] font-bold">
                    Canteen Connect // Order Memo
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsTrayOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold flex items-center justify-center text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Loading state during token generation */}
            {isGeneratingToken ? (
              <div className="py-6">
                <RollingTableLoader
                  message="Compiling your snack order..."
                  subMessage="Printing official counter token with 0 syntax errors"
                  compact={true}
                />
              </div>
            ) : (
              <>
                {/* Item list */}
                <div className="my-4 max-h-64 overflow-y-auto space-y-2 pr-1">
                  {trayItems.length === 0 ? (
                    <div className="text-center py-8 text-slate-500 font-handwriting text-lg">
                      Your snack tray is currently empty.
                      <br />
                      <span className="text-sm text-[#7C5CFF]">
                        Add Pohe, Vada Pav, Lunch or Tea to compile!
                      </span>
                    </div>
                  ) : (
                    trayItems.map(({ item, quantity }) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-2.5 bg-white/90 rounded-xl border border-slate-200 text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-black text-sm text-[#1F2937] font-mono">
                            {quantity}×
                          </span>
                          <span className="font-bold text-slate-800">{item.name}</span>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="font-mono font-black text-slate-900">
                            {item.price !== undefined && item.price !== null ? `₹${item.price * quantity}` : 'At counter'}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleRemoveFromTray(item.id)}
                            className="text-rose-500 hover:text-rose-700 font-bold text-xs cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Total & Action */}
                {trayItems.length > 0 && (
                  <div className="pt-3 border-t-2 border-dashed border-[#1F2937]/20">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs uppercase tracking-wider text-slate-600 font-bold">
                        Total Fuel Cost
                      </span>
                      <span className="font-mono font-black text-2xl text-[#1F2937]">
                        ₹{trayTotal}
                      </span>
                    </div>

                    <div className="bg-[#2ED8A7]/15 border border-[#2ED8A7]/40 p-2 rounded-lg text-center mb-3">
                      <span className="text-xs font-handwriting text-emerald-900 font-bold">
                        ✓ Compiled with 0 syntax errors • Ready for Canteen Billing
                      </span>
                    </div>

                    <button
                      id="confirm-tray-order-button"
                      type="button"
                      onClick={handleConfirmOrder}
                      className="w-full py-3 bg-[#7C5CFF] hover:bg-[#6847ed] text-white font-extrabold rounded-xl clay-button text-sm uppercase tracking-wider cursor-pointer shadow-md"
                    >
                      Confirm & Generate Counter Token
                    </button>
                  </div>
                )}
              </>
            )}

            {/* Footer note */}
            <div className="mt-3 text-center">
              <span className="text-[10px] font-mono text-slate-400">
                Pay via UPI / Cash directly to Kaka at counter
              </span>
            </div>

          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* RESTORED PHYSICAL ORDER TOKEN MODAL                        */}
      {/* ======================================================== */}
      {isTokenModalOpen && activeToken && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="relative w-full max-w-sm">
            <OrderTokenCard
              token={activeToken}
              onClose={() => setIsTokenModalOpen(false)}
              onStatusChange={(newStatus) => {
                setOrderTokens(prev => prev.map(t => t.id === activeToken.id ? { ...t, status: newStatus } : t));
                setActiveToken(prev => prev ? { ...prev, status: newStatus } : null);
              }}
            />
          </div>
        </div>
      )}

      {/* Floating toast notification for microcopy */}
      {trayStatusMessage && (
        <div className="fixed bottom-6 right-6 bg-[#1F2937] text-white px-4 py-2.5 rounded-2xl shadow-xl z-50 flex items-center gap-2 text-xs font-bold border-2 border-[#2ED8A7] animate-bounce">
          <span className="text-base">⚡</span>
          <span>{trayStatusMessage}</span>
        </div>
      )}

    </div>
  );
}
