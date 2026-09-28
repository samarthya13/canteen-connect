import React, { useState } from 'react';
import { 
  CanteenStatus, 
  FoodItemData, 
  ItemAvailability, 
  QueueRushLevel, 
  TodayLunchTiffin,
  CanteenAnnouncement,
  OrderToken,
  FoodCategory
} from '../types';
import { isFirebaseConfigured } from '../firebase/config';

interface CanteenControlRoomProps {
  status: CanteenStatus;
  onUpdateTiffin: (updatedTiffin: TodayLunchTiffin) => void;
  onUpdateMenu: (updatedMenu: FoodItemData[]) => void;
  onUpdateNextBreak: (nextBreak: string, label?: string) => void;
  onUpdateQueue: (rush: QueueRushLevel, waitTime?: string, nowServing?: string) => void;
  onUpdateAnnouncements: (updatedAnnouncements: CanteenAnnouncement[]) => void;
  tokens: OrderToken[];
  onUpdateTokenStatus: (tokenId: string, newStatus: OrderToken['status']) => void;
  onLogout: () => void;
  onViewStudentApp: () => void;
}

export const CanteenControlRoom: React.FC<CanteenControlRoomProps> = ({
  status,
  onUpdateTiffin,
  onUpdateMenu,
  onUpdateNextBreak,
  onUpdateQueue,
  onUpdateAnnouncements,
  tokens,
  onUpdateTokenStatus,
  onLogout,
  onViewStudentApp
}) => {
  const [activeTab, setActiveTab] = useState<'lunch' | 'menu' | 'queue' | 'tokens' | 'notices'>('lunch');
  const firebaseConfigured = isFirebaseConfigured();

  // Lunch form state initialized from live status (Roti, Sabzi 1, Sabzi 2, Dal, Rice)
  const [lunchRoti, setLunchRoti] = useState(status.todayLunch.roti);
  const [lunchSabzi1, setLunchSabzi1] = useState(status.todayLunch.sabzi1);
  const [lunchSabzi2, setLunchSabzi2] = useState(status.todayLunch.sabzi2);
  const [lunchDal, setLunchDal] = useState(status.todayLunch.dal || 'Dal Tadka');
  const [lunchRice, setLunchRice] = useState(status.todayLunch.rice || 'Steamed Rice');
  const [lunchPrice, setLunchPrice] = useState(status.todayLunch.price);
  const [lunchAvailable, setLunchAvailable] = useState(status.todayLunch.isAvailable);
  const [lunchNote, setLunchNote] = useState(status.todayLunch.preparationNote || '');
  const [lunchSavedNotice, setLunchSavedNotice] = useState(false);

  // Break Bell / Next Break state initialized from live status
  const [breakTime, setBreakTime] = useState(status.nextBreak || '07:32');
  const [breakLabel, setBreakLabel] = useState(status.nextBreakLabel || 'After 3rd Period (Signals & Systems)');
  const [breakSavedNotice, setBreakSavedNotice] = useState(false);

  // Queue state
  const [rushLevel, setRushLevel] = useState<QueueRushLevel>(status.queueRush);
  const [queueWait, setQueueWait] = useState(status.estimatedWaitTime || '4 mins');
  const [nowServing, setNowServing] = useState(status.nowServingToken || '#042');
  const [queueSavedNotice, setQueueSavedNotice] = useState(false);

  // Menu Category Filter in Admin
  const [adminMenuCategory, setAdminMenuCategory] = useState<'all' | FoodCategory>('all');
  const [menuSearch, setMenuSearch] = useState('');

  // Add Item Drawer
  const [showAddItem, setShowAddItem] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState(30);
  const [newItemCategory, setNewItemCategory] = useState<FoodCategory>('breakfast-snacks');
  const [newItemDesc, setNewItemDesc] = useState('');

  // Edit Item Modal State
  const [editingItem, setEditingItem] = useState<FoodItemData | null>(null);

  // Notice form & Edit state
  const [newNoticeText, setNewNoticeText] = useState('');
  const [newNoticeType, setNewNoticeType] = useState<'urgent' | 'alert' | 'info'>('urgent');
  const [editingNotice, setEditingNotice] = useState<CanteenAnnouncement | null>(null);

  // Save Lunch Handler
  const handleSaveLunch = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: TodayLunchTiffin = {
      ...status.todayLunch,
      roti: lunchRoti,
      sabzi1: lunchSabzi1,
      sabzi2: lunchSabzi2,
      dal: lunchDal,
      rice: lunchRice,
      price: Number(lunchPrice),
      isAvailable: lunchAvailable,
      preparationNote: lunchNote
    };
    onUpdateTiffin(updated);
    setLunchSavedNotice(true);
    setTimeout(() => setLunchSavedNotice(false), 2500);
  };

  // Quick Sabzi 1 change
  const handleSelectSabzi1Preset = (val: string) => {
    setLunchSabzi1(val);
    const updated: TodayLunchTiffin = {
      ...status.todayLunch,
      roti: lunchRoti,
      sabzi1: val,
      sabzi2: lunchSabzi2,
      dal: lunchDal,
      rice: lunchRice,
      price: Number(lunchPrice),
      isAvailable: lunchAvailable,
      preparationNote: lunchNote
    };
    onUpdateTiffin(updated);
    setLunchSavedNotice(true);
    setTimeout(() => setLunchSavedNotice(false), 2500);
  };

  // Quick Sabzi 2 change
  const handleSelectSabzi2Preset = (val: string) => {
    setLunchSabzi2(val);
    const updated: TodayLunchTiffin = {
      ...status.todayLunch,
      roti: lunchRoti,
      sabzi1: lunchSabzi1,
      sabzi2: val,
      dal: lunchDal,
      rice: lunchRice,
      price: Number(lunchPrice),
      isAvailable: lunchAvailable,
      preparationNote: lunchNote
    };
    onUpdateTiffin(updated);
    setLunchSavedNotice(true);
    setTimeout(() => setLunchSavedNotice(false), 2500);
  };

  // Quick Dal change
  const handleSelectDalPreset = (val: string) => {
    setLunchDal(val);
    const updated: TodayLunchTiffin = {
      ...status.todayLunch,
      roti: lunchRoti,
      sabzi1: lunchSabzi1,
      sabzi2: lunchSabzi2,
      dal: val,
      rice: lunchRice,
      price: Number(lunchPrice),
      isAvailable: lunchAvailable,
      preparationNote: lunchNote
    };
    onUpdateTiffin(updated);
    setLunchSavedNotice(true);
    setTimeout(() => setLunchSavedNotice(false), 2500);
  };

  // Quick Rice change
  const handleSelectRicePreset = (val: string) => {
    setLunchRice(val);
    const updated: TodayLunchTiffin = {
      ...status.todayLunch,
      roti: lunchRoti,
      sabzi1: lunchSabzi1,
      sabzi2: lunchSabzi2,
      dal: lunchDal,
      rice: val,
      price: Number(lunchPrice),
      isAvailable: lunchAvailable,
      preparationNote: lunchNote
    };
    onUpdateTiffin(updated);
    setLunchSavedNotice(true);
    setTimeout(() => setLunchSavedNotice(false), 2500);
  };

  // Menu item availability update
  const handleItemAvailabilityChange = (itemId: string, newAvail: ItemAvailability) => {
    const updated = status.menuItems.map(item => 
      item.id === itemId ? { ...item, availability: newAvail } : item
    );
    onUpdateMenu(updated);
  };

  // Delete item
  const handleDeleteItem = (itemId: string) => {
    if (confirm('Remove this item from the canteen menu?')) {
      const updated = status.menuItems.filter(item => item.id !== itemId);
      onUpdateMenu(updated);
    }
  };

  // Add new item
  const handleAddNewItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    const newItem: FoodItemData = {
      id: `item-${Date.now()}`,
      name: newItemName.trim(),
      price: newItemPrice ? Number(newItemPrice) : undefined,
      category: newItemCategory,
      availability: 'AVAILABLE',
      description: newItemDesc.trim() || 'Prepared fresh at the counter.',
      clayIconType: newItemCategory === 'hot-drinks' || newItemCategory === 'cold-drinks' ? 'tea' : newItemCategory === 'breakfast-snacks' ? 'snack' : 'rice'
    };

    onUpdateMenu([...status.menuItems, newItem]);
    setNewItemName('');
    setNewItemPrice(30);
    setNewItemDesc('');
    setShowAddItem(false);
  };

  // Save Item Edit
  const handleSaveItemEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    const updated = status.menuItems.map(item => 
      item.id === editingItem.id ? editingItem : item
    );
    onUpdateMenu(updated);
    setEditingItem(null);
  };

  // Break Bell Handler
  const handleSaveBreak = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    onUpdateNextBreak(breakTime, breakLabel);
    setBreakSavedNotice(true);
    setTimeout(() => setBreakSavedNotice(false), 2500);
  };

  // Update Queue Handler
  const handleSaveQueue = (customRush?: QueueRushLevel) => {
    const selectedRush = customRush || rushLevel;
    onUpdateQueue(selectedRush, queueWait, nowServing);
    setQueueSavedNotice(true);
    setTimeout(() => setQueueSavedNotice(false), 2500);
  };

  // Add Notice
  const handleAddNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoticeText.trim()) return;

    const newNotice: CanteenAnnouncement = {
      id: `notice-${Date.now()}`,
      text: newNoticeText.trim(),
      type: newNoticeType,
      timestamp: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })
    };

    onUpdateAnnouncements([newNotice, ...(status.announcements || [])]);
    setNewNoticeText('');
  };

  // Delete Notice
  const handleDeleteNotice = (noticeId: string) => {
    const updated = (status.announcements || []).filter(n => n.id !== noticeId);
    onUpdateAnnouncements(updated);
  };

  // Edit Notice Handler
  const handleSaveNoticeEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingNotice || !editingNotice.text.trim()) return;
    const updated = (status.announcements || []).map(n => n.id === editingNotice.id ? editingNotice : n);
    onUpdateAnnouncements(updated);
    setEditingNotice(null);
  };

  // Filtered menu items in Admin
  const filteredMenuItems = status.menuItems.filter(item => {
    const matchCat = adminMenuCategory === 'all' || item.category === adminMenuCategory;
    const matchSearch = item.name.toLowerCase().includes(menuSearch.toLowerCase()) ||
                        (item.description && item.description.toLowerCase().includes(menuSearch.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <div className="bg-[#FFF8EE] min-h-screen pb-16 font-sans text-[#1F2937]">
      
      {/* Dedicated Admin Header & Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#1F2937] text-white border-b-4 border-[#FFD166] shadow-md px-4 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
        
        {/* Brand & Live status badge */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#7C5CFF] flex items-center justify-center text-xl shadow-inner border border-purple-400">
            ⚙️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-mono font-black text-lg sm:text-xl tracking-wider uppercase text-[#FFD166]">
                CANTEEN CONTROL ROOM
              </h1>
              <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full font-bold">
                SAAVI'S MODERN CAFETERIA
              </span>
              {firebaseConfigured ? (
                <span className="text-[10px] font-mono bg-emerald-500/30 text-emerald-200 border border-emerald-400 px-2 py-0.5 rounded-full font-bold">
                  🟢 Firebase DB Connected
                </span>
              ) : (
                <span className="text-[10px] font-mono bg-amber-500/30 text-amber-200 border border-amber-400 px-2 py-0.5 rounded-full font-bold">
                  ⚡ Multi-Tab Real-Time Sync (Firebase Ready)
                </span>
              )}
            </div>
            <p className="text-xs text-slate-300 font-mono">
              Next Break: <strong className="text-white">{status.nextBreak}</strong> • Queue: <strong className="text-[#2ED8A7]">{status.queueStatus}</strong> • Sabzis: <strong className="text-amber-300">{status.todayLunch.sabzi1} & {status.todayLunch.sabzi2}</strong>
            </p>
          </div>
        </div>

        {/* Admin Navigation Actions */}
        <div className="flex items-center gap-2.5">
          <button
            id="admin-nav-view-student"
            type="button"
            onClick={onViewStudentApp}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FFD166] hover:bg-amber-400 text-[#1F2937] font-black text-xs uppercase tracking-wider font-mono shadow-sm transition-transform active:scale-95 cursor-pointer"
            title="Switch directly to the student-facing menu to see live updates"
          >
            <span>👀</span>
            <span>View Student App</span>
          </button>

          <button
            id="admin-nav-logout"
            type="button"
            onClick={onLogout}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-rose-950 hover:text-rose-300 text-slate-300 font-bold text-xs uppercase tracking-wider font-mono border border-slate-700 transition-colors cursor-pointer"
            title="Log out from Canteen Control Room"
          >
            <span>🚪</span>
            <span>Logout</span>
          </button>
        </div>

      </header>

      {/* Main Admin Navigation Tabs */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6">
        <nav className="flex flex-wrap gap-2 border-b-2 border-slate-300 pb-3 font-mono text-xs font-bold">
          
          <button
            id="admin-tab-lunch"
            type="button"
            onClick={() => setActiveTab('lunch')}
            className={`px-4 py-2.5 rounded-xl border-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'lunch'
                ? 'bg-[#1F2937] text-[#FFD166] border-[#1F2937] shadow-sm scale-102'
                : 'bg-white/80 text-slate-700 border-slate-300 hover:bg-white'
            }`}
          >
            <span>🍱</span>
            <span>Lunch & Sabzis</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
              {status.todayLunch.sabzi1}
            </span>
          </button>

          <button
            id="admin-tab-menu"
            type="button"
            onClick={() => setActiveTab('menu')}
            className={`px-4 py-2.5 rounded-xl border-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'menu'
                ? 'bg-[#1F2937] text-[#FFD166] border-[#1F2937] shadow-sm scale-102'
                : 'bg-white/80 text-slate-700 border-slate-300 hover:bg-white'
            }`}
          >
            <span>📖</span>
            <span>Menu Register</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200 text-slate-800">
              {status.menuItems.length}
            </span>
          </button>

          <button
            id="admin-tab-queue"
            type="button"
            onClick={() => setActiveTab('queue')}
            className={`px-4 py-2.5 rounded-xl border-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'queue'
                ? 'bg-[#1F2937] text-[#FFD166] border-[#1F2937] shadow-sm scale-102'
                : 'bg-white/80 text-slate-700 border-slate-300 hover:bg-white'
            }`}
          >
            <span>⏳</span>
            <span>Break Bell & Queue</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
              status.queueStatus === 'LOW' ? 'bg-emerald-100 text-emerald-800' :
              status.queueStatus === 'HIGH' ? 'bg-rose-100 text-rose-800' :
              'bg-amber-100 text-amber-800'
            }`}>
              {status.queueStatus}
            </span>
          </button>

          <button
            id="admin-tab-tokens"
            type="button"
            onClick={() => setActiveTab('tokens')}
            className={`px-4 py-2.5 rounded-xl border-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'tokens'
                ? 'bg-[#1F2937] text-[#FFD166] border-[#1F2937] shadow-sm scale-102'
                : 'bg-white/80 text-slate-700 border-slate-300 hover:bg-white'
            }`}
          >
            <span>🏷️</span>
            <span>Active Tokens</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-100 text-purple-900 border border-purple-300 font-bold">
              {tokens.length}
            </span>
          </button>

          <button
            id="admin-tab-notices"
            type="button"
            onClick={() => setActiveTab('notices')}
            className={`px-4 py-2.5 rounded-xl border-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'notices'
                ? 'bg-[#1F2937] text-[#FFD166] border-[#1F2937] shadow-sm scale-102'
                : 'bg-white/80 text-slate-700 border-slate-300 hover:bg-white'
            }`}
          >
            <span>📌</span>
            <span>Notice Board</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200 text-slate-800">
              {(status.announcements || []).length}
            </span>
          </button>

        </nav>

        {/* ========================================================= */}
        {/* TAB 1: LUNCH TIFFIN & SABZIS (CHANGE SABZI 1 & SABZI 2)     */}
        {/* ========================================================= */}
        {activeTab === 'lunch' && (
          <div className="mt-6 bg-[#FFFDF8] rounded-3xl p-6 sm:p-8 border-2 border-slate-300 shadow-md">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-dashed border-slate-200 pb-4 mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🍱</span>
                  <h2 className="text-xl sm:text-2xl font-black font-mono uppercase text-[#1F2937]">
                    Today's Lunch / Tiffin Controller
                  </h2>
                </div>
                <p className="text-xs text-slate-600 font-mono mt-1">
                  Change Sabzi 1 & Sabzi 2 independently. Changes instantly sync to the student's interactive tiffin.
                </p>
              </div>

              {lunchSavedNotice && (
                <div className="bg-emerald-100 text-emerald-800 border border-emerald-300 px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 animate-bounce">
                  <span>✓</span>
                  <span>Broadcasted to all student screens!</span>
                </div>
              )}
            </div>

            <form onSubmit={handleSaveLunch} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                
                {/* Field 1: Roti */}
                <div className="bg-amber-50/70 p-4 rounded-2xl border-2 border-amber-300 shadow-xs">
                  <label className="block font-mono text-xs font-bold uppercase text-amber-900 mb-1">
                    🫓 Roti Specification
                  </label>
                  <input
                    id="admin-lunch-roti"
                    type="text"
                    value={lunchRoti}
                    onChange={(e) => setLunchRoti(e.target.value)}
                    placeholder="e.g. 4 Fresh Phulkas"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 bg-white font-bold text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
                    required
                  />
                  <div className="mt-2 flex flex-wrap gap-1">
                    {['Roti (4 pcs)', 'Phulkas with Ghee', '2 Parathas', 'Bhakri (2 pcs)'].map(preset => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setLunchRoti(preset)}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 cursor-pointer"
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Field 2: Sabzi 1 (INDEPENDENT FIELD - e.g. "Paneer Bhurji") */}
                <div className="bg-emerald-50/70 p-4 rounded-2xl border-2 border-[#2ED8A7] shadow-xs">
                  <div className="flex items-center justify-between mb-1">
                    <label className="block font-mono text-xs font-bold uppercase text-emerald-900">
                      🥘 Sabzi 1 (Independent Field)
                    </label>
                    <span className="text-[9px] bg-emerald-200 text-emerald-900 px-1.5 py-0.5 rounded font-mono font-bold">
                      BOWL 1
                    </span>
                  </div>
                  <input
                    id="admin-lunch-sabzi1"
                    type="text"
                    value={lunchSabzi1}
                    onChange={(e) => setLunchSabzi1(e.target.value)}
                    placeholder="e.g. Sabzi 1 (changes daily)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-emerald-300 bg-white font-bold text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                    required
                  />
                  
                  {/* Quick Presets for Sabzi 1 */}
                  <div className="mt-2.5">
                    <span className="text-[10px] uppercase font-mono text-emerald-800 font-bold block mb-1">
                      Quick Presets:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        'Sabzi 1',
                        'Aloo Matar',
                        'Chole Masala',
                        'Paneer Gravy',
                        'Mix Veg'
                      ].map(preset => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => handleSelectSabzi1Preset(preset)}
                          className={`text-[11px] font-mono px-2.5 py-1 rounded-lg border font-bold transition-all cursor-pointer ${
                            lunchSabzi1 === preset
                              ? 'bg-emerald-700 text-white border-emerald-800 shadow-2xs'
                              : 'bg-white hover:bg-emerald-100 text-emerald-900 border-emerald-300'
                          }`}
                        >
                          {preset}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Field 3: Sabzi 2 (INDEPENDENT FIELD) */}
                <div className="bg-indigo-50/70 p-4 rounded-2xl border-2 border-[#7C5CFF]/60 shadow-xs">
                  <div className="flex items-center justify-between mb-1">
                    <label className="block font-mono text-xs font-bold uppercase text-indigo-900">
                      🥗 Sabzi 2 (Independent Field)
                    </label>
                    <span className="text-[9px] bg-indigo-200 text-indigo-900 px-1.5 py-0.5 rounded font-mono font-bold">
                      BOWL 2
                    </span>
                  </div>
                  <input
                    id="admin-lunch-sabzi2"
                    type="text"
                    value={lunchSabzi2}
                    onChange={(e) => setLunchSabzi2(e.target.value)}
                    placeholder="e.g. Sabzi 2 (changes daily)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-indigo-300 bg-white font-bold text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                    required
                  />

                  {/* Quick Presets for Sabzi 2 */}
                  <div className="mt-2.5">
                    <span className="text-[10px] uppercase font-mono text-indigo-800 font-bold block mb-1">
                      Quick Presets:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        'Sabzi 2',
                        'Bhindi Fry',
                        'Jeera Aloo',
                        'Mix Veg',
                        'Baingan Masala'
                      ].map(preset => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => handleSelectSabzi2Preset(preset)}
                          className={`text-[11px] font-mono px-2.5 py-1 rounded-lg border font-bold transition-all cursor-pointer ${
                            lunchSabzi2 === preset
                              ? 'bg-indigo-700 text-white border-indigo-800 shadow-2xs'
                              : 'bg-white hover:bg-indigo-100 text-indigo-900 border-indigo-300'
                          }`}
                        >
                          {preset}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Field 4: Dal */}
                <div className="bg-amber-50/70 p-4 rounded-2xl border-2 border-amber-400 shadow-xs">
                  <div className="flex items-center justify-between mb-1">
                    <label className="block font-mono text-xs font-bold uppercase text-amber-950">
                      🥣 Dal (Daily Special)
                    </label>
                    <span className="text-[9px] bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded font-mono font-bold">
                      BOWL 3
                    </span>
                  </div>
                  <input
                    id="admin-lunch-dal"
                    type="text"
                    value={lunchDal}
                    onChange={(e) => setLunchDal(e.target.value)}
                    placeholder="e.g. Dal Tadka"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 bg-white font-bold text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
                    required
                  />

                  {/* Quick Presets for Dal */}
                  <div className="mt-2.5">
                    <span className="text-[10px] uppercase font-mono text-amber-900 font-bold block mb-1">
                      Quick Presets:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        'Dal Tadka',
                        'Dal Fry',
                        'Moong Dal',
                        'Yellow Dal',
                        'Dal Makhani'
                      ].map(preset => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => handleSelectDalPreset(preset)}
                          className={`text-[11px] font-mono px-2.5 py-1 rounded-lg border font-bold transition-all cursor-pointer ${
                            lunchDal === preset
                              ? 'bg-amber-700 text-white border-amber-800 shadow-2xs'
                              : 'bg-white hover:bg-amber-100 text-amber-900 border-amber-300'
                          }`}
                        >
                          {preset}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Field 5: Rice */}
                <div className="bg-slate-100/80 p-4 rounded-2xl border-2 border-slate-300 shadow-xs">
                  <div className="flex items-center justify-between mb-1">
                    <label className="block font-mono text-xs font-bold uppercase text-slate-800">
                      🍚 Rice (Daily Special)
                    </label>
                    <span className="text-[9px] bg-slate-300 text-slate-800 px-1.5 py-0.5 rounded font-mono font-bold">
                      PORTION 4
                    </span>
                  </div>
                  <input
                    id="admin-lunch-rice"
                    type="text"
                    value={lunchRice}
                    onChange={(e) => setLunchRice(e.target.value)}
                    placeholder="e.g. Steamed Rice"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white font-bold text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-500 font-mono"
                    required
                  />

                  {/* Quick Presets for Rice */}
                  <div className="mt-2.5">
                    <span className="text-[10px] uppercase font-mono text-slate-700 font-bold block mb-1">
                      Quick Presets:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        'Steamed Rice',
                        'Jeera Rice',
                        'Veg Pulao',
                        'Curd Rice'
                      ].map(preset => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => handleSelectRicePreset(preset)}
                          className={`text-[11px] font-mono px-2.5 py-1 rounded-lg border font-bold transition-all cursor-pointer ${
                            lunchRice === preset
                              ? 'bg-slate-800 text-white border-slate-900 shadow-2xs'
                              : 'bg-white hover:bg-slate-200 text-slate-800 border-slate-300'
                          }`}
                        >
                          {preset}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* Price, Availability & Notes */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
                
                {/* Price */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-300">
                  <label className="block font-mono text-xs font-bold uppercase text-slate-700 mb-1">
                    ₹ Lunch Meal Rate
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 font-bold text-slate-500 font-mono">₹</span>
                    <input
                      id="admin-lunch-price"
                      type="number"
                      min="10"
                      max="300"
                      value={lunchPrice}
                      onChange={(e) => setLunchPrice(Number(e.target.value))}
                      className="w-full pl-8 pr-3 py-2 rounded-xl border border-slate-300 bg-white font-mono font-bold text-base text-slate-900"
                      required
                    />
                  </div>
                </div>

                {/* Availability Toggle */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-300">
                  <label className="block font-mono text-xs font-bold uppercase text-slate-700 mb-2">
                    Lunch Availability (Mark Sold Out)
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      id="admin-lunch-avail-true"
                      type="button"
                      onClick={() => setLunchAvailable(true)}
                      className={`flex-1 py-2 px-3 rounded-xl font-mono text-xs font-bold border transition-colors cursor-pointer ${
                        lunchAvailable 
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs' 
                          : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      Available
                    </button>
                    <button
                      id="admin-lunch-avail-false"
                      type="button"
                      onClick={() => setLunchAvailable(false)}
                      className={`flex-1 py-2 px-3 rounded-xl font-mono text-xs font-bold border transition-colors cursor-pointer ${
                        !lunchAvailable 
                          ? 'bg-rose-600 text-white border-rose-600 shadow-xs' 
                          : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      Sold Out
                    </button>
                  </div>
                </div>

                {/* Counter Note */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-300">
                  <label className="block font-mono text-xs font-bold uppercase text-slate-700 mb-1">
                    Counter Dispatch Note
                  </label>
                  <input
                    type="text"
                    value={lunchNote}
                    onChange={(e) => setLunchNote(e.target.value)}
                    placeholder="e.g. Ready at Counter 2 (Lunch)"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs font-medium text-slate-900"
                  />
                </div>

              </div>

              {/* Save Button */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  id="save-lunch-btn"
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-[#1F2937] hover:bg-slate-800 text-[#FFD166] font-mono font-bold text-sm tracking-wider uppercase shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
                >
                  <span>💾</span>
                  <span>Save & Broadcast Lunch</span>
                </button>
              </div>

            </form>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: MENU REGISTER (EDIT BREAKFAST, LUNCH, SNACKS, DRINKS) */}
        {/* ========================================================= */}
        {activeTab === 'menu' && (
          <div className="mt-6 bg-[#FFFDF8] rounded-3xl p-6 sm:p-8 border-2 border-slate-300 shadow-md">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-dashed border-slate-200 pb-4 mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-black font-mono uppercase text-[#1F2937]">
                  Canteen Menu Register (Breakfast, Lunch, Snacks & Drinks)
                </h2>
                <p className="text-xs text-slate-600 font-mono mt-1">
                  Admins can edit pricing, update categories, change descriptions, and mark items Sold Out.
                </p>
              </div>

              <button
                id="admin-add-item-toggle"
                type="button"
                onClick={() => setShowAddItem(!showAddItem)}
                className="px-4 py-2 rounded-xl bg-[#7C5CFF] hover:bg-indigo-600 text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-xs transition-transform active:scale-95 cursor-pointer"
              >
                <span>{showAddItem ? '✕ Close Form' : '+ Add New Menu Item'}</span>
              </button>
            </div>

            {/* Category Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1">
                {([
                  { id: 'all', label: 'All' },
                  { id: 'breakfast-snacks', label: 'Breakfast / Snacks' },
                  { id: 'meals', label: 'Meals' },
                  { id: 'lunch', label: 'Lunch' },
                  { id: 'hot-drinks', label: 'Hot Drinks' },
                  { id: 'cold-drinks', label: 'Cold Drinks' }
                ] as const).map(cat => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setAdminMenuCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                      adminMenuCategory === cat.id
                        ? 'bg-[#1F2937] text-[#FFD166] shadow-xs'
                        : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-300'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <input
                type="text"
                value={menuSearch}
                onChange={(e) => setMenuSearch(e.target.value)}
                placeholder="Search menu items..."
                className="w-full sm:w-60 px-3 py-1.5 rounded-xl border border-slate-300 bg-white text-xs font-mono"
              />
            </div>

            {/* Add New Item Form Drawer */}
            {showAddItem && (
              <form onSubmit={handleAddNewItem} className="mb-6 bg-indigo-50/70 border-2 border-[#7C5CFF]/40 rounded-2xl p-4 sm:p-6 space-y-4">
                <h3 className="font-mono text-sm font-bold uppercase text-indigo-900">
                  New Canteen Item Registration
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase text-slate-700 mb-1">
                      Item Name
                    </label>
                    <input
                      type="text"
                      value={newItemName}
                      onChange={(e) => setNewItemName(e.target.value)}
                      placeholder="e.g. Bun Maska"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-sm font-bold"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase text-slate-700 mb-1">
                      Price (₹)
                    </label>
                    <input
                      type="number"
                      min="5"
                      value={newItemPrice}
                      onChange={(e) => setNewItemPrice(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-mono text-sm font-bold"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase text-slate-700 mb-1">
                      Category
                    </label>
                    <select
                      value={newItemCategory}
                      onChange={(e) => setNewItemCategory(e.target.value as FoodCategory)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-sm font-bold font-mono"
                    >
                      <option value="breakfast-snacks">Breakfast / Snacks</option>
                      <option value="meals">Meals</option>
                      <option value="lunch">Lunch</option>
                      <option value="hot-drinks">Hot Drinks</option>
                      <option value="cold-drinks">Cold Drinks</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase text-slate-700 mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    value={newItemDesc}
                    onChange={(e) => setNewItemDesc(e.target.value)}
                    placeholder="e.g. Fresh bun with ample Amul butter"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs font-medium"
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddItem(false)}
                    className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 font-mono font-bold text-xs uppercase cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#1F2937] text-[#FFD166] font-mono font-bold text-xs uppercase cursor-pointer"
                  >
                    + Publish Item to Menu
                  </button>
                </div>
              </form>
            )}

            {/* Menu Items Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="border-b-2 border-slate-300 text-slate-500 uppercase tracking-wider text-[10px]">
                    <th className="py-2.5 px-3">Item</th>
                    <th className="py-2.5 px-3">Category</th>
                    <th className="py-2.5 px-3">Price</th>
                    <th className="py-2.5 px-3">Availability Status</th>
                    <th className="py-2.5 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredMenuItems.map((item) => (
                    <tr key={item.id} className="hover:bg-amber-50/40 transition-colors">
                      <td className="py-3 px-3">
                        <div className="font-extrabold text-sm text-[#1F2937] font-sans">
                          {item.name}
                        </div>
                        <div className="text-[11px] text-slate-500 font-sans truncate max-w-xs">
                          {item.description}
                        </div>
                      </td>

                      <td className="py-3 px-3">
                        <span className="capitalize px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold border border-slate-200">
                          {item.category.replace('-', ' ')}
                        </span>
                      </td>

                      <td className="py-3 px-3 font-bold text-sm text-slate-800">
                        {item.price !== undefined && item.price !== null ? (
                          `₹${item.price}`
                        ) : (
                          <span className="text-slate-400 italic text-xs font-normal">Not specified</span>
                        )}
                      </td>

                      <td className="py-3 px-3">
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleItemAvailabilityChange(item.id, 'AVAILABLE')}
                            className={`px-2 py-1 rounded text-[10px] font-bold border transition-colors cursor-pointer ${
                              item.availability === 'AVAILABLE'
                                ? 'bg-emerald-100 text-emerald-900 border-emerald-400'
                                : 'bg-white text-slate-400 border-slate-200 hover:text-slate-700'
                            }`}
                          >
                            Available
                          </button>
                          <button
                            type="button"
                            onClick={() => handleItemAvailabilityChange(item.id, 'GOING FAST')}
                            className={`px-2 py-1 rounded text-[10px] font-bold border transition-colors cursor-pointer ${
                              item.availability === 'GOING FAST'
                                ? 'bg-amber-100 text-amber-900 border-amber-400'
                                : 'bg-white text-slate-400 border-slate-200 hover:text-slate-700'
                            }`}
                          >
                            Going Fast
                          </button>
                          <button
                            type="button"
                            onClick={() => handleItemAvailabilityChange(item.id, 'SOLD OUT')}
                            className={`px-2 py-1 rounded text-[10px] font-bold border transition-colors cursor-pointer ${
                              item.availability === 'SOLD OUT'
                                ? 'bg-rose-100 text-rose-900 border-rose-400'
                                : 'bg-white text-slate-400 border-slate-200 hover:text-slate-700'
                            }`}
                          >
                            Sold Out
                          </button>
                        </div>
                      </td>

                      <td className="py-3 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Edit Item Button */}
                          <button
                            type="button"
                            onClick={() => setEditingItem(item)}
                            title="Edit Item details & price"
                            className="px-2.5 py-1 text-xs font-mono font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg border border-slate-300 transition-colors cursor-pointer"
                          >
                            ✏️ Edit
                          </button>

                          {/* Quick Sold Out Toggle */}
                          <button
                            type="button"
                            onClick={() => handleItemAvailabilityChange(
                              item.id, 
                              item.availability === 'SOLD OUT' ? 'AVAILABLE' : 'SOLD OUT'
                            )}
                            title={item.availability === 'SOLD OUT' ? 'Mark Available' : 'Mark Sold Out'}
                            className={`px-2 py-1 rounded-lg text-xs font-mono font-bold border cursor-pointer ${
                              item.availability === 'SOLD OUT'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100'
                                : 'bg-rose-50 text-rose-700 border-rose-300 hover:bg-rose-100'
                            }`}
                          >
                            {item.availability === 'SOLD OUT' ? 'Restock' : 'Sold Out'}
                          </button>

                          {/* Delete Item */}
                          <button
                            type="button"
                            onClick={() => handleDeleteItem(item.id)}
                            title="Delete item"
                            className="px-2 py-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors cursor-pointer"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Edit Item Modal */}
            {editingItem && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
                <div className="bg-[#FFFDF8] rounded-3xl p-6 sm:p-8 border-3 border-[#1F2937] shadow-2xl max-w-md w-full">
                  <div className="flex items-center justify-between pb-3 border-b border-dashed border-slate-300 mb-4">
                    <h3 className="font-mono font-black text-lg text-[#1F2937] uppercase">
                      ✏️ Edit Menu Item
                    </h3>
                    <button
                      type="button"
                      onClick={() => setEditingItem(null)}
                      className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>

                  <form onSubmit={handleSaveItemEdit} className="space-y-3 font-mono text-xs">
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                        Item Name
                      </label>
                      <input
                        type="text"
                        value={editingItem.name}
                        onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-bold text-sm"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                          Price (₹)
                        </label>
                        <input
                          type="number"
                          value={editingItem.price ?? ''}
                          onChange={(e) => setEditingItem({ ...editingItem, price: e.target.value === '' ? undefined : Number(e.target.value) })}
                          placeholder="Unspecified"
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-bold text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                          Category
                        </label>
                        <select
                          value={editingItem.category}
                          onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value as FoodCategory })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-bold text-xs"
                        >
                          <option value="breakfast-snacks">Breakfast / Snacks</option>
                          <option value="meals">Meals</option>
                          <option value="lunch">Lunch</option>
                          <option value="hot-drinks">Hot Drinks</option>
                          <option value="cold-drinks">Cold Drinks</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                        Availability Status
                      </label>
                      <div className="grid grid-cols-3 gap-1.5">
                        {(['AVAILABLE', 'GOING FAST', 'SOLD OUT'] as const).map(st => (
                          <button
                            key={st}
                            type="button"
                            onClick={() => setEditingItem({ ...editingItem, availability: st })}
                            className={`py-1.5 px-2 rounded-lg font-bold text-[10px] border cursor-pointer ${
                              editingItem.availability === st
                                ? 'bg-[#1F2937] text-white border-[#1F2937]'
                                : 'bg-white text-slate-600 border-slate-200'
                            }`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                        Description
                      </label>
                      <textarea
                        rows={2}
                        value={editingItem.description || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-sans text-xs"
                      />
                    </div>

                    <div className="pt-2 flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingItem(null)}
                        className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 font-bold uppercase cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-[#1F2937] text-[#FFD166] font-bold uppercase cursor-pointer"
                      >
                        Save Item
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: BREAK BELL & QUEUE CONTROLLER                       */}
        {/* ========================================================= */}
        {activeTab === 'queue' && (
          <div className="mt-6 space-y-6">
            
            {/* Break Bell Time Controller */}
            <div className="bg-[#FFFDF8] rounded-3xl p-6 sm:p-8 border-2 border-slate-300 shadow-md">
              <div className="flex items-center justify-between border-b-2 border-dashed border-slate-200 pb-4 mb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🔔</span>
                    <h2 className="text-xl sm:text-2xl font-black font-mono uppercase text-[#1F2937]">
                      Campus Bell & Next Break Controller
                    </h2>
                  </div>
                  <p className="text-xs text-slate-600 font-mono mt-1">
                    Set the exact Next Break time displayed on the student's notebook.
                  </p>
                </div>

                {breakSavedNotice && (
                  <div className="bg-emerald-100 text-emerald-800 border border-emerald-300 px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 animate-bounce">
                    <span>✓</span>
                    <span>Break Bell updated!</span>
                  </div>
                )}
              </div>

              <form onSubmit={handleSaveBreak} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-300">
                    <label className="block font-mono text-xs font-bold uppercase text-slate-700 mb-1">
                      Next Break Clock / Countdown Display
                    </label>
                    <input
                      id="admin-next-break-input"
                      type="text"
                      value={breakTime}
                      onChange={(e) => setBreakTime(e.target.value)}
                      placeholder="07:32 or 11:30 AM"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white font-mono font-black text-2xl text-[#1F2937]"
                      required
                    />
                    {/* Quick Presets */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {['07:32', '08:05', '11:30 AM', '01:15 PM', '04:00 PM'].map(preset => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => {
                            setBreakTime(preset);
                            onUpdateNextBreak(preset, breakLabel);
                            setBreakSavedNotice(true);
                            setTimeout(() => setBreakSavedNotice(false), 2000);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-white border border-slate-300 font-mono text-xs font-bold hover:bg-amber-100 cursor-pointer"
                        >
                          {preset}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-300 flex flex-col justify-between">
                    <div>
                      <label className="block font-mono text-xs font-bold uppercase text-slate-700 mb-1">
                        Break Context / Period Label
                      </label>
                      <input
                        type="text"
                        value={breakLabel}
                        onChange={(e) => setBreakLabel(e.target.value)}
                        placeholder="After 3rd Period (Signals & Systems)"
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 bg-white font-mono text-xs font-bold text-slate-800"
                      />
                    </div>

                    <div className="pt-3">
                      <button
                        id="admin-save-break-btn"
                        type="submit"
                        className="w-full py-2.5 rounded-xl bg-[#1F2937] text-[#FFD166] font-mono font-bold text-xs uppercase tracking-wider cursor-pointer hover:bg-black transition-colors"
                      >
                        Update Break Bell
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* Queue Controller */}
            <div className="bg-[#FFFDF8] rounded-3xl p-6 sm:p-8 border-2 border-slate-300 shadow-md">
              <div className="flex items-center justify-between border-b-2 border-dashed border-slate-200 pb-4 mb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🚶‍♂️</span>
                    <h2 className="text-xl sm:text-2xl font-black font-mono uppercase text-[#1F2937]">
                      Live Queue Rush Controller
                    </h2>
                  </div>
                  <p className="text-xs text-slate-600 font-mono mt-1">
                    Update queue density (LOW, MEDIUM, HIGH) to guide students before break bell.
                  </p>
                </div>

                {queueSavedNotice && (
                  <div className="bg-emerald-100 text-emerald-800 border border-emerald-300 px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 animate-bounce">
                    <span>✓</span>
                    <span>Queue status updated!</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                
                {/* Rush Level */}
                <div className="p-4 rounded-2xl border-2 border-slate-300 bg-slate-50">
                  <label className="block font-mono text-xs font-bold uppercase text-slate-700 mb-2">
                    Current Rush Level
                  </label>
                  <div className="space-y-2">
                    <button
                      id="admin-queue-low"
                      type="button"
                      onClick={() => {
                        setRushLevel('LOW');
                        handleSaveQueue('LOW');
                      }}
                      className={`w-full p-2.5 rounded-xl border text-left font-mono text-xs font-bold flex items-center justify-between cursor-pointer transition-all ${
                        rushLevel === 'LOW'
                          ? 'bg-emerald-100 text-emerald-900 border-emerald-400 shadow-xs ring-2 ring-emerald-400/50'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-emerald-50/50'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                        <span>LOW</span>
                      </span>
                      <span className="text-[10px] uppercase text-emerald-800 font-black tracking-wider">Chill • ~1-2 min</span>
                    </button>

                    <button
                      id="admin-queue-medium"
                      type="button"
                      onClick={() => {
                        setRushLevel('MEDIUM');
                        handleSaveQueue('MEDIUM');
                      }}
                      className={`w-full p-2.5 rounded-xl border text-left font-mono text-xs font-bold flex items-center justify-between cursor-pointer transition-all ${
                        rushLevel === 'MEDIUM'
                          ? 'bg-amber-100 text-amber-900 border-amber-400 shadow-xs ring-2 ring-amber-400/50'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-amber-50/50'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                        <span>MEDIUM</span>
                      </span>
                      <span className="text-[10px] uppercase text-amber-800 font-black tracking-wider">Moderate • ~4-5 min</span>
                    </button>

                    <button
                      id="admin-queue-high"
                      type="button"
                      onClick={() => {
                        setRushLevel('HIGH');
                        handleSaveQueue('HIGH');
                      }}
                      className={`w-full p-2.5 rounded-xl border text-left font-mono text-xs font-bold flex items-center justify-between cursor-pointer transition-all ${
                        rushLevel === 'HIGH'
                          ? 'bg-rose-100 text-rose-900 border-rose-400 shadow-xs ring-2 ring-rose-400/50'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-rose-50/50'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                        <span>HIGH</span>
                      </span>
                      <span className="text-[10px] uppercase text-rose-800 font-black tracking-wider">Heavy Rush • ~8-12 min</span>
                    </button>
                  </div>
                </div>

                {/* Estimated Wait */}
                <div className="p-4 rounded-2xl border-2 border-slate-300 bg-slate-50">
                  <label className="block font-mono text-xs font-bold uppercase text-slate-700 mb-2">
                    Estimated Wait Window
                  </label>
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-1.5">
                      {['5 min', '10 min', '15 min', '1-2 mins', '4-5 mins', '8-12 mins'].map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => {
                            setQueueWait(time);
                            onUpdateQueue(rushLevel, time, nowServing);
                          }}
                          className={`py-2 px-2.5 rounded-xl border font-mono text-xs font-bold text-center cursor-pointer transition-all ${
                            queueWait === time
                              ? 'bg-[#1F2937] text-white border-[#1F2937] shadow-xs'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          ⏱️ {time}
                        </button>
                      ))}
                    </div>
                    {/* Custom Wait Input */}
                    <div className="mt-2 pt-2 border-t border-slate-200">
                      <label className="block text-[10px] font-mono font-bold text-slate-600 uppercase mb-1">
                        Custom Wait Time:
                      </label>
                      <input
                        type="text"
                        value={queueWait}
                        onChange={(e) => setQueueWait(e.target.value)}
                        placeholder="e.g. 7 min"
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white font-mono text-xs font-bold text-slate-800"
                      />
                    </div>
                  </div>
                </div>

                {/* Now Serving Token */}
                <div className="p-4 rounded-2xl border-2 border-slate-300 bg-slate-50 flex flex-col justify-between">
                  <div>
                    <label className="block font-mono text-xs font-bold uppercase text-slate-700 mb-2">
                      Now Serving at Counter
                    </label>
                    <input
                      type="text"
                      value={nowServing}
                      onChange={(e) => setNowServing(e.target.value)}
                      placeholder="#042"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-mono font-black text-2xl text-center text-[#1F2937]"
                    />
                    <p className="text-[11px] text-slate-500 font-mono mt-1 text-center">
                      Displayed on student live dashboard
                    </p>
                  </div>

                  <div className="mt-3">
                    <button
                      id="admin-update-queue"
                      type="button"
                      onClick={() => handleSaveQueue()}
                      className="w-full py-2.5 rounded-xl bg-[#1F2937] text-[#FFD166] font-mono font-bold text-xs uppercase tracking-wider cursor-pointer hover:bg-black transition-colors"
                    >
                      Update Queue Status
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: ACTIVE ORDER TOKENS DISPATCHER                     */}
        {/* ========================================================= */}
        {activeTab === 'tokens' && (
          <div className="mt-6 bg-[#FFFDF8] rounded-3xl p-6 sm:p-8 border-2 border-slate-300 shadow-md">
            <div className="flex items-center justify-between mb-4 border-b pb-3">
              <div>
                <h3 className="text-lg sm:text-xl font-black font-mono uppercase text-[#1F2937]">
                  Active Student Orders & Token Queue
                </h3>
                <p className="text-xs text-slate-500 font-mono">
                  Live counter dispatcher: update student token status in real-time.
                </p>
              </div>
              <span className="font-mono text-xs font-bold bg-amber-100 text-amber-900 px-3 py-1 rounded-full border border-amber-300">
                {tokens.length} Active Orders
              </span>
            </div>

            {tokens.length === 0 ? (
              <div className="text-center py-12 text-slate-400 font-mono text-xs">
                No orders waiting in queue right now.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tokens.map((token) => (
                  <div key={token.id} className="p-4 rounded-2xl border-2 border-slate-300 bg-white space-y-2 font-mono text-xs">
                    <div className="flex justify-between items-center border-b border-dashed pb-2">
                      <span className="text-base font-black text-[#1F2937]">
                        {token.tokenNumber}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        {token.timestamp}
                      </span>
                    </div>

                    <div className="space-y-1 text-[11px]">
                      {token.items.map((it, idx) => (
                        <div key={idx} className="flex justify-between">
                          <span>{it.quantity}x {it.name}</span>
                          <span className="font-bold">₹{it.price * it.quantity}</span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-dashed pt-2 flex justify-between font-bold text-xs">
                      <span>Total:</span>
                      <span>₹{token.totalAmount}</span>
                    </div>

                    {/* Status Action Buttons */}
                    <div className="pt-2 flex gap-1.5">
                      <button
                        type="button"
                        onClick={() => onUpdateTokenStatus(token.id, 'PREPARING')}
                        className={`flex-1 py-1 rounded text-[10px] font-bold border transition-colors cursor-pointer ${
                          token.status === 'PREPARING'
                            ? 'bg-amber-100 text-amber-900 border-amber-400'
                            : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        Preparing
                      </button>
                      <button
                        type="button"
                        onClick={() => onUpdateTokenStatus(token.id, 'READY')}
                        className={`flex-1 py-1 rounded text-[10px] font-bold border transition-colors cursor-pointer ${
                          token.status === 'READY'
                            ? 'bg-emerald-100 text-emerald-900 border-emerald-400'
                            : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        Ready!
                      </button>
                      <button
                        type="button"
                        onClick={() => onUpdateTokenStatus(token.id, 'COLLECTED')}
                        className={`flex-1 py-1 rounded text-[10px] font-bold border transition-colors cursor-pointer ${
                          token.status === 'COLLECTED'
                            ? 'bg-slate-700 text-white border-slate-700'
                            : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        Picked Up
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: NOTICE BOARD BROADCASTER                           */}
        {/* ========================================================= */}
        {activeTab === 'notices' && (
          <div className="mt-6 bg-[#FFFDF8] rounded-3xl p-6 sm:p-8 border-2 border-slate-300 shadow-md">
            <h2 className="text-xl sm:text-2xl font-black font-mono uppercase text-[#1F2937] mb-1">
              Notice Board & Announcements Broadcaster
            </h2>
            <p className="text-xs text-slate-600 font-mono mb-6">
              Broadcast urgent batches, special combos, or exam schedules to every student screen.
            </p>

            {/* Post Notice Form */}
            <form onSubmit={handleAddNotice} className="mb-8 p-4 bg-amber-50/70 border-2 border-amber-200 rounded-2xl space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={newNoticeText}
                  onChange={(e) => setNewNoticeText(e.target.value)}
                  placeholder="e.g. Special samosa batch ready at 4 PM! Counter 1 accepting UPI."
                  className="flex-1 px-3.5 py-2.5 rounded-xl border border-amber-300 bg-white text-sm font-medium text-slate-900"
                  required
                />

                <select
                  value={newNoticeType}
                  onChange={(e) => setNewNoticeType(e.target.value as any)}
                  className="px-3 py-2 rounded-xl border border-amber-300 bg-white font-mono text-xs font-bold"
                >
                  <option value="urgent">🔴 Urgent Notice</option>
                  <option value="alert">🟡 Alert Notice</option>
                  <option value="info">🔵 General Info</option>
                </select>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#1F2937] text-[#FFD166] font-mono font-bold text-xs uppercase cursor-pointer"
                >
                  📌 Pin Notice
                </button>
              </div>
            </form>

            {/* Active Notices List */}
            <div className="space-y-3">
              {(status.announcements || []).map((notice) => (
                <div
                  key={notice.id}
                  className="p-3.5 bg-white rounded-xl border border-slate-200 flex items-center justify-between gap-3 shadow-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">
                      {notice.type === 'urgent' ? '🚨' : notice.type === 'alert' ? '⚡' : '📌'}
                    </span>
                    <div>
                      <p className="font-handwriting text-base text-[#1F2937] font-bold">
                        {notice.text}
                      </p>
                      <span className="text-[10px] font-mono text-slate-400">
                        {notice.timestamp} • Priority: {notice.type?.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setEditingNotice(notice)}
                      className="text-slate-600 hover:text-indigo-600 font-mono text-xs px-2.5 py-1 rounded bg-slate-100 hover:bg-indigo-50 border border-slate-200 cursor-pointer"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteNotice(notice.id)}
                      className="text-slate-400 hover:text-rose-600 font-mono text-xs px-2 py-1 rounded hover:bg-rose-50 cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Edit Notice Modal */}
            {editingNotice && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
                <div className="bg-[#FFFDF8] rounded-3xl p-6 border-3 border-[#1F2937] shadow-2xl max-w-md w-full">
                  <div className="flex items-center justify-between pb-3 border-b border-dashed border-slate-300 mb-4">
                    <h3 className="font-mono font-black text-lg text-[#1F2937] uppercase">
                      ✏️ Edit Announcement
                    </h3>
                    <button
                      type="button"
                      onClick={() => setEditingNotice(null)}
                      className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>

                  <form onSubmit={handleSaveNoticeEdit} className="space-y-4 font-mono text-xs">
                    <div>
                      <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                        Notice Text
                      </label>
                      <textarea
                        rows={3}
                        value={editingNotice.text}
                        onChange={(e) => setEditingNotice({ ...editingNotice, text: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-medium text-sm text-slate-900"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                        Priority Level
                      </label>
                      <select
                        value={editingNotice.type || 'info'}
                        onChange={(e) => setEditingNotice({ ...editingNotice, type: e.target.value as any })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-mono text-xs font-bold"
                      >
                        <option value="urgent">🔴 Urgent Notice</option>
                        <option value="alert">🟡 Alert Notice</option>
                        <option value="info">🔵 General Info</option>
                      </select>
                    </div>

                    <div className="pt-2 flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingNotice(null)}
                        className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-bold cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-[#1F2937] text-[#FFD166] font-bold uppercase cursor-pointer"
                      >
                        Save Notice
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
