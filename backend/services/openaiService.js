const getChatResponse = async (messages, plan) => {

  // Konsa model use ho raha hai
  const model = plan === 'paid' ? 'GPT-4 (Paid)' : 'GPT-3.5 (Free)';

  // User ka last message uthao
  const lastMessage = messages[messages.length - 1].content;

  // Fake AI response
  const fakeReply = `[${model}] You said: "${lastMessage}". This is a demo AI response. Real OpenAI integration is ready — just add API key to go live!`;

  return {
    content: fakeReply,
    tokensUsed: Math.floor(Math.random() * 100) + 50
  };
};

module.exports = { getChatResponse };