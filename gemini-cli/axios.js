import axios from "axios";

export const addCardToAnki = async (front, back, deck, tag) => {
	try {
		const response = await axios.post("http://127.0.0.1:8765", {
			action: "addNote",
			version: 6,
			params: {
				note: {
					deckName: `${deck}`,
					modelName: "Basic",
					fields: {
						Front: `${front}`,
						Back: `${back}`,
					},
					tags: [`${tag}`],
				},
			},
		});
		console.log("Response from AnkiConnect: ", response.data);
	} catch (e) {
		console.log(`Failed to connect\n${e}`);
	}
};

//addCardToAnki("test", "test", "test", "test");
