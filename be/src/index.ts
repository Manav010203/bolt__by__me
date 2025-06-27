import { GoogleGenerativeAI } from '@google/generative-ai';
const API_KEY = 'AIzaSyDaEXVeA07xeA3T5ypMG2z9yKY6A76N_h8'; 
async function runGeminiExample() {

  const genAI = new GoogleGenerativeAI(API_KEY);

  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  const prompt = "tell me about ai in 100 words";

  console.log("Sending prompt to Gemini API...");
  console.log(`Prompt: "${prompt}"`);

  try {
    const result = await model.generateContentStream(prompt);
    

    console.log("\n--- Gemini API Response ---");
    for await(const chunk of result.stream){
        console.log(chunk.text()||' ');
    }
    
    console.log("---------------------------\n");

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
      console.error("Error message:", error.message);
    }
  }
}
runGeminiExample();


