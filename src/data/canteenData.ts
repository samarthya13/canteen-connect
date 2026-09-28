import { CanteenStatus, FoodItemData } from '../types';

export const initialCanteenStatus: CanteenStatus = {
  nextBreak: '07:32',
  nextBreakMinutes: 7,
  nextBreakLabel: 'After 3rd Period (Signals & Systems)',
  queueStatus: 'MEDIUM',
  queueRush: 'MEDIUM',
  queueDescription: 'Moving steadily — ~4 min wait at billing counter',
  queueCountEstimate: 9,
  estimatedWaitTime: '4 mins',
  nowServingToken: '#042',
  breakBellSchedule: 'Next Bell: 11:30 AM (Recess) • Lunch Break: 1:15 PM',
  todaysSpecial: {
    name: 'Misal Pav',
    price: 60,
    description: 'Authentic spicy sprout curry topped with crunchy farsan, chopped onions, coriander & fresh pav.',
    tag: "Cafeteria Special",
    note: 'Fresh hot batch ready at Counter 1! Keep change ready.'
  },
  lunchTiffin: {
    roti: 'Roti / Poli (4 pcs)',
    sabzi1: 'Sabzi 1',
    sabzi2: 'Sabzi 2',
    dal: 'Dal',
    rice: 'Rice',
    price: 90,
    isAvailable: true,
    preparationNote: 'Served fresh at Counter 2: Roti / Poli, Sabzi 1, Sabzi 2, Dal & Rice.'
  },
  todayLunch: {
    roti: 'Roti / Poli (4 pcs)',
    sabzi1: 'Sabzi 1',
    sabzi2: 'Sabzi 2',
    dal: 'Dal',
    rice: 'Rice',
    price: 90,
    isAvailable: true,
    preparationNote: 'Served fresh at Counter 2: Roti / Poli, Sabzi 1, Sabzi 2, Dal & Rice.'
  },
  menuItems: [], // will be populated below
  announcements: [
    {
      id: 'ann-1',
      text: 'Special Tea & hot Batata Vada batch is ready at Counter 1.',
      tag: 'CANTEEN NOTICE',
      type: 'info',
      timestamp: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })
    },
    {
      id: 'ann-2',
      text: 'Lunch counter #2 opens at 1:15 PM for hot Poli Bhaji & Full Meal.',
      tag: 'CANTEEN NOTICE',
      type: 'alert',
      timestamp: '11:00 AM'
    }
  ]
};

