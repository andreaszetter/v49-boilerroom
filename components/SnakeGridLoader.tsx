'use client';
import SnakeGrid from "./SnakeGrid";
import { useState } from "react";

export default function SnakeGridLoader(){
    const [seed, setSeed] = useState(1);
    const reset = () => {
    setSeed(Math.random());
}
    return(
        
        
        <div className="bg-black flex">
            <div className="bg-white">
                <button onClick={reset} className="block">RESET</button>
            </div>
            <SnakeGrid key={seed}/>
            
        </div>
    
)
}