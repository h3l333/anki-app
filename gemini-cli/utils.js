let display = ["-", "\\", "|", "/"];
let i = 0;

export const printLoadingDots = () => {
	const dotInterval = setInterval(() => {
		process.stdout.write(`\r${display[i]}`); // With \r, ensure you move to the beginning of the line
		i = (i + 1) % display.length;
	}, 200);
	return dotInterval;
};
