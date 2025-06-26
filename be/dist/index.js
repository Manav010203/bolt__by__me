"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const generative_ai_1 = require("@google/generative-ai");
// IMPORTANT: For local development and testing, you can place your API key directly
// here or load it from environment variables.
// For production web apps, DO NOT expose your API key client-side.
// Instead, make API calls from a secure backend server or use Firebase AI Logic.
const API_KEY = 'AIzaSyDaEXVeA07xeA3T5ypMG2z9yKY6A76N_h8'; // <<< REPLACE THIS WITH YOUR KEY
function runGeminiExample() {
    return __awaiter(this, void 0, void 0, function* () {
        // 1. Initialize the GoogleGenerativeAI client.
        //    You pass your API key here.
        const genAI = new generative_ai_1.GoogleGenerativeAI(API_KEY);
        // 2. Select the model you want to use.
        //    'gemini-2.0-flash' is good for quick responses.
        //    'gemini-1.5-pro' is for more complex tasks.
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
        // 3. Define the prompt you want to send to the model.
        const prompt = "can i use u for my app";
        console.log("Sending prompt to Gemini API...");
        console.log(`Prompt: "${prompt}"`);
        try {
            // 4. Make the generateContent API call.
            //    This sends your prompt to the Gemini model and awaits a response.
            const result = yield model.generateContent(prompt);
            // 5. Get the response text from the result.
            //    The 'response' object contains various details, including the generated text.
            const response = yield result.response;
            const text = response.text();
            console.log("\n--- Gemini API Response ---");
            console.log(text);
            console.log("---------------------------\n");
            // Example of handling multiple parts or structured content (if your prompt requests it)
            // You might iterate through response.candidates[0].content.parts
            // or parse JSON if you configured a structured response schema.
        }
        catch (error) {
            console.error("Error calling Gemini API:", error);
            // More detailed error handling might be needed in a real application
            if (error instanceof Error) {
                console.error("Error message:", error.message);
            }
        }
    });
}
// Call the function to run the example.
runGeminiExample();
