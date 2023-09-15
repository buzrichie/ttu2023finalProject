const openai = require("../config/openaiConfig");

const generateQuestion = async (req, res) => {
  const { questionContext } = req.body;

  const questions = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `Generate question from this content ${questionContext}`,
      },
    ],
    max_tokens: 100,
  });

  const answers = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `come up with the answers ${questionContext}`,
      },
    ],
    max_tokens: 100,
  });
  console.log({
    Qusetions: questions.data.choices[0].message,
    answers: answers.data.choices[0].message,
  });
  res.status(200).json({
    Qusetions: questions.data.choices[0].message,
    answers: answers.data.choices[0].message,
  });
};

module.exports = { generateQuestion };
