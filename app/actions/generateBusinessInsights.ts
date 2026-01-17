"use server";

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface BusinessInsight {
  plainExplanation: string;
  quantifiedRevenueLoss: string;
  nonTechnicalSteps: string[];
}

export async function generateBusinessInsights(
  technicalFinding: string,
  leakingRevenue?: number
): Promise<{ insights?: BusinessInsight; error?: string }> {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return {
        error: "OpenAI API key is not configured",
      };
    }

    const prompt = `You are an AI consultant helping a 50-year-old business owner understand a technical analytics finding. 

TECHNICAL FINDING: "${technicalFinding}"
${leakingRevenue ? `ESTIMATED MONTHLY REVENUE LOSS: $${leakingRevenue.toLocaleString()}` : ''}

Please provide:
1. A plain explanation (2-3 sentences) explaining this finding in simple terms that a non-technical business owner would understand. Avoid jargon and technical terms.
2. Quantify the potential revenue loss if this issue is not fixed. Use the estimated monthly revenue loss provided, or estimate based on the finding if not provided. Explain it in terms of annual impact and what it means for the business.
3. Suggest exactly 3 non-technical steps the business owner can take to start fixing this issue. Each step should be actionable and not require coding knowledge.

Respond in JSON format:
{
  "plainExplanation": "...",
  "quantifiedRevenueLoss": "...",
  "nonTechnicalSteps": ["step 1", "step 2", "step 3"]
}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a business consultant who translates technical findings into clear, actionable business insights for non-technical business owners.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      return {
        error: "No response from OpenAI",
      };
    }

    try {
      const insights = JSON.parse(content) as BusinessInsight;
      return { insights };
    } catch (parseError) {
      console.error("Error parsing OpenAI response:", parseError);
      return {
        error: "Failed to parse AI response",
      };
    }
  } catch (error) {
    console.error("Error generating business insights:", error);
    return {
      error: error instanceof Error ? error.message : "Failed to generate business insights",
    };
  }
}

