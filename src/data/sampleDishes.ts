import { MealAnalysisResult } from '../types/nutrition';
import salmonBowlImg from '../assets/images/mediterranean_salmon_bowl_1790951010422.jpg';
import burgerFriesImg from '../assets/images/classic_cheeseburger_fries_1790951024302.jpg';
import ramenBowlImg from '../assets/images/japanese_ramen_bowl_1790951036692.jpg';
import acaiBowlImg from '../assets/images/berry_acai_granola_bowl_1790951045156.jpg';

export interface SampleDish {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  estimatedCalories: number;
  tags: string[];
  benchmarkResult: MealAnalysisResult;
}

export const SAMPLE_DISHES: SampleDish[] = [
  {
    id: 'mediterranean-salmon',
    name: 'Mediterranean Salmon & Quinoa Bowl',
    subtitle: 'Wild Atlantic salmon, tri-color quinoa, Hass avocado, blistered tomatoes & tahini',
    image: salmonBowlImg,
    estimatedCalories: 645,
    tags: ['High Protein', 'Gluten-Free', 'Omega-3 Rich', 'Low GI'],
    benchmarkResult: {
      mealName: 'Mediterranean Grilled Salmon Quinoa Bowl',
      cuisine: 'Mediterranean / Healthy Fusion',
      summary: 'A nutrient-dense superfood bowl loaded with heart-healthy omega-3 fatty acids, complete plant proteins from quinoa, and monounsaturated fats from fresh avocado.',
      totalCalories: 645,
      macronutrients: {
        protein: 42,
        carbs: 48,
        fat: 31,
        fiber: 11,
        sugar: 6,
        sodium: 480,
        potassium: 950,
        cholesterol: 75
      },
      micronutrients: [
        { name: 'Vitamin D', amount: '18.5 mcg', percentDailyValue: 92 },
        { name: 'Vitamin B12', amount: '4.2 mcg', percentDailyValue: 175 },
        { name: 'Potassium', amount: '950 mg', percentDailyValue: 27 },
        { name: 'Iron', amount: '3.8 mg', percentDailyValue: 21 },
        { name: 'Magnesium', amount: '120 mg', percentDailyValue: 30 },
        { name: 'Zinc', amount: '2.4 mg', percentDailyValue: 22 }
      ],
      dietaryAttributes: {
        isGlutenFree: true,
        isDairyFree: true,
        isVegetarian: false,
        isVegan: false,
        isKetoFriendly: false,
        isLowSodium: true,
        allergens: ['Fish', 'Sesame']
      },
      glycemicIndex: {
        rating: 'Low',
        value: 38,
        glycemicLoad: 12
      },
      nutriScore: 'A',
      healthAssessment: 'Exceptional nutritional profile. High in cardioprotective EPA/DHA fatty acids and anti-inflammatory phytonutrients with a very low glycemic impact.',
      detectedItems: [
        {
          id: 'item-1',
          name: 'Grilled Atlantic Salmon Fillet',
          category: 'Protein',
          confidence: 98.4,
          estimatedWeightGrams: 170,
          portionDescription: '1 medium grilled fillet (170g)',
          calories: 340,
          macronutrients: { protein: 34, carbs: 0, fat: 22, fiber: 0, sugar: 0 },
          box2d: [160, 220, 520, 710],
          color: '#F43F5E'
        },
        {
          id: 'item-2',
          name: 'Tri-Color Steamed Quinoa',
          category: 'Carbohydrate',
          confidence: 94.7,
          estimatedWeightGrams: 120,
          portionDescription: '1/2 cup cooked (120g)',
          calories: 145,
          macronutrients: { protein: 4.8, carbs: 26, fat: 2.2, fiber: 3.2, sugar: 1.0 },
          box2d: [480, 160, 780, 520],
          color: '#EAB308'
        },
        {
          id: 'item-3',
          name: 'Hass Avocado Slices',
          category: 'Fat & Oil',
          confidence: 96.1,
          estimatedWeightGrams: 60,
          portionDescription: '1/3 fresh avocado sliced (60g)',
          calories: 96,
          macronutrients: { protein: 1.2, carbs: 5.1, fat: 8.8, fiber: 4.0, sugar: 0.4 },
          box2d: [350, 620, 740, 890],
          color: '#10B981'
        },
        {
          id: 'item-4',
          name: 'Roasted Green Asparagus & Cherry Tomatoes',
          category: 'Vegetable',
          confidence: 95.3,
          estimatedWeightGrams: 90,
          portionDescription: 'Mixed roasted vegetables (90g)',
          calories: 38,
          macronutrients: { protein: 1.8, carbs: 7.2, fat: 0.6, fiber: 2.8, sugar: 3.5 },
          box2d: [140, 110, 480, 390],
          color: '#22C55E'
        },
        {
          id: 'item-5',
          name: 'Lemon Herb Tahini Drizzle',
          category: 'Sauce & Condiment',
          confidence: 89.2,
          estimatedWeightGrams: 15,
          portionDescription: '1 tablespoon dressing (15g)',
          calories: 26,
          macronutrients: { protein: 0.8, carbs: 1.4, fat: 2.1, fiber: 0.5, sugar: 0.3 },
          box2d: [310, 340, 560, 630],
          color: '#F59E0B'
        }
      ],
      workoutBurnEquivalents: {
        runningMinutes: 52,
        cyclingMinutes: 65,
        swimmingMinutes: 44,
        walkingMinutes: 118
      },
      deepLearningMetrics: {
        modelName: 'Vision-Transformer Multimodal DL (Gemini 3.8 Flash)',
        inferenceTimeMs: 412,
        featuresAnalyzed: [
          'Spatial 2D Plate Boundary Localization',
          'Surface Texture Segmentation (Salmon Char & Flakes)',
          'Volumetric Depth Projection from Camera Pitch',
          'Cross-Attention Food Category Embedding'
        ],
        volumetricEstimationMethod: 'Circular plate reference diameter scaling (~255mm) with height elevation mapping',
        overallConfidence: 96.2
      },
      recommendations: [
        'Excellent post-workout or recovery meal providing lean amino acids and clean energy.',
        'High natural potassium assists in blood pressure regulation and sodium balancing.',
        'Rich in carotenoids and polyphenols for cellular antioxidant protection.'
      ]
    }
  },
  {
    id: 'classic-cheeseburger',
    name: 'Gourmet Cheeseburger & Crispy Fries',
    subtitle: 'Angus beef patty, melted cheddar, brioche bun, crisp lettuce, tomato & seasoned fries',
    image: burgerFriesImg,
    estimatedCalories: 980,
    tags: ['High Protein', 'Comfort Food', 'Calorie Dense'],
    benchmarkResult: {
      mealName: 'Angus Cheeseburger with Crispy Golden Fries',
      cuisine: 'American Gastro-Pub',
      summary: 'Savory flame-grilled beef burger layered with melted cheddar on a toasted brioche bun, accompanied by crispy seasoned potato fries.',
      totalCalories: 980,
      macronutrients: {
        protein: 48,
        carbs: 88,
        fat: 49,
        fiber: 6.2,
        sugar: 12,
        sodium: 1420,
        potassium: 820,
        cholesterol: 125
      },
      micronutrients: [
        { name: 'Iron', amount: '5.6 mg', percentDailyValue: 31 },
        { name: 'Zinc', amount: '6.8 mg', percentDailyValue: 62 },
        { name: 'Calcium', amount: '280 mg', percentDailyValue: 22 },
        { name: 'Vitamin B12', amount: '3.8 mcg', percentDailyValue: 158 },
        { name: 'Sodium', amount: '1420 mg', percentDailyValue: 62 },
        { name: 'Niacin (B3)', amount: '8.4 mg', percentDailyValue: 53 }
      ],
      dietaryAttributes: {
        isGlutenFree: false,
        isDairyFree: false,
        isVegetarian: false,
        isVegan: false,
        isKetoFriendly: false,
        isLowSodium: false,
        allergens: ['Dairy', 'Gluten', 'Wheat']
      },
      glycemicIndex: {
        rating: 'Medium',
        value: 62,
        glycemicLoad: 38
      },
      nutriScore: 'D',
      healthAssessment: 'Substantial protein density coupled with elevated saturated fats and sodium. Best enjoyed moderately or paired with lighter daily meals.',
      detectedItems: [
        {
          id: 'item-1',
          name: 'Grilled Beef Patty & Melted Cheddar',
          category: 'Protein',
          confidence: 97.9,
          estimatedWeightGrams: 180,
          portionDescription: '1/3 lb beef patty with cheddar slice (180g)',
          calories: 430,
          macronutrients: { protein: 36, carbs: 2, fat: 31, fiber: 0, sugar: 0.5 },
          box2d: [280, 240, 710, 720],
          color: '#EF4444'
        },
        {
          id: 'item-2',
          name: 'Toasted Brioche Bun',
          category: 'Carbohydrate',
          confidence: 96.3,
          estimatedWeightGrams: 75,
          portionDescription: '1 top & bottom brioche bun (75g)',
          calories: 220,
          macronutrients: { protein: 6.5, carbs: 38, fat: 5.2, fiber: 1.5, sugar: 6.8 },
          box2d: [120, 220, 480, 710],
          color: '#F59E0B'
        },
        {
          id: 'item-3',
          name: 'Crispy Seasoned Potato Fries',
          category: 'Carbohydrate',
          confidence: 98.1,
          estimatedWeightGrams: 110,
          portionDescription: '1 medium side serving (110g)',
          calories: 310,
          macronutrients: { protein: 4.2, carbs: 44, fat: 13.5, fiber: 3.8, sugar: 0.8 },
          box2d: [380, 680, 890, 980],
          color: '#EAB308'
        },
        {
          id: 'item-4',
          name: 'Fresh Crisp Lettuce, Tomato & Onion',
          category: 'Vegetable',
          confidence: 92.5,
          estimatedWeightGrams: 45,
          portionDescription: 'Garnish layers (45g)',
          calories: 20,
          macronutrients: { protein: 0.8, carbs: 4.1, fat: 0.2, fiber: 0.9, sugar: 2.4 },
          box2d: [420, 260, 620, 640],
          color: '#10B981'
        }
      ],
      workoutBurnEquivalents: {
        runningMinutes: 78,
        cyclingMinutes: 98,
        swimmingMinutes: 66,
        walkingMinutes: 178
      },
      deepLearningMetrics: {
        modelName: 'Vision-Transformer Multimodal DL (Gemini 3.8 Flash)',
        inferenceTimeMs: 448,
        featuresAnalyzed: [
          'Dual-Object Spatial Disaggregation (Burger vs Fry basket)',
          'Cheese Melt Geometry & Specularity',
          'Bread Crust Browning Index (Maillard Reaction)',
          'Linear Fry Count & Fry Cross-Sectional Thickness'
        ],
        volumetricEstimationMethod: 'Grip ratio perspective calibration & bun diameter standard ~105mm',
        overallConfidence: 96.8
      },
      recommendations: [
        'Consider splitting the fries or opting for a side salad to reduce total saturated fat by 35%.',
        'Increase water intake to balance out the 1,420mg sodium content.',
        'High bioavailable heme iron provides strong support for red blood cell synthesis.'
      ]
    }
  },
  {
    id: 'tonkotsu-ramen',
    name: 'Artisanal Tonkotsu Pork Ramen',
    subtitle: 'Hand-pulled noodles, braised chashu pork belly, seasoned nitamago egg, menma & rich bone broth',
    image: ramenBowlImg,
    estimatedCalories: 760,
    tags: ['Rich Broth', 'High Protein', 'Japanese Classic'],
    benchmarkResult: {
      mealName: 'Traditional Tonkotsu Ramen with Chashu & Nitamago',
      cuisine: 'Japanese Ramen',
      summary: 'Collagen-rich slow-simmered pork bone broth over fresh wheat ramen noodles, topped with tender sliced chashu, soft-boiled marinated egg, and scallions.',
      totalCalories: 760,
      macronutrients: {
        protein: 38,
        carbs: 76,
        fat: 34,
        fiber: 4.5,
        sugar: 4.2,
        sodium: 1850,
        potassium: 640,
        cholesterol: 185
      },
      micronutrients: [
        { name: 'Vitamin A', amount: '220 mcg', percentDailyValue: 24 },
        { name: 'Vitamin B1 (Thiamine)', amount: '0.62 mg', percentDailyValue: 52 },
        { name: 'Choline', amount: '165 mg', percentDailyValue: 30 },
        { name: 'Iron', amount: '4.2 mg', percentDailyValue: 23 },
        { name: 'Calcium', amount: '95 mg', percentDailyValue: 8 }
      ],
      dietaryAttributes: {
        isGlutenFree: false,
        isDairyFree: true,
        isVegetarian: false,
        isVegan: false,
        isKetoFriendly: false,
        isLowSodium: false,
        allergens: ['Gluten', 'Eggs', 'Soy']
      },
      glycemicIndex: {
        rating: 'Medium',
        value: 58,
        glycemicLoad: 31
      },
      nutriScore: 'C',
      healthAssessment: 'High-energy comfort meal loaded with collagen, essential amino acids, and choline. Broth has significant sodium, so sipping broth in moderation is advised.',
      detectedItems: [
        {
          id: 'item-1',
          name: 'Fresh Ramen Wheat Noodles in Tonkotsu Broth',
          category: 'Carbohydrate',
          confidence: 96.8,
          estimatedWeightGrams: 280,
          portionDescription: '1 standard bowl noodles & broth (280g)',
          calories: 420,
          macronutrients: { protein: 14, carbs: 68, fat: 11, fiber: 3.2, sugar: 2.1 },
          box2d: [180, 160, 840, 840],
          color: '#EAB308'
        },
        {
          id: 'item-2',
          name: 'Braised Chashu Pork Belly Slices',
          category: 'Protein',
          confidence: 97.4,
          estimatedWeightGrams: 90,
          portionDescription: '2-3 tender slices (90g)',
          calories: 220,
          macronutrients: { protein: 17, carbs: 2.1, fat: 16.5, fiber: 0, sugar: 1.4 },
          box2d: [290, 180, 680, 520],
          color: '#EF4444'
        },
        {
          id: 'item-3',
          name: 'Ajitsuke Tamago (Seasoned Soft-Boiled Egg)',
          category: 'Protein',
          confidence: 98.7,
          estimatedWeightGrams: 55,
          portionDescription: '1 halved seasoned egg (55g)',
          calories: 82,
          macronutrients: { protein: 6.8, carbs: 1.2, fat: 5.6, fiber: 0, sugar: 0.6 },
          box2d: [480, 520, 760, 780],
          color: '#F97316'
        },
        {
          id: 'item-4',
          name: 'Menma (Bamboo Shoots), Nori & Scallions',
          category: 'Vegetable',
          confidence: 93.1,
          estimatedWeightGrams: 40,
          portionDescription: 'Vegetable garnish & seaweed (40g)',
          calories: 38,
          macronutrients: { protein: 2.1, carbs: 5.2, fat: 0.8, fiber: 1.3, sugar: 0.8 },
          box2d: [180, 480, 440, 820],
          color: '#10B981'
        }
      ],
      workoutBurnEquivalents: {
        runningMinutes: 61,
        cyclingMinutes: 76,
        swimmingMinutes: 52,
        walkingMinutes: 138
      },
      deepLearningMetrics: {
        modelName: 'Vision-Transformer Multimodal DL (Gemini 3.8 Flash)',
        inferenceTimeMs: 428,
        featuresAnalyzed: [
          'Fluid Meniscus & Broth Turbidity Mapping',
          'Egg Yolk Viscosity & Color Space Analysis (L*a*b*)',
          'Noodle Wave Frequency Detection',
          'Pork Belly Inter-Muscular Fat Grain Extraction'
        ],
        volumetricEstimationMethod: 'Conical ceramic bowl depth volume (~650ml rim capacity)',
        overallConfidence: 96.5
      },
      recommendations: [
        'To reduce sodium intake by up to 50%, consume the noodles and toppings without drinking all the broth.',
        'The soft-boiled egg provides complete choline for liver and neurological health.',
        'Menma bamboo shoots contribute prebiotic dietary fiber supporting gut flora.'
      ]
    }
  },
  {
    id: 'berry-acai-bowl',
    name: 'Superfood Berry Acai Granola Bowl',
    subtitle: 'Organic Brazilian acai puree, fresh strawberries, wild blueberries, banana, chia & toasted granola',
    image: acaiBowlImg,
    estimatedCalories: 435,
    tags: ['Antioxidant Rich', 'Vegan', 'High Fiber', 'Natural Fuel'],
    benchmarkResult: {
      mealName: 'Organic Acai Berry Smoothie Bowl with Crunchy Granola',
      cuisine: 'Healthy Breakfast / Vegan Superfood',
      summary: 'Antioxidant-dense frozen acai berry blend garnished with colorful fruit segments, crunchy whole-grain granola, and omega-3 rich chia seeds.',
      totalCalories: 435,
      macronutrients: {
        protein: 8.5,
        carbs: 72,
        fat: 14.5,
        fiber: 13.8,
        sugar: 38,
        sodium: 45,
        potassium: 580,
        cholesterol: 0
      },
      micronutrients: [
        { name: 'Vitamin C', amount: '48 mg', percentDailyValue: 53 },
        { name: 'Manganese', amount: '1.8 mg', percentDailyValue: 78 },
        { name: 'Anthocyanins', amount: '320 mg', percentDailyValue: 100 },
        { name: 'Fiber', amount: '13.8 g', percentDailyValue: 49 },
        { name: 'Iron', amount: '2.1 mg', percentDailyValue: 12 }
      ],
      dietaryAttributes: {
        isGlutenFree: true,
        isDairyFree: true,
        isVegetarian: true,
        isVegan: true,
        isKetoFriendly: false,
        isLowSodium: true,
        allergens: ['Tree Nuts (Coconut)']
      },
      glycemicIndex: {
        rating: 'Medium',
        value: 52,
        glycemicLoad: 18
      },
      nutriScore: 'A',
      healthAssessment: 'Phenomenal antioxidant powerhouse loaded with dietary fiber (nearly 50% DV) and natural micronutrients. Zero saturated animal fats or cholesterol.',
      detectedItems: [
        {
          id: 'item-1',
          name: 'Pureed Acai Berry & Banana Base',
          category: 'Fruit',
          confidence: 98.6,
          estimatedWeightGrams: 200,
          portionDescription: '1 cup frozen thick acai puree (200g)',
          calories: 195,
          macronutrients: { protein: 2.2, carbs: 32, fat: 7.2, fiber: 6.5, sugar: 21 },
          box2d: [120, 110, 880, 890],
          color: '#8B5CF6'
        },
        {
          id: 'item-2',
          name: 'Whole Grain Toasted Oat Granola',
          category: 'Carbohydrate',
          confidence: 95.8,
          estimatedWeightGrams: 40,
          portionDescription: '1/3 cup crunchy clusters (40g)',
          calories: 140,
          macronutrients: { protein: 3.8, carbs: 24, fat: 4.1, fiber: 2.8, sugar: 6.2 },
          box2d: [310, 520, 720, 820],
          color: '#EAB308'
        },
        {
          id: 'item-3',
          name: 'Fresh Strawberries, Blueberries & Banana Slices',
          category: 'Fruit',
          confidence: 97.9,
          estimatedWeightGrams: 90,
          portionDescription: 'Arranged fruit medley (90g)',
          calories: 68,
          macronutrients: { protein: 1.1, carbs: 16.2, fat: 0.4, fiber: 3.1, sugar: 11.2 },
          box2d: [180, 180, 680, 580],
          color: '#EC4899'
        },
        {
          id: 'item-4',
          name: 'Chia Seeds & Shredded Coconut Flakes',
          category: 'Fat & Oil',
          confidence: 93.4,
          estimatedWeightGrams: 10,
          portionDescription: 'Superfood sprinkle topping (10g)',
          calories: 32,
          macronutrients: { protein: 1.4, carbs: 1.8, fat: 2.8, fiber: 1.4, sugar: 0.4 },
          box2d: [480, 360, 780, 640],
          color: '#06B6D4'
        }
      ],
      workoutBurnEquivalents: {
        runningMinutes: 35,
        cyclingMinutes: 44,
        swimmingMinutes: 29,
        walkingMinutes: 80
      },
      deepLearningMetrics: {
        modelName: 'Vision-Transformer Multimodal DL (Gemini 3.8 Flash)',
        inferenceTimeMs: 388,
        featuresAnalyzed: [
          'Linear Radial Pattern Segmentation (Fruit Rows)',
          'Berry Pigment Spectrometry (Polyphenol Signature)',
          'Granola Particle Granularity Clustering',
          'Coconut Shell Bowl Diameter Geometric Normalization'
        ],
        volumetricEstimationMethod: 'Circular bowl rim calibration (~140mm diameter)',
        overallConfidence: 97.2
      },
      recommendations: [
        'Top-tier pre-workout or morning energizer delivering clean glucose alongside soluble beta-glucan fibers.',
        'High natural vitamin C enhances collagen synthesis and iron bioavailability.',
        'For lower sugar intake, emphasize nuts and unsweetened seeds over sweetened granola.'
      ]
    }
  }
];
