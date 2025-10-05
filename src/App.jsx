
import React from "react";
import Die from "./die";
import { nanoid } from 'nanoid';
import Confetti from "react-confetti";
import './App.css';

export default function App() {
    // const [dice, setDice] = React.useState(generateAllNewDice());  do not use this to initialize

    const [dice, setDice] = React.useState(() => generateAllNewDice());
    const gameWon = (
        dice.every(die => die.isHeld) &&
        dice.every(die => die.value === dice[0].value)
    )

    const[count, setCount] = React.useState(0);

    function generateAllNewDice() {
        const arr = [];
        for (let i = 0; i < 10; i++) {
            const rand = Math.floor(Math.random() * 6) + 1;
            arr.push({
                id: nanoid(),
                value: rand,
                isHeld: false
            })
        }
        return arr;
    }



    const diceNumber = dice.map(dieObj => <Die
        key={dieObj.id}
        value={dieObj.value}
        isHeld={dieObj.isHeld}
        hold={() => hold(dieObj.id)}

    />)

    function rollDice() {
        if (!gameWon) {
            setDice(oldDice => oldDice.map(
                die => die.isHeld ?
                    die : { ...die, value: Math.floor(Math.random() * 6) + 1 }
            ))

            setCount(prevCount => prevCount + 1);
        }
        else {
            setDice(generateAllNewDice());
            setCount(0);
        }

        // setDice(generateAllNewDice());
    }

    function hold(id) {
        setDice(oldDice =>
            oldDice.map(die =>
                die.id === id ? { ...die, isHeld: !die.isHeld } : die
            )
        );
    }

    return (
        <main>
            {gameWon && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
            <h1 className="count">Count: {count}</h1>
            <div className="dice-container">
                {diceNumber}
            </div>
            <button 
                className="roll-dice"
                onClick={rollDice}
            >
                {gameWon ? "New Game" : "Roll"}
            </button>
        </main>
    )
} 