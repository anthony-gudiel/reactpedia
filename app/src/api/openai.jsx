import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: 'my-key' , dangerouslyAllowBrowser: true});

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
      { role: "system", content: "You will provide related questions based on the user input" },
      { role: "user", content:  userMessage }
    ],    model: "gpt-3.5-turbo",
  });

  return completion.choices.map(choice => choice.message.content);
}