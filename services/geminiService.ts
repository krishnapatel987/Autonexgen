
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are the Autonexgen Virtual Assistant. 
Autonexgen (autonexgen.com) is a premier AI Automation Agency based in Ahmedabad, India.
We specialize in:
1. AI Agents & Chatbots (WhatsApp, Web, Voice)
2. Workflow Automation (Make.com, n8n, Zapier)
3. Custom AI Solutions (Predictive modeling, OCR, Proprietary tools)

Your tone: Professional, innovative, helpful, and concise. 
If asked about contact info, provide contact@autonexgen.com.
If asked about pricing, mention that we offer custom quotes based on business needs.
If asked about services, list the three categories above.
Always encourage the user to "Book a Consultation" for deep dives.
`;

/**
 * Fix: Refactored to comply with @google/genai coding standards.
 * - Initializing a new GoogleGenAI instance with the named parameter 'apiKey'.
 * - Using 'gemini-3-flash-preview' for basic text interaction.
 * - Explicitly setting a thinkingBudget when maxOutputTokens is defined to ensure response generation.
 * - Accessing response text via the '.text' property.
 */
export async function getGeminiResponse(userPrompt: string) {
  // Always use new GoogleGenAI({apiKey: process.env.API_KEY}) to initialize the client.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    // Calling generateContent with the appropriate model name and prompt.
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        // When setting maxOutputTokens, we must also set thinkingBudget to avoid the response being blocked by reasoning tokens.
        maxOutputTokens: 500,
        thinkingConfig: { thinkingBudget: 100 },
      },
    });

    // Extracting generated text directly from the response property.
    return response.text || "I'm sorry, I couldn't process that request right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The system is currently undergoing a brief maintenance. Please try again in a moment.";
  }
}
