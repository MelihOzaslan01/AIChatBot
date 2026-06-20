import { GoogleGenAI, Chat } from '@google/genai';

class GeminiService {
  private ai: GoogleGenAI | null = null;
  private chatSession: Chat | null = null;

  init() {
    if (!this.ai) {
      // Initialize the SDK. It automatically picks up process.env.API_KEY in the environment.
      this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY, vertexai: true });
    }
    
    if (!this.chatSession) {
      // Create a chat session to maintain conversation history
      this.chatSession = this.ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: `You are a knowledgeable, professional, and trustworthy financial assistant for 'Apex Financial Services'.
          Your primary role is to educate users about different types of investment accounts (e.g., Traditional IRA, Roth IRA, 401(k), Brokerage accounts, 529 plans, High-Yield Savings, CDs).
          - Provide clear, concise, and accurate information.
          - Use formatting (bullet points, bold text) to make complex information easy to read.
          - If asked about topics outside of financial accounts or basic investing principles, politely steer the conversation back to your area of expertise.
          - Maintain a professional, reassuring, and helpful tone.
          - Do not provide specific stock recommendations or personalized financial advice.`,
          temperature: 0.2, // Lower temperature for more factual and consistent responses
        }
      });
    }
  }

  async sendMessage(message: string): Promise<string> {
    this.init();
    
    if (!this.chatSession) {
      throw new Error("Chat session failed to initialize.");
    }
    
    try {
      const response = await this.chatSession.sendMessage({ message });
      return response.text || "I'm sorry, I couldn't generate a response at this time.";
    } catch (error) {
      console.error("Gemini API Error:", error);
      throw new Error("Failed to communicate with the financial assistant.");
    }
  }
}

export const geminiService = new GeminiService();
