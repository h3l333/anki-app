import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env") });

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export const generateWordCard = async (word) => {
	const response = await ai.models.generateContent({
		model: "gemini-2.5-flash",
		contents: `Reply with nothing but the following template completed for the Japanese word 「${word}」, for the purposes of making an Anki card. Do NOT use formatting other than line breaks:
        \n読み方: [reading in kana]
        \n品詞: [part of speech]
        \n定義: [国語辞典的定義]
        \n優しい日本語の意味: [explanation in very simple Japanese]
        \n類義語: [synonyms]
        \n反義語: [antonyms]
        \n例文: [list 3 examples cited from online sources such as jisho.org or immersionkit.com; specify the source in parentheses]
        \n使用場面: [context(s) where the word is used]
        \n漢字の意味: [very brief description, ONLY IF APPLICABLE. If none apply, just put "漢字なし"]
        \n日本語の能力試験のレベル: [what JLPT level the word is typically associated with]
        \n説明用の画像: [URL to a Google Images query for the given word]
        `,
	});
	return response.candidates[0].content.parts[0].text;
};

export const generateGrammarCard = async (grammar) => {
	const response = await ai.models.generateContent({
		model: "gemini-2.5-flash",
		contents: `Reply with nothing but the following template completed for the Japanese grammar point 「${grammar}」, for the purposes of making an Anki card. Do NOT use formatting other than line breaks:
        \n読み方: [reading in kana]
        \n使い方/接続: [usage]
        \n表情: [brief snippet in Japanese]
        \n似てる文法点: [similar grammar points]
        \n似ている文法点の違い: [one brief sentence for each similar grammar point]
        \n例文: [list 3 examples cited from online sources such as Bunpro]
        \n使用場面: [context(s) where the word is used]
        \n日本語の能力試験のレベル: [what JLPT grammar point the word is typically associated with]
        `,
	});
	return response.candidates[0].content.parts[0].text;
};

export const generateSentenceCard = async (sentence) => {
	const response = await ai.models.generateContent({
		model: "gemini-2.5-flash",
		contents: `Reply with nothing but the following template completed for the Japanese word 「${sentence}」, for the purposes of making an Anki card. Do NOT use formatting other than line breaks:
        \n読み方: [reading in kana]
        \n優しい日本語で: [explanation in very simple Japanese]
        \n言い換え: [3 different ways to convey what the sentence expresses, in Japanese]
        \n文法点: [grammar points the sentence encompasses, listed by items]
        \n動詞: [verb(s) used, if applicable]
        \n名詞: [noun(s) used, if applicable]
        \n形容詞: [adjective(s) used, if applicable]
        \n漢字の意味: [very brief description, ONLY IF APPLICABLE. If none apply, just put "漢字なし"]
        \nニュアンス: [what the sentence wants to express; whether it is ordering something, sad, happy, etc (in Japanese)]
        `,
	});
	return response.candidates[0].content.parts[0].text;
};
