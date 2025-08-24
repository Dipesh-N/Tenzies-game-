
import React from "react";
import Die from "./die";
import { nanoid } from 'nanoid';
import Confetti from "react-confetti";

export default function App() {
    // const [dice, setDice] = React.useState(generateAllNewDice());  do not use this to initialize

    const [dice, setDice] = React.useState(() => generateAllNewDice());
    const gameWon = (
        dice.every(die => die.isHeld) &&
        dice.every(die => die.value === dice[0].value)
    )



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
        }
        else {
            setDice(generateAllNewDice());
        }
        setDice(oldDice => oldDice.map(
            die => die.isHeld ?
                die : { ...die, value: Math.floor(Math.random() * 6) + 1 }
        ))

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
        <>
            {gameWon && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same.
                Click each die to freeze it at its current value between rolls.</p>
            <div className="container">
                {diceNumber}

                <button className="RollDice" onClick={rollDice}>{gameWon ? "Game Won" : "Roll Dice"}</button>
            </div>



        </>
    )
} 