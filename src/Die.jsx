
export default function Die(props) {
    const style = {
        backgroundColor : props.isHeld? "#59E391" : "white"
    }

    return (
      
        <div className="box" >
            {<button 
            style = {style}
            onClick={props.hold}
             > {props.value}</button>}
        </div>

      

       
    )
}