export const menuItems: FoodItemData[] = [
  // =========================================================================
  // HOT DRINKS
  // =========================================================================
  {
    id: 'hd-1',
    name: 'Tea',
    price: 13,
    category: 'hot-drinks',
    availability: 'AVAILABLE',
    description: 'Hot freshly brewed canteen tea.',
    clayIconType: 'tea',
    caloriesApprox: '65 kcal',
    preparationTime: 'Ready'
  },
  {
    id: 'hd-2',
    name: 'Special Tea',
    price: 18,
    category: 'hot-drinks',
    availability: 'AVAILABLE',
    description: 'Rich, aromatic special brewed tea with ginger & spices.',
    clayIconType: 'tea',
    caloriesApprox: '75 kcal',
    preparationTime: 'Ready'
  },
  {
    id: 'hd-3',
    name: 'Black Tea',
    price: 20,
    category: 'hot-drinks',
    availability: 'AVAILABLE',
    description: 'Classic strong brewed black tea without milk.',
    clayIconType: 'tea',
    caloriesApprox: '15 kcal',
    preparationTime: '1 min'
  },
  {
    id: 'hd-4',
    name: 'Lemon Tea',
    price: 20,
    category: 'hot-drinks',
    availability: 'AVAILABLE',
    description: 'Zesty hot tea infused with freshly squeezed lemon.',
    clayIconType: 'tea',
    caloriesApprox: '35 kcal',
    preparationTime: '1 min'
  },
  {
    id: 'hd-5',
    name: 'Green Tea',
    price: 20,
    category: 'hot-drinks',
    availability: 'AVAILABLE',
    description: 'Soothing antioxidant-rich herbal green tea.',
    clayIconType: 'tea',
    caloriesApprox: '5 kcal',
    preparationTime: '2 mins'
  },
  {
    id: 'hd-6',
    name: 'Coffee',
    price: 25,
    category: 'hot-drinks',
    availability: 'AVAILABLE',
    description: 'Freshly brewed hot canteen coffee.',
    note: 'With OR Sugar',
    clayIconType: 'coffee',
    caloriesApprox: '90 kcal',
    preparationTime: 'Ready'
  },
  {
    id: 'hd-7',
    name: 'Black Coffee',
    price: 20,
    category: 'hot-drinks',
    availability: 'AVAILABLE',
    description: 'Bold, invigorating hot black coffee.',
    clayIconType: 'coffee',
    caloriesApprox: '10 kcal',
    preparationTime: '1 min'
  },
  {
    id: 'hd-8',
    name: 'Hot Chocolate',
    price: 45,
    category: 'hot-drinks',
    availability: 'AVAILABLE',
    description: 'Velvety rich warm chocolate drink.',
    clayIconType: 'coffee',
    caloriesApprox: '190 kcal',
    preparationTime: '2 mins'
  },
  {
    id: 'hd-9',
    name: 'Strong Coffee',
    price: 30,
    category: 'hot-drinks',
    availability: 'AVAILABLE',
    description: 'Intense double-strength brewed coffee to power your study session.',
    clayIconType: 'coffee',
    caloriesApprox: '100 kcal',
    preparationTime: '1 min'
  },

  // =========================================================================
  // COLD DRINKS
  // =========================================================================
  {
    id: 'cd-1',
    name: 'Masala Tak',
    price: 30,
    category: 'cold-drinks',
    availability: 'AVAILABLE',
    description: 'Cooling spiced buttermilk tempered with roasted cumin, green chillies & fresh coriander.',
    clayIconType: 'cold-drinks',
    caloriesApprox: '80 kcal',
    preparationTime: 'Instant'
  },
  {
    id: 'cd-2',
    name: 'Lassi',
    price: undefined,
    category: 'cold-drinks',
    availability: 'AVAILABLE',
    description: 'Sweet, thick and creamy homestyle chilled lassi.',
    clayIconType: 'cold-drinks',
    caloriesApprox: '180 kcal',
    preparationTime: 'Instant'
  },
  {
    id: 'cd-3',
    name: 'Kokam',
    price: undefined,
    category: 'cold-drinks',
    availability: 'AVAILABLE',
    description: 'Refreshing traditional Konkani kokum sarbat with a sweet-tangy hint.',
    clayIconType: 'cold-drinks',
    caloriesApprox: '95 kcal',
    preparationTime: 'Instant'
  },

  // =========================================================================
  // BREAKFAST / SNACKS
  // =========================================================================
  {
    id: 'bs-1',
    name: 'Pohe',
    price: 25,
    category: 'breakfast-snacks',
    availability: 'AVAILABLE',
    description: 'Traditional flattened rice tempered with mustard, onions, roasted peanuts, turmeric & crunchy sev.',
    clayIconType: 'poha',
    caloriesApprox: '190 kcal',
    preparationTime: 'Instant'
  },
  {
    id: 'bs-2',
    name: 'Upit / Upma',
    price: 25,
    category: 'breakfast-snacks',
    availability: 'AVAILABLE',
    description: 'Savory roasted semolina tempered with ginger, green chillies & curry leaves.',
    clayIconType: 'upma',
    caloriesApprox: '200 kcal',
    preparationTime: 'Instant'
  },
  {
    id: 'bs-3',
    name: 'Patties',
    price: undefined,
    category: 'breakfast-snacks',
    availability: 'AVAILABLE',
    description: 'Crisp golden baked puff patty with spiced savory filling.',
    clayIconType: 'snack',
    caloriesApprox: '220 kcal',
    preparationTime: 'Ready'
  },
  {
    id: 'bs-4',
    name: 'Vada Pav',
    price: 20,
    category: 'breakfast-snacks',
    availability: 'AVAILABLE',
    description: 'Hot spiced batata vada inside soft pav with dry garlic thecha and green chutney.',
    clayIconType: 'vada-pav',
    caloriesApprox: '280 kcal',
    preparationTime: 'Instant'
  },
  {
    id: 'bs-5',
    name: 'Idli Sambar',
    price: 50,
    category: 'breakfast-snacks',
    availability: 'AVAILABLE',
    description: 'Soft steamed rice idlis served hot with aromatic lentil sambar and coconut chutney.',
    clayIconType: 'snack',
    caloriesApprox: '210 kcal',
    preparationTime: 'Ready'
  },
  {
    id: 'bs-6',
    name: 'Medu Vada Sambar',
    price: 50,
    category: 'breakfast-snacks',
    availability: 'AVAILABLE',
    description: 'Crispy fried lentil donut fritters served with piping hot sambar & fresh coconut chutney.',
    clayIconType: 'snack',
    caloriesApprox: '310 kcal',
    preparationTime: 'Ready'
  },
  {
    id: 'bs-7',
    name: 'Batata Vada Sambar',
    price: 60,
    category: 'breakfast-snacks',
    availability: 'AVAILABLE',
    description: 'Crispy potato vadas immersed in a bowl of hot fragrant lentil sambar.',
    clayIconType: 'vada-pav',
    caloriesApprox: '330 kcal',
    preparationTime: 'Ready'
  },
  {
    id: 'bs-8',
    name: 'Batata Vada Sample',
    price: 60,
    category: 'breakfast-snacks',
    availability: 'AVAILABLE',
    description: 'Golden batata vada served with fiery spicy Kolhapuri sample rassa.',
    clayIconType: 'vada-pav',
    caloriesApprox: '320 kcal',
    preparationTime: 'Ready'
  },
  {
    id: 'bs-9',
    name: 'Misal Pav',
    price: 60,
    category: 'breakfast-snacks',
    availability: 'GOING FAST',
    description: 'Spicy sprouted bean usal topped with crunchy farsan, diced onions, lemon & served with 2 pavs.',
    clayIconType: 'curry',
    caloriesApprox: '380 kcal',
    preparationTime: '2 mins'
  },
  {
    id: 'bs-10',
    name: 'Pav Bhaji',
    price: undefined,
    category: 'breakfast-snacks',
    availability: 'AVAILABLE',
    description: 'Rich spiced mashed mixed vegetable curry garnished with butter, chopped onions, and soft pavs.',
    clayIconType: 'curry',
    caloriesApprox: '410 kcal',
    preparationTime: '3 mins'
  },
  {
    id: 'bs-11',
    name: 'Sabudana Khichdi',
    price: 40,
    category: 'breakfast-snacks',
    availability: 'AVAILABLE',
    description: 'Tender soaked tapioca pearls sautéed with roasted ground peanuts, cumin, ghee & green chillies.',
    clayIconType: 'snack',
    caloriesApprox: '320 kcal',
    preparationTime: 'Ready'
  },
  {
    id: 'bs-12',
    name: 'Thalipith',
    price: undefined,
    category: 'breakfast-snacks',
    availability: 'AVAILABLE',
    description: 'Nutritious multigrain Maharashtrian spiced flatbread roasted on tawa with white butter.',
    clayIconType: 'roti',
    caloriesApprox: '250 kcal',
    preparationTime: '4 mins'
  },

  // =========================================================================
  // MEALS
  // =========================================================================
  {
    id: 'm-1',
    name: 'Rice OR Bhaji',
    price: 30,
    category: 'meals',
    availability: 'AVAILABLE',
    description: 'Single hearty portion of fragrant steamed rice OR bowl of daily homestyle vegetable bhaji.',
    clayIconType: 'rice',
    caloriesApprox: '180 kcal',
    preparationTime: 'Instant'
  },
  {
    id: 'm-2',
    name: 'Veg Pulao',
    price: 60,
    category: 'meals',
    availability: 'AVAILABLE',
    description: 'Fragrant basmati rice gently spiced and tossed with fresh garden vegetables.',
    clayIconType: 'rice',
    caloriesApprox: '340 kcal',
    preparationTime: 'Ready'
  },
  {
    id: 'm-3',
    name: 'Dal Rice',
    price: 50,
    category: 'meals',
    availability: 'AVAILABLE',
    description: 'Homestyle comforting yellow dal tempered with cumin, garlic & mustard over hot steamed rice.',
    clayIconType: 'rice',
    caloriesApprox: '310 kcal',
    preparationTime: 'Ready'
  },

  // =========================================================================
  // LUNCH
  // =========================================================================
  {
    id: 'l-1',
    name: 'Poli Bhaji',
    price: 50,
    category: 'lunch',
    availability: 'AVAILABLE',
    description: 'Fresh wheat polis served with today’s freshly cooked vegetable bhaji.',
    clayIconType: 'thali',
    caloriesApprox: '360 kcal',
    preparationTime: 'Ready'
  },
  {
    id: 'l-2',
    name: 'Puri Bhaji',
    price: 70,
    category: 'lunch',
    availability: 'AVAILABLE',
    description: 'Crispy puffed golden puris served with seasoned potato bhaji.',
    clayIconType: 'thali',
    caloriesApprox: '440 kcal',
    preparationTime: 'Ready'
  },
  {
    id: 'l-3',
    name: 'Full Meal',
    price: 90,
    category: 'lunch',
    availability: 'AVAILABLE',
    isSpecial: true,
    description: 'Complete wholesome canteen thali: Roti / Poli, Sabzi 1, Sabzi 2, Dal & Rice.',
    clayIconType: 'thali',
    caloriesApprox: '550 kcal',
    preparationTime: 'Ready in Tiffin'
  },
  {
    id: 'l-4',
    name: 'Aloo Paratha',
    price: undefined,
    category: 'lunch',
    availability: 'AVAILABLE',
    description: 'Crisp whole wheat tawa paratha stuffed with spiced mashed potatoes, served with pickle.',
    clayIconType: 'roti',
    caloriesApprox: '290 kcal',
    preparationTime: '3 mins'
  },
  {
    id: 'l-5',
    name: 'Methi Paratha',
    price: undefined,
    category: 'lunch',
    availability: 'AVAILABLE',
    description: 'Nutritious flatbread prepared with fresh aromatic fenugreek leaves and mild spices.',
    clayIconType: 'roti',
    caloriesApprox: '240 kcal',
    preparationTime: '3 mins'
  },
  {
    id: 'l-6',
    name: 'Palak Paratha',
    price: undefined,
    category: 'lunch',
    availability: 'AVAILABLE',
    description: 'Healthy vibrant green whole wheat paratha kneaded with spinach puree and spices.',
    clayIconType: 'roti',
    caloriesApprox: '230 kcal',
    preparationTime: '3 mins'
  },
  {
    id: 'l-7',
    name: 'Extra Chapati',
    price: 10,
    category: 'lunch',
    availability: 'AVAILABLE',
    description: 'Single additional fresh whole wheat chapati / poli.',
    clayIconType: 'roti',
    caloriesApprox: '80 kcal',
    preparationTime: 'Instant'
  }
];

initialCanteenStatus.menuItems = menuItems;

export const hydroDialogueQuotes: string[] = [
  "You've survived today's lecture. You deserve a snack.",
  "Debugging code on an empty stomach violates thermodynamics.",
  "Hydrate or diedrate! Plus a hot Vada Pav is approved fuel.",
  "Warning: Brain RAM overflow! Clearing cache with Special Tea...",
  "Next break in 7 mins. Walk briskly to beat the Mech boys to the queue!",
  "Pohe compilation time: ~2 minutes. Perfect for your break window."
];
