import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI API with API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    // Request completion from OpenAI
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: `Immigration question: ${prompt}` }],
    });

    const aiResponse = response.choices[0]?.message?.content || 'No response from AI';
    return NextResponse.json({ reply: aiResponse.trim() });
  } catch (error: unknown) { // Change 'any' to 'unknown'
    if (error instanceof Error) {
      console.error('Error during AI request:', error.message);
    } else {
      console.error('Error during AI request:', error); // Fallback if it's not an Error instance
    }
    return NextResponse.json(
      { error: 'Failed to fetch AI response' },
      { status: 500 }
    );
  }
}
