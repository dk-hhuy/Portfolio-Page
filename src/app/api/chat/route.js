import { buildChatSystemPrompt } from '../../../lib/chatPrompt';
import { checkRateLimit, getClientIp } from '../../../lib/chatRateLimit';
import { generateGeminiReply, getGeminiConfig } from '../../../lib/geminiChat';
import { buildPortfolioContext } from '../../../lib/portfolioContext';
import { validateChatRequest } from '../../../lib/chatValidation';

export async function POST(request) {
  try {
    const ip = getClientIp(request);
    const rate = await checkRateLimit(ip);

    if (!rate.allowed) {
      return Response.json(
        { error: 'Too many requests. Please try again in a few minutes.' },
        { status: 429 },
      );
    }

    const body = await request.json();
    const validation = validateChatRequest(body);

    if (!validation.ok) {
      return Response.json({ error: validation.error }, { status: 400 });
    }

    const config = getGeminiConfig();
    if (config.error) {
      return Response.json({ error: config.error }, { status: 503 });
    }

    const { apiKey, model } = config;
    const { message, history } = validation.data;
    const portfolioContext = buildPortfolioContext();
    const systemPrompt = buildChatSystemPrompt(portfolioContext);

    const result = await generateGeminiReply({
      apiKey,
      model,
      systemPrompt,
      history,
      message,
    });

    if (!result.ok) {
      console.error('[chat] Gemini error:', result.error);
      return Response.json(
        { error: 'Unable to get a response right now. Please try again or use the contact form.' },
        { status: 502 },
      );
    }

    return Response.json({ reply: result.reply });
  } catch (error) {
    console.error('[chat] Failed:', error);
    return Response.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500 },
    );
  }
}
