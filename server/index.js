import { YoutubeTranscript } from 'youtube-transcript';
import 'dotenv/config'
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY2);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


const data =  await YoutubeTranscript.fetchTranscript('https://youtu.be/oVa8DfUDKTw?list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA')

const rawCaptions = data.map((transcript) => {
  let transcriptDataText = '';
  transcriptDataText += transcript.text + ' ';
    return transcriptDataText
})

const prompt = `Summarize this text ${rawCaptions}`;
const result = await model.generateContent(prompt);
console.log(result.response.text());
