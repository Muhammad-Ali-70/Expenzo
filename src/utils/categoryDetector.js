const EXPENSE_KEYWORDS = {
  food: [
    'kfc',
    'mcdonalds',
    'burger',
    'pizza',
    'restaurant',
    'cafe',
    'bakery',
    'karahi',
    'biryani',
    'nihari',
    'haleem',
    'kebab',
    'tikka',
    'korma',
    'pulao',
    'roti',
    'naan',
    'paratha',
    'daal',
    'salan',
    'curry',
    'desi',
    'food',
    'meal',
    'lunch',
    'dinner',
    'breakfast',
    'chai',
    'samosa',
    'pakora',
    'chaat',
    'gol gappa',
    'pani puri',
    'shawarma',
    'roll',
    'sandwich',
    'fries',
    'chicken',
    'mutton',
    'beef',
    'fish',
    'seafood',
    'grocery',
    'groceries',
    'sabzi',
    'anda',
    'egg',
  ],

  petrol: [
    'petrol',
    'fuel',
    'gas',
    'diesel',
    'cng',
    'pump',
    'shell',
    'pso',
    'total',
    'attock',
    'hascol',
    'filling',
    'station',
  ],

  transport: [
    'uber',
    'careem',
    'taxi',
    'rickshaw',
    'bus',
    'metro',
    'train',
    'bykea',
    'indriver',
    'transport',
    'fare',
    'ride',
    'travel',
    'parking',
    'toll',
    'car wash',
    'repair',
    'mechanic',
    'service',
    'bikea',
  ],

  shopping: [
    'mall',
    'clothes',
    'shoes',
    'dress',
    'shirt',
    'jeans',
    'kameez',
    'shalwar',
    'dupatta',
    'jewelry',
    'cosmetics',
    'makeup',
    'accessories',
    'bag',
    'wallet',
    'watch',
    'electronics',
    'mobile',
    'phone',
    'laptop',
    'gadget',
    'shopping',
    'store',
    'boutique',
  ],

  health: [
    'doctor',
    'hospital',
    'clinic',
    'medicine',
    'pharmacy',
    'prescription',
    'medical',
    'health',
    'checkup',
    'test',
    'lab',
    'xray',
    'ultrasound',
    'surgery',
    'dental',
    'dentist',
    'eye',
    'glasses',
    'vitamins',
  ],

  utilities: [
    'electricity',
    'bill',
    'wapda',
    'kelectric',
    'gas bill',
    'ssgc',
    'water',
    'internet',
    'wifi',
    'broadband',
    'nayatel',
    'ptcl',
    'mobile bill',
    'phone bill',
    'utilities',
  ],

  education: [
    'school',
    'college',
    'university',
    'tuition',
    'course',
    'books',
    'stationery',
    'fees',
    'admission',
    'exam',
    'education',
    'learning',
    'training',
    'class',
    'academy',
  ],

  coffee: [
    'coffee',
    'latte',
    'cappuccino',
    'espresso',
    'starbucks',
    'gloria',
    'second cup',
    'espresso',
    'tea',
    'chai',
    'chaye',
  ],

  rent: ['rent', 'house rent', 'apartment', 'landlord', 'rental'],

  gift: [
    'gift',
    'present',
    'birthday',
    'wedding',
    'eidi',
    'donation',
    'charity',
    'sadqa',
    'zakat',
  ],

  investment: [
    'investment',
    'stock',
    'mutual fund',
    'savings',
    'sip',
    'crypto',
    'bitcoin',
    'gold',
    'property',
  ],

  work: ['office', 'work', 'business', 'supplies', 'equipment'],
};

const INCOME_KEYWORDS = {
  salary: ['salary', 'pay', 'paycheck', 'wage', 'tankhwah', 'income'],

  freelance: [
    'freelance',
    'project',
    'client',
    'upwork',
    'fiverr',
    'freelancing',
    'contract',
    'gig',
  ],

  gift: ['gift', 'eidi', 'present', 'bonus'],

  family: ['family', 'parents', 'father', 'mother', 'abbu', 'ammi'],

  friend: ['friend', 'friends', 'borrowed', 'loan return'],

  investment: ['dividend', 'profit', 'returns', 'investment return'],

  refund: ['refund', 'return', 'reimbursement', 'cashback'],

  rental: ['rent', 'rental', 'tenant', 'property rent'],
};

export const detectCategory = (text, type = 'expense') => {
  if (!text || typeof text !== 'string') return null;

  const normalizedText = text.toLowerCase().trim();

  const keywords = type === 'expense' ? EXPENSE_KEYWORDS : INCOME_KEYWORDS;

  for (const [categoryId, keywordList] of Object.entries(keywords)) {
    for (const keyword of keywordList) {
      if (normalizedText.includes(keyword.toLowerCase())) {
        return categoryId;
      }
    }
  }

  return null;
};
