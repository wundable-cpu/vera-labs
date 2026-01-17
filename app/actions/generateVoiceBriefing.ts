"use server";

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateVoiceBriefing(
  text: string,
  voice: "onyx" | "shimmer" = "onyx"
) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return {
        error: "OpenAI API key is not configured",
        audioBase64: null,
      };
    }

    if (!text || text.trim().length === 0) {
      return {
        error: "Text is required",
        audioBase64: null,
      };
    }

    // Generate speech using OpenAI TTS
    const response = await openai.audio.speech.create({
      model: "tts-1",
      voice: voice,
      input: text,
    });

    // Convert the audio buffer to Base64
    const buffer = Buffer.from(await response.arrayBuffer());
    const audioBase64 = buffer.toString("base64");

    return {
      audioBase64,
      error: null,
    };
  } catch (error) {
    console.error("Error generating voice briefing:", error);
    return {
      error:
        error instanceof Error
          ? error.message
          : "Failed to generate voice briefing",
      audioBase64: null,
    };
  }
}

