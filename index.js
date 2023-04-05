const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();
const express = require('express')
const app = express()

app.use(express.urlencoded({extended : false}))
app.use(express.json())


app.post('/' ,async (req , res) => {
  console.log(req.body);
  console.log(req.body.question);
  let answer =await runCompletion(req.body.question)
  res.status(200).send(answer)
})

    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    async function runCompletion (question) {
        const completion = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: question,
          // this is the maximum line of token we can give
          max_tokens: 2048
        });

        const completion_text = completion.data.choices[0].text;
        return completion_text
  }



  const PORT = 3000
  app.listen(PORT , () => {
    console.log("server is running");
  })
