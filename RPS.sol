// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ananasRockPaperScissors {
    enum Move { ROCK, PAPER, SCISSORS }
    uint private constant NUM_MOVES = 3;
    
    struct Game {
        uint256 timestamp;
        Move playerMove;
        Move computerMove;
        string result;
    }

    mapping(address => Game[]) private games;

    function play(Move playerMove) public returns (string memory) {
        Move computerMove = Move(uint(keccak256(abi.encodePacked(block.timestamp, block.difficulty))) % NUM_MOVES);
        string memory result;

        if (playerMove == computerMove) {
            result = "DRAW";
        } else if ((uint(playerMove) + 1) % NUM_MOVES == uint(computerMove)) {
            result = "LOSE";
        } else {
            result = "WIN";
        }
        
        games[msg.sender].push(Game(block.timestamp, playerMove, computerMove, result));
        return result;
    }

    function getGameHistory() public view returns (Game[] memory) {
        return games[msg.sender];
    }
}
