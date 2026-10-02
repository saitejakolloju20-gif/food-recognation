import express, { Request, Response } from 'express';
import { GoogleGenAI, Type } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);

// Allow large image uploads (up to 25MB base64)
app.use(express.json({ limit: '25mb' }));

// Server-side Gemini API client initialization
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

app.post('/api/analyze-food', async (req: Request, res: Response): Promise<void> => {
  const startTime = Date.now();
  try {
    const { imageBase64, mimeType = 'image/jpeg', userPrompt } = req.body;

    if (!imageBase64) {
      res.status(400).json({ error: 'Missing imageBase64 payload.' });
      return;
    }

    if (!process.env.GEMINI_API_KEY) {
      res.status(500).json({
        error: 'GEMINI_API_KEY environment variable is not configured.',
      });
      return;
    }

    // Clean base64 if it has data URL prefix
    const cleanBase64 = imageBase64.replace(/^data:image\/[a-zA-Z0-9+.-]+;base64,/, '');

    const systemInstruction = `You are a world-class AI Computer Vision & Clinical Nutritionist system specialized in Deep Learning Food Image Recognition, Multi-Item Spatial Segmentation, and Caloric/Macronutrient Quantification.
Given an image of a meal or food item:
1. Detect and spatially locate all distinct individual food components with normalized 2D bounding boxes [ymin, xmin, ymax, xmax] on a scale of 0 to 1000.
2. Accurately identify each food item, assign a classification confidence percentage (e.g. 96.5%), categorize it (Protein, Carbohydrate, Vegetable, Fruit, Dairy, Fat & Oil, Sauce & Condiment, Beverage, Other), and estimate its mass in grams based on standard plate/bowl volume heuristics.
3. Compute precise caloric energy (kcal) and macronutrients (protein, carbs, fat, fiber, sugar, sodium, potassium, cholesterol).
4. Provide comprehensive micronutrients (vitamins, minerals) with % Daily Value (DV).
5. Evaluate Glycemic Index (Low: <=55, Medium: 56-69, High: >=70) & Glycemic Load.
6. Assign an evidence-based Nutri-Score (A, B, C, D, or E).
7. Calculate physical exercise burn time equivalents (running at 10km/h, cycling, swimming, brisk walking).
8. Detail the computer vision deep learning feature vectors (texture patterns, specular highlights, geometry projection, volume heuristics).`;

    const promptText = `Analyze this food image using deep learning computer vision:
- Detect every food item with 2D bounding box coordinates [ymin, xmin, ymax, xmax] from 0 to 1000.
- Calculate accurate portion sizes, calories, and macronutrients.
${userPrompt ? `User notes: "${userPrompt}"` : ''}
Return strict JSON adhering to the specified schema.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: [
        {
          role: 'user',
          parts: [
            {
              inlineData: {
                mimeType: mimeType || 'image/jpeg',
                data: cleanBase64,
              },
            },
            {
              text: promptText,
            },
          ],
        },
      ],
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            mealName: { type: Type.STRING, description: 'Overall descriptive name of the meal' },
            cuisine: { type: Type.STRING, description: 'Cuisine style or category' },
            summary: { type: Type.STRING, description: 'Concise summary of the nutritional composition' },
            totalCalories: { type: Type.NUMBER, description: 'Total estimated calories in kcal' },
            macronutrients: {
              type: Type.OBJECT,
              properties: {
                protein: { type: Type.NUMBER, description: 'Protein in grams' },
                carbs: { type: Type.NUMBER, description: 'Carbohydrates in grams' },
                fat: { type: Type.NUMBER, description: 'Fat in grams' },
                fiber: { type: Type.NUMBER, description: 'Dietary fiber in grams' },
                sugar: { type: Type.NUMBER, description: 'Sugar in grams' },
                sodium: { type: Type.NUMBER, description: 'Sodium in milligrams' },
                potassium: { type: Type.NUMBER, description: 'Potassium in milligrams' },
                cholesterol: { type: Type.NUMBER, description: 'Cholesterol in milligrams' },
              },
              required: ['protein', 'carbs', 'fat', 'fiber', 'sugar', 'sodium', 'potassium', 'cholesterol'],
            },
            micronutrients: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING, description: 'Micronutrient name (e.g., Vitamin C, Iron)' },
                  amount: { type: Type.STRING, description: 'Amount with units, e.g., 45 mg' },
                  percentDailyValue: { type: Type.NUMBER, description: 'Percentage of recommended daily intake' },
                },
                required: ['name', 'amount', 'percentDailyValue'],
              },
            },
            dietaryAttributes: {
              type: Type.OBJECT,
              properties: {
                isGlutenFree: { type: Type.BOOLEAN },
                isDairyFree: { type: Type.BOOLEAN },
                isVegetarian: { type: Type.BOOLEAN },
                isVegan: { type: Type.BOOLEAN },
                isKetoFriendly: { type: Type.BOOLEAN },
                isLowSodium: { type: Type.BOOLEAN },
                allergens: { type: Type.ARRAY, items: { type: Type.STRING } },
              },
              required: ['isGlutenFree', 'isDairyFree', 'isVegetarian', 'isVegan', 'isKetoFriendly', 'isLowSodium', 'allergens'],
            },
            glycemicIndex: {
              type: Type.OBJECT,
              properties: {
                rating: { type: Type.STRING, description: 'Low, Medium, or High' },
                value: { type: Type.NUMBER, description: 'Estimated Glycemic Index 0-100' },
                glycemicLoad: { type: Type.NUMBER, description: 'Estimated Glycemic Load' },
              },
              required: ['rating', 'value', 'glycemicLoad'],
            },
            nutriScore: { type: Type.STRING, description: 'Nutri-Score letter grade: A, B, C, D, or E' },
            healthAssessment: { type: Type.STRING, description: 'Holistic health and diet assessment' },
            detectedItems: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  name: { type: Type.STRING, description: 'Name of the recognized food component' },
                  category: { type: Type.STRING, description: 'Protein, Carbohydrate, Vegetable, Fruit, Dairy, Fat & Oil, Sauce & Condiment, Beverage, Other' },
                  confidence: { type: Type.NUMBER, description: 'Recognition confidence percentage (0-100)' },
                  estimatedWeightGrams: { type: Type.NUMBER, description: 'Estimated weight in grams' },
                  portionDescription: { type: Type.STRING, description: 'Human-readable portion size' },
                  calories: { type: Type.NUMBER, description: 'Calories for this item' },
                  macronutrients: {
                    type: Type.OBJECT,
                    properties: {
                      protein: { type: Type.NUMBER },
                      carbs: { type: Type.NUMBER },
                      fat: { type: Type.NUMBER },
                      fiber: { type: Type.NUMBER },
                      sugar: { type: Type.NUMBER },
                    },
                    required: ['protein', 'carbs', 'fat'],
                  },
                  box2d: {
                    type: Type.ARRAY,
                    items: { type: Type.NUMBER },
                    description: '[ymin, xmin, ymax, xmax] 0-1000 coordinates',
                  },
                },
                required: ['id', 'name', 'category', 'confidence', 'estimatedWeightGrams', 'portionDescription', 'calories', 'macronutrients', 'box2d'],
              },
            },
            workoutBurnEquivalents: {
              type: Type.OBJECT,
              properties: {
                runningMinutes: { type: Type.NUMBER, description: 'Running at 10km/h minutes' },
                cyclingMinutes: { type: Type.NUMBER, description: 'Moderate cycling minutes' },
                swimmingMinutes: { type: Type.NUMBER, description: 'Swimming laps minutes' },
                walkingMinutes: { type: Type.NUMBER, description: 'Brisk walking minutes' },
              },
              required: ['runningMinutes', 'cyclingMinutes', 'swimmingMinutes', 'walkingMinutes'],
            },
            deepLearningMetrics: {
              type: Type.OBJECT,
              properties: {
                modelName: { type: Type.STRING },
                featuresAnalyzed: { type: Type.ARRAY, items: { type: Type.STRING } },
                volumetricEstimationMethod: { type: Type.STRING },
                overallConfidence: { type: Type.NUMBER },
              },
              required: ['modelName', 'featuresAnalyzed', 'volumetricEstimationMethod', 'overallConfidence'],
            },
            recommendations: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Nutritional and culinary health recommendations',
            },
          },
          required: [
            'mealName',
            'cuisine',
            'summary',
            'totalCalories',
            'macronutrients',
            'micronutrients',
            'dietaryAttributes',
            'glycemicIndex',
            'nutriScore',
            'healthAssessment',
            'detectedItems',
            'workoutBurnEquivalents',
            'deepLearningMetrics',
            'recommendations',
          ],
        },
      },
    });

    const latency = Date.now() - startTime;
    const textOutput = response.text || '{}';
    const parsedData = JSON.parse(textOutput);

    // Ensure latency is documented
    if (parsedData.deepLearningMetrics) {
      parsedData.deepLearningMetrics.inferenceTimeMs = latency;
    }

    // Assign color markers for visual bounding boxes
    const categoryColors: Record<string, string> = {
      Protein: '#F43F5E',
      Carbohydrate: '#EAB308',
      Vegetable: '#22C55E',
      Fruit: '#EC4899',
      Dairy: '#38BDF8',
      'Fat & Oil': '#10B981',
      'Sauce & Condiment': '#F59E0B',
      Beverage: '#8B5CF6',
      Other: '#A855F7',
    };

    if (Array.isArray(parsedData.detectedItems)) {
      parsedData.detectedItems.forEach((item: any, idx: number) => {
        if (!item.id) item.id = `detected-${idx + 1}`;
        item.color = categoryColors[item.category] || '#10B981';
      });
    }

    res.json(parsedData);
  } catch (error: any) {
    console.error('Error analyzing food image:', error);
    res.status(500).json({
      error: error?.message || 'Failed to analyze food image with deep learning vision model.',
    });
  }
});

// Setup Vite middleware in dev or serve dist in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`NutriVision DL server running on http://0.0.0.0:${port}`);
  });
}

startServer();
