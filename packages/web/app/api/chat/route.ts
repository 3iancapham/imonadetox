import { Anthropic } from '@anthropic-ai/sdk';
import { StreamingTextResponse, Message } from 'ai';

// Create a new Anthropic client with your API key
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  // Convert the chat history to Claude's format
  const formattedMessages = messages.map((message: Message) => ({
    role: message.role === 'user' ? 'user' : 'assistant',
    content: message.content,
  }));

  // Create a stream from Claude
  const response = await anthropic.messages.create({
    model: 'claude-3-opus-20240229',
    messages: formattedMessages,
    max_tokens: 1024,
    stream: true,
  });

  // Convert the response into a readable stream
  return new StreamingTextResponse(response.toReadableStream());
} 