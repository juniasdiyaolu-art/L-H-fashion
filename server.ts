import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

app.use(express.json());

// Catalog summary for Gemini AI Stylist grounding
const CATALOG_SUMMARY = `
Brand: Lydia & Hannah Collective (L&H Collective) - Lagos, Nigeria.
Available items:
1. Sahara Sand Linen Wrap Blouse (₦24,500) - Clothing, Linen, Kimono wrap style, sizes UK 8-14. Great for brunch, work, casual chic.
2. Artisanal Woven Leather Shopper Tote (₦48,500) - Bags, Handwoven full-grain leather, Tan/Black. Fits laptops, daily essentials.
3. Terracotta Tiered Sundown Midi Dress (₦36,000) - Clothing, Silk-cotton blend, Terracotta/Olive, sizes UK 8-16. Elegant gathers, pockets, great for dinner, church, celebrations.
4. Hammered Brass Sculptural Drop Earrings (₦14,500) - Accessories, 18k warm gold brass, lightweight, non-tarnish.
5. Minimalist Saddle Crossbody Bag (₦32,000) - Bags, Sage Olive/Cognac/Black, structured Italian calfskin, brass lock.
6. Victoria Island Wide-Leg Linen Trousers (₦27,500) - Clothing, European flax linen, Cream/Ochre/Olive, sizes UK 8-16. High-waisted, breezy.
7. Zaria Button-Down Sleeveless Jumpsuit (₦34,000) - Clothing, Ecru/Terracotta, coconut buttons, culotte legs, sizes UK 8-14.
8. Lekki Sunset Silk-Blend Slip Skirt (₦22,000) - Clothing, Bronze/Champagne, bias cut, sizes UK 8-14.
9. Artisanal Raffia Bucket Hat (₦16,500) - Accessories, Natural raffia palm, sun protection.
10. Layered Chunky Gold Choker Chain (₦13,500) - Accessories, 18k PVD gold, waterproof, sweatproof.
11. Oshodi Heritage Woven Shoulder Bag (₦39,500) - Bags, 90s baguette style in woven leather.
`;

/**
 * AI Stylist recommendation endpoint
 */
app.post('/api/stylist', async (req, res) => {
  try {
    const { occasion, budget, style, notes } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.json({
        stylingNote: `For a ${occasion || 'special'} occasion with a ${style || 'effortless'} vibe, we recommend pairing our breathable linen separates with artisanal handwoven leather.`,
        recommendedProductIds: ['lh-101', 'lh-106', 'lh-104'],
        outfitTitle: `The ${occasion || 'L&H'} Signature Look`,
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const prompt = `
You are the resident head stylist at Lydia & Hannah Collective (L&H Collective), a luxury-casual fashion brand in Lagos, Nigeria.
A customer is asking for personalized styling advice.
Customer details:
- Occasion: ${occasion || 'Casual outing'}
- Budget preference: ${budget || 'Flexible'}
- Preferred style: ${style || 'Effortless & feminine'}
- Notes: ${notes || 'Flattering and weather-appropriate for Nigeria'}

Available catalog:
${CATALOG_SUMMARY}

Task:
Provide a stylish, warm, encouraging fashion recommendation.
Respond ONLY with a JSON object matching this schema:
{
  "outfitTitle": "Short catchy name for the look (e.g. Lagos Golden Hour Set)",
  "stylingNote": "2-3 sentences of expert styling advice explaining why these pieces work together effortlessly in the Nigerian warmth",
  "recommendedProductIds": ["lh-101", "lh-106", "lh-104"] (pick exactly 2 or 3 product IDs from: lh-101, lh-102, lh-103, lh-104, lh-105, lh-106, lh-107, lh-108, lh-109, lh-111, lh-112)
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const text = response.text || '{}';
    const parsed = JSON.parse(text);
    return res.json(parsed);
  } catch (error: any) {
    console.error('Stylist endpoint error:', error);
    // Return graceful fallback recommendation
    return res.json({
      stylingNote: `An effortless combination curated for ${req.body.occasion || 'your outing'}. Balanced comfort and bespoke elegance.`,
      recommendedProductIds: ['lh-101', 'lh-106', 'lh-102'],
      outfitTitle: 'The Effortless Resort Look',
    });
  }
});

// Vite middleware in dev
const isProd = process.env.NODE_ENV === 'production';
if (!isProd) {
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
  console.log(`L&H Collective server running at http://0.0.0.0:${port}`);
});
