
const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;
const SYMBOLS_COUNT = {
  A: 3,
  B: 4,
  C: 5,
  D: 6,
};
const SYMBOLS_VALUE = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
};

const depositAmount = () => {
  while (true) {
    const startingAmount = prompt("Please enter your starting Money: ");
    const noOFDeposotAmt = parseFloat(startingAmount);
    if (isNaN(noOFDeposotAmt) || noOFDeposotAmt <= 0) {
      console.log("Enter Valid Amount");
    } else {
      return noOFDeposotAmt;
    }
  }
};
const betLines = () => {
  while (true) {
    const startingLine = prompt("Please enter Line You want to bet on: ");
    const noOfLine = parseFloat(startingLine);
    if (isNaN(noOfLine) || noOfLine <= 0 || noOfLine > 3) {
      console.log("Enter Valid Line");
    } else {
      return noOfLine;
    }
  }
};
const betAmt = (amount, lines) => {
  while (true) {
    const startingbet = prompt("Please enter your starting Bet: ");
    const betAmount = parseFloat(startingbet);
    if (isNaN(betAmount) || betAmount <= 0 || betAmount > amount / lines) {
      console.log("Enter Valid Amount");
    } else {
      return betAmount;
    }
  }
};
const spin = () => {
  const symbols = [];
  for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
    for (let i = 0; i < count; i++) {
      symbols.push(symbol);
    }
  }
  const reels = [];
  for (let i = 0; i < COLS; i++) {
    reels.push([]);
    const reelSymbols = [...symbols];
    for (let j = 0; j < ROWS; j++) {
      const ramdomIndex = Math.floor(Math.random() * reelSymbols.length);
      const selectedSymbols = reelSymbols[ramdomIndex];
      reels[i].push(selectedSymbols);
      reelSymbols.splice(ramdomIndex, 1);
    }
  }
  return reels;
};
const transpose = (reels) => {
  const rows = [];
  for (let i = 0; i < COLS; i++) {
    rows.push([]);
    for (let j = 0; j < ROWS; j++) {
      rows[i].push(reels[j][i]);
    }
  }
  return rows;
};
const result = (rows) => {
  for (row of rows) {
    let rowString = "";
    for (const [i, symbols] of row.entries()) {
      rowString += symbols;
      if (i <= row.length - 1) {
        rowString += " | ";
      }
    }
    console.log(rowString);
  }
};
const winnings = (rows, bet, lines) => {
  let winning = 0;
  for (let i = 0; i < lines; i++) {
    const symbols = rows[i];
    let allTrue = true;
    for (symbl of symbols) {
      if (symbl != symbols[0]) {
        allTrue = false;
        break;
      }
    }
    if (allTrue) {
      winning += bet * SYMBOLS_VALUE[symbols[0]];
    }
  }
  return winning;
};
const game = () => {
  let amount = depositAmount();
  while (true) {
    console.log("You have Balance $" + amount);
    const lines = betLines();
    const bet = betAmt(amount, lines);
    amount -= bet * lines;
    const spinner = spin();
    const trans = transpose(spinner);
    const slotSort = result(trans);
    const getWinnings = winnings(trans, bet, lines);
    amount += getWinnings;
    console.log("You Won $ " + getWinnings.toString());
    if (amount <= 0) {
      console.log("You ran out of money");
      break;
    }
    const playAgain = prompt("Do you want to play again(y/n)");
    if (playAgain != "y") return;
  }
};
game();
