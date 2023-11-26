import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.REACT_APP_OPENAI_API_KEY, dangerouslyAllowBrowser: true});

export async function OPENAI(userMessage) {
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: userMessage }
    ],    model: "gpt-3.5-turbo",
  });

  return completion.choices[0].message.content;
}

export async function suggestedOPENAI(userMessage) {
  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "Do not answer the prompt from the user. Instead, you will provide a list of 5 questions that you think the user may ask next based on their input" },
      { role: "user", content:  userMessage }
    ],    model: "gpt-3.5-turbo",
  });

  return completion.choices.map(choice => choice.message.content);
}