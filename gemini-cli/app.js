#!/usr/bin/env node
import readline from "node:readline";
import { stdin as input, stdout as output } from "node:process";
import { generateWordCard, generateGrammarCard } from "../gemini_cli/gemini.js";

const rl = readline.createInterface({ input, output });

const menuOptions = async (input) => {
	switch (input) {
		case 1: {
			rl.question("Please insert the word: \n", async (answer) => {
				const response = await generateWordCard(answer);
				console.log(response);
				menu();
			});
			break;
		}
		case 2: {
			rl.question("Please insert the grammar point: \n", async (answer) => {
				const response = await generateGrammarCard(answer);
				console.log(response);
				menu();
			});
			break;
		}
		default:
			menu();
	}
};

const menu = () => {
	rl.setPrompt(
		"What action do you want to perform?\n\t1)Generate a word card\n\t2)Generate a grammar card\n",
	);
	rl.prompt();
	rl.once("line", (input) => {
		menuOptions(parseInt(input, 10));
	});
};

menu();
