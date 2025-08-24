
import React from "react";
import Die from "./die";
import { nanoid } from 'nanoid';
export default function App() {

     const [dice, setDice] = React.useState(generateAllNewDice());

    let gameWon = false;

    if(
        dice.every(die => die.isHeld) &&
        dice.every(die => die.value === dice[0].value)
    )
    {
        gameWon = true;

    }
    

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
        key = {dieObj.id} 
        value={dieObj.value}
        isHeld = {dieObj.isHeld}
        hold = {()=> hold(dieObj.id)}
        
     />)
   
    function rollDice() {
        setDice(oldDice => oldDice.map(
            die=> die.isHeld ? 
                die : {...die, value :  Math.floor(Math.random() * 6) + 1}
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
        <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
                Click each die to freeze it at its current value between rolls.</p>
            <div className="container">
                {diceNumber}

                {gameWon ? <button> New Game </button> : 
                            <button className="RollDice" onClick ={rollDice}> Roll Dice</button>}
            </div>


           
        </>
    )
} 