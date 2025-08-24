
import React from "react";
import Die from "./die";
import { nanoid } from 'nanoid';
export default function App() {


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


    const [dice, setDice] = React.useState(generateAllNewDice());

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
            <div className="container">
                {diceNumber}

                <button className="RollDice" onClick ={rollDice}> Roll Dice</button>
            </div>


           
        </>
    )
} 