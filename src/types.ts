export type AvailabilityStatus = 'AVAILABLE' | 'GOING FAST' | 'SOLD OUT';
export type ItemAvailability = AvailabilityStatus;

export type FoodCategory = 'breakfast-snacks' | 'meals' | 'lunch' | 'hot-drinks' | 'cold-drinks';

export interface FoodItemData {
  id: string;
  name: string;
  price?: number;
  category: FoodCategory;
  availability: AvailabilityStatus;
  description?: string;
  note?: string;
  isSpecial?: boolean;
  caloriesApprox?: string;
  preparationTime?: string;
  clayIconType?: 'vada-pav' | 'poha' | 'upma' | 'tea' | 'coffee' | 'cold-coffee' | 'cold-drinks' | 'lemon-water' | 'thali' | 'rice' | 'curry' | 'roti' | 'snack';
}

export interface TodayLunchTiffin {
  roti: string; // e.g. "Roti / Poli (4 pcs)"
  sabzi1: string; // Dynamic daily Sabzi 1
  sabzi2: string; // Dynamic daily Sabzi 2
  dal?: string; // Dal
  rice?: string; // Rice
  price: number;
  isAvailable: boolean;
  preparationNote?: string;
}

export type QueueDensity = 'LOW' | 'MEDIUM' | 'HIGH';
export type QueueRushLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface OrderToken {
  id: string;
  tokenNumber: string;
  timestamp: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'PREPARING' | 'READY' | 'COLLECTED' | 'CANCELLED';
  counterLocation?: string;
  specialNotes?: string;
}

export interface CanteenAnnouncement {
  id: string;
  text: string;
  tag?: string;
  type?: 'urgent' | 'alert' | 'info';
  timestamp: string;
}

export interface CanteenStatus {
  nextBreak: string; // e.g. "07:32", admin-controlled single source of truth
  nextBreakMinutes?: number;
  nextBreakLabel: string;
  queueStatus: QueueDensity;
  queueRush: QueueRushLevel;
  queueDescription: string;
  queueCountEstimate: number;
  nowServingToken?: string;
  estimatedWaitTime: string;
  breakBellSchedule?: string;
  todaysSpecial: {
    name: string;
    price: number;
    description: string;
    tag: string;
    note: string;
  };
  lunchTiffin: TodayLunchTiffin;
  todayLunch: TodayLunchTiffin; // Alias for seamless compatibility
  menuItems: FoodItemData[];
  announcements?: CanteenAnnouncement[];
}
