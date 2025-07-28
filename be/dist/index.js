"use strict";
// require("dotenv").config();
// import express from "express";
// import cors from "cors";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { BASE_PROMPT, getSystemPrompt } from "./prompts";
// import { basePrompt as nodeBasePrompt } from "./defaults/node";
// import { basePrompt as reactBasePrompt } from "./defaults/react";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const app = express();
// app.use(cors());
// app.use(express.json());
// // const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
// // const model = genAI.getGenerativeModel({ model: "gemini-pro" }); // Text-only
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
// const model = genAI.getGenerativeModel({
//   model: "gemini-2.0-flash" // ✅ Use this instead of gemini-pro
// });
// app.post("/template", async (req, res) => {
//   const prompt = req.body.prompt;
//   const result = await model.generateContent([
//     `Return either node or react based on what do you think this project should be. Only return a single word either 'node' or 'react'. Do not return anything extra.`,
//     prompt
//   ]);
//   const answer = result.response.text().trim().toLowerCase();
//   if (answer === "react") {
//     res.json({
//       prompts: [
//         BASE_PROMPT,
//         `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`
//       ],
//       uiPrompts: [reactBasePrompt]
//     });
//     return;
//   }
//   if (answer === "node") {
//     res.json({
//       prompts: [
//         `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${nodeBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`
//       ],
//       uiPrompts: [nodeBasePrompt]
//     });
//     return;
//   }
//   res.status(403).json({ message: "You can't access this" });
// });
// app.post("/chat", async (req, res) => {
//   const messages = req.body.messages; // [{role: "user", content: "..."}]
//   const history = messages.map((m: any) => ({
//     role: m.role === "user" ? "user" : "model",
//     parts: [{ text: m.content }]
//   }));
//   const chat = model.startChat({ history });
//   const lastMessage = messages[messages.length - 1];
//   const result = await chat.sendMessage(lastMessage.content);
//   const textResponse = result.response.text();
//   res.json({ response: textResponse });
// });
// app.listen(3000, () => console.log("Server running on port 3000"));
// Import necessary modules
require("dotenv").config(); // Loads environment variables from a .env file
const express_1 = __importDefault(require("express")); // Express.js framework for building web applications
const cors_1 = __importDefault(require("cors")); // Middleware to enable Cross-Origin Resource Sharing
const generative_ai_1 = require("@google/generative-ai"); // Google Gemini API SDK for Node.js
// Import custom prompt constants (assuming these files exist in your project)
const prompts_1 = require("./prompts");
const node_1 = require("./defaults/node");
const react_1 = require("./defaults/react");
// Initialize the Express application
const app = (0, express_1.default)();
// Apply middleware
app.use((0, cors_1.default)()); // Enable CORS for all routes
app.use(express_1.default.json()); // Enable parsing of JSON request bodies
// Initialize the Google Generative AI client
// It's crucial to load the API key from environment variables for security.
// Ensure you have a .env file with GEMINI_API_KEY=YOUR_ACTUAL_GEMINI_API_KEY
const genAI = new generative_ai_1.GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// Get the Generative Model instance
// The 'gemini-2.0-flash' model is chosen for its balance of performance and speed.
// This directly addresses the previous error related to 'gemini-pro' not being found
// or supported for generateContent in v1beta.
const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash" // ✅ Use this instead of gemini-pro
});
/**
 * POST /template endpoint
 * This endpoint determines whether a project should be 'node' or 'react'
 * based on a user-provided prompt, by asking the Gemini model.
 */
app.post("/template", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prompt = req.body.prompt; // Extract the prompt from the request body
    // Send a specific prompt to the Gemini model to classify the project type
    const result = yield model.generateContent([
        `Return either node or react based on what do you think this project should be. Only return a single word either 'node' or 'react'. Do not return anything extra.`,
        prompt // The user's project description
    ]);
    // Extract and normalize the model's answer
    const answer = result.response.text().trim().toLowerCase();
    // Respond based on the model's classification
    if (answer === "react") {
        res.json({
            prompts: [
                prompts_1.BASE_PROMPT, // Assuming BASE_PROMPT is a general instruction
                `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${react_1.basePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`
            ],
            uiPrompts: [react_1.basePrompt] // Prompts specifically for UI generation
        });
        return;
    }
    if (answer === "node") {
        res.json({
            prompts: [
                `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${node_1.basePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`
            ],
            uiPrompts: [node_1.basePrompt] // Prompts specifically for Node.js generation
        });
        return;
    }
    // If the model's answer is neither 'node' nor 'react', return an error
    res.status(403).json({ message: "You can't access this" });
}));
/**
 * POST /chat endpoint
 * This endpoint handles multi-turn chat interactions with the Gemini model.
 */
app.post("/chat", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract messages from the request body.
    // Expected format: [{role: "user", content: "..."}]
    const messages = req.body.messages;
    // Map incoming messages to the format expected by the Gemini API (role and parts)
    const history = messages.map((m) => ({
        role: m.role === "user" ? "user" : "model", // Map 'user' role, others default to 'model'
        parts: [{ text: m.content }] // Content of the message
    }));
    // Start a chat session with the model, providing the conversation history
    const chat = model.startChat({ history });
    // Get the last message from the history, which is the current user's input
    const lastMessage = messages[messages.length - 1];
    // Send the last message to the chat session and get the model's response
    const result = yield chat.sendMessage(lastMessage.content);
    // Extract the text response from the model's result
    const textResponse = result.response.text();
    // Send the model's response back to the client
    res.json({ response: textResponse });
}));
// Start the Express server
app.listen(3000, () => console.log("Server running on port 3000"));
