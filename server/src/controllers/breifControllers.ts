import { YoutubeTranscript } from 'youtube-transcript';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Request, Response } from 'express';

const getBreif = async (req: Request, res: Response) => {

  try {
    const { videoId } = req.body;
    console.log(videoId);

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY2!);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const data =  await YoutubeTranscript.fetchTranscript(videoId);
    const rawCaptions = data.map((transcript) => {
        let transcriptDataText = '';
        transcriptDataText += transcript.text + ' ';
          return transcriptDataText
      })

    const prompt = `Summarize this text ${rawCaptions}`;
    const result = await model.generateContent(prompt);
    const summary = result?.response?.candidates && result.response.candidates[0]?.content?.parts[0]?.text;
    // console.log(summary);
    res.status(200).json({ summary });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export { getBreif };