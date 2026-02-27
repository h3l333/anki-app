#!/usr/bin/env node
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import {
	generateWordCard,
	generateGrammarCard,
	generateSentenceCard,
} from "../gemini-cli/gemini.js";
import { addCardToAnki } from "../gemini-cli/axios.js";
import { printLoadingDots } from "./utils.js";

const rl = readline.createInterface({ input, output });

const ankiDeck = "日本語::日本語カード";

const menu = async () => {
	let option = await rl.question("What do you want to do?\n");
	await menuOptions(option);
};

const menuOptions = async (option) => {
	switch (option) {
		case "1": {
			let word = await rl.question("Please type the word: \n");
			const dotInterval = printLoadingDots();
			let answer = await generateWordCard(word);
			clearInterval(dotInterval);
			console.log("");
			console.log(answer);
			let regenerate = await rl.question(
				"Do you want to regenerate the card?\n",
			);
			while (regenerate == 1) {
				let answer = await generateWordCard(word);
				console.log(answer);
				regenerate = await rl.question("Do you want to regenerate the card?\n");
			}
			await addCardToAnki(word, `<pre>${answer}</pre>`, ankiDeck, "語彙");
			menu();
			break;
		}
		case "2": {
			let grammar = await rl.question("Please type in the grammar point: \n");
			let answerGrammar = await generateGrammarCard(grammar);
			console.log(answerGrammar);
			let regenerate = await rl.question(
				"Do you want to regenerate the card?\n",
			);
			while (regenerate == 1) {
				let answerGrammar = await generateGrammarCard(grammar);
				console.log(answerGrammar);
				regenerate = await rl.question("Do you want to regenerate the card?\n");
			}
			await addCardToAnki(
				grammar,
				`<pre>${answerGrammar}</pre>`,
				ankiDeck,
				"文法",
			);
			menu();
			break;
		}
		case "3": {
			let sentence = await rl.question("Please type in the sentence: \n");
			let answerSentence = await generateSentenceCard(sentence);
			console.log(answerSentence);
			let regenerate = await rl.question(
				"Do you want to regenerate the card?\n",
			);
			while (regenerate == 1) {
				let answerSentence = await generateSentenceCard(sentence);
				console.log(answerSentence);
				regenerate = await rl.question("Do you want to regenerate the card?\n");
			}
			await addCardToAnki(
				sentence,
				`<pre>${answerSentence}</pre>`,
				ankiDeck,
				"文章",
			);
			menu();
			break;
		}
	}
};

menu();
