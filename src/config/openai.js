//clave marianaNuevo de openai: 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

import { Configuration, OpenAIApi } from "openai";
import { opEnai } from './index.js'
//const InformationSchema = require('../models/informationHistory.js'); hay q llamar a esquemas???

//CONECTION OPN
const configuration = new Configuration({
    apiKey: opEnai
});
const openai = new OpenAIApi(configuration);

const callChatGpt = async(req = request, res = response)=>{

    try {

        const {prompt} = req.body;

        let queryObj = {
            model: "gpt-3.5-turbo",
            messages: [{"role":"user", "content": prompt}],
            max_tokens: 100,
            temperature:1
        }

        const completion = await openai.createChatCompletion(queryObj);
        const message = completion.data.choices[0].message;
        const usage = completion.data.usage;

        res.json({message,usage});

        
    } catch (error) {
        console.log(JSON.stringify(error));
    }

}

const callImageGpt = async(req = request, res = response)=>{
    try {
        const {prompt, nImage, size} = req.body;
        
        let queryObj = {
            "prompt": prompt,
            "n": nImage,
            "size": size
          }

        const response = await openai.createImage(queryObj);
        const dataImg = response.data;
        res.json(dataImg);

    } catch (error) {
        console.log("error "+JSON.stringify(error));
    }
}
callChatGpt()
callImageGpt()
