'use client';
import React, { useEffect,useState } from 'react';

const gridSize = 20;


type Point = {
    x: number;
    y: number;
}
type Direction = "UP"|"DOWN"|"LEFT"|"RIGHT";

export default function SnakeGrid() {
    const [snake, setSnake] = useState<Point[]>([
        {y:0,x:2},
        {y:0,x:1},
        {y:0,x:0},
    ]);


    const [food, setFood] = useState<Point>({x:0,y:0});
    const [direction, setDirection] = useState<Direction>("RIGHT");
    const [gameOver, setGameOver] = useState<boolean>(false);

    const generateFood = () =>{
        const x = Math.floor(Math.random() * gridSize);
        const y = Math.floor(Math.random() * gridSize);
        setFood({x,y});
    };

    const moveSnake = ():void =>{
        const newSnake = [...snake];
        const snakeHead= {...newSnake[0]};

        switch (direction) {
            case "UP":
              snakeHead.y -= 1;
              break;
            case "DOWN":
              snakeHead.y += 1;
              break;
            case "LEFT":
              snakeHead.x -= 1;
              break;
            case "RIGHT":
              snakeHead.x += 1;
              break;
            default:
              break;
          }

        if(snakeHead.x < 0 || snakeHead.x >= gridSize|| snakeHead.y >= gridSize || snakeHead.y <0 || newSnake.some((snakePart) => snakePart.x === snakeHead.x && snakePart.y === snakeHead.y)){
            setGameOver(true);
            return;
        }
        newSnake.unshift(snakeHead);

        if(snakeHead.x === food.x && snakeHead.y === food.y){
            generateFood();
        }else{
            newSnake.pop();
        }

        setSnake(newSnake);
    };
    useEffect(() =>{
        if(!gameOver){
            const interval = setInterval(moveSnake,65);
            return ()=> clearInterval(interval);
        }
    },);
    useEffect(() =>{
        generateFood();
    }, []);

    const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) =>{
        if(event.key === "ArrowUp" && direction !== "DOWN"){
            setDirection("UP");
        }
        if(event.key === "ArrowDown" && direction !== "UP"){
            setDirection("DOWN");
        }
        if(event.key === "ArrowLeft" && direction !== "RIGHT"){
            setDirection("LEFT");
        }
        if(event.key === "ArrowRight" && direction !== "LEFT"){
            setDirection("RIGHT");
        }
    }
    

  return (
    <div 
    className='flex justify-center items-center'
    onKeyDown={handleKeyPress}
    tabIndex={0}
    autoFocus
    >

    <div className='grid grid-cols-20 grid-rows-20 border'>
        {gameOver && (
            <div className="absolute inset-0 flex flex-col justify-center items-center text-4xl font-bold">
                GAME OVER!
            </div>
        )}
        {Array.from({length:gridSize}).map((_,y)=>(
            <div key={y} className='flex'>
            {Array.from({length:gridSize}).map((_,x)=>(
                <div 
                key={x}
                className={`w-7 h-7 border border-gray-300
                ${
                    snake.some((snakepart) => snakepart.x === x && snakepart.y === y)
                     && "bg-gray-900"
                    }
                    ${food.x === x && food.y === y && "bg-black"}
                     `}
                     >
                
                </div>
            ))}
            </div>
            ))}
        </div>
    </div>
  );
}
