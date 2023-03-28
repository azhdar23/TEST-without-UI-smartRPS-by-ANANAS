const provider = new ethers.providers.Web3Provider(window.ethereum, 97);

const contractAddress = "0xF5a3B57A4ec24FF943ddC39a67F1df3A86790F9C";

const abi = [
	{
		"inputs": [
			{
				"internalType": "enum RockPaperScissors.Move",
				"name": "playerMove",
				"type": "uint8"
			}
		],
		"name": "play",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

document.addEventListener("DOMContentLoaded", async () => {
    const { ethereum } = window;

    if (!ethereum) {
        alert("MetaMask is not installed!");
        return;
    }
const contract = new ethers.Contract(contractAddress, abi, signer);

const rockBtn = document.getElementById("rock");
const paperBtn = document.getElementById("paper");
const scissorsBtn = document.getElementById("scissors");
const resultElem = document.getElementById("result");
const historyElem = document.getElementById("history");

rockBtn.addEventListener("click", () => playGame(0));
paperBtn.addEventListener("click", () => playGame(1));
scissorsBtn.addEventListener("click", () => playGame(2));

async function playGame(move) {
	const result = await contract.play(move);
	resultElem.innerText = `Result: ${result}`;
	const li = document.createElement("li");
	li.innerText = `You: ${moveToString(move)}, Computer: ${moveToString(uint(computerMove))} - ${result}`;
	historyElem.appendChild(li);
}

function moveToString(move) {
	switch (move) {
		case 0:
			return "Rock";
		case 1:
			return "Paper";
		case 2:
			return "Scissors";
		default:
			return "Unknown";
	}
}
});
async function init() {
	await window.ethereum.enable();
	signer = provider.getSigner();
	contractInstance = new ethers.Contract(contractAddress, contractABI, signer);
}


init();