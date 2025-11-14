import { GoogleGenAI } from "@google/genai";

// Fix: Initialize GoogleGenAI directly with process.env.API_KEY as per guidelines.
// This assumes the API_KEY environment variable is always available.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeCompliance = async (policyText: string): Promise<string> => {
  // Fix: Removed check for API_KEY as it's assumed to be present.
  
  const prompt = `
    Analyze the following data processing action based on Nigeria's Data Protection Regulation (NDPR). 
    Provide a concise analysis in Markdown format.
    
    Structure your response with the following headings (using Markdown bolding):
    **Compliance Summary:** (A brief one-sentence summary)
    **Potential Risks:** (A bulleted list using hyphens)
    **Recommendations:** (A bulleted list using hyphens)

    Focus on lawful basis, consent, purpose limitation, and data minimization.
    
    ---
    **Action to Analyze:**
    ${policyText}
    ---
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    // Fix: Throw an error to allow for proper error handling in the component, instead of returning an error string.
    if (error instanceof Error) {
        throw new Error(`An error occurred while analyzing the policy: ${error.message}`);
    }
    throw new Error("An unknown error occurred while analyzing the policy.");
  }
};