import { useEffect, useState } from "react";

const TILE_COLORS = [
  {
    id: 1,
    color: "red"
  },
  {
    id: 2,
    color: "green"
  },
  {
    id: 3,
    color: "blue"
  },
  {
    id: 4,
    color: "yellow"
  },
  {
    id: 5,
    color: "red"
  },
  {
    id: 6,
    color: "green"
  },
  {
    id: 7,
    color: "blue"
  },
  {
    id: 8,
    color: "yellow"
  },

];

export default function Memory() {
  const [dataArray, setDataArray] = useState<any>([])
    const [tiles, setTiles] = useState<any>([])
    const [found, setFound] = useState<any>([])
    const [count, setCount] = useState<any>(0)

    function createTile() {
        setDataArray(shuffleArray(TILE_COLORS))
    }

    useEffect(() => {
        createTile()
    }, [])


  function handleColor(item:any) {

    setTiles([...tiles, item]);
    setCount((prev: number) => prev + 1)

    if(count === 1) {
      
      if(tiles[0].color === item.color) {
        setFound([...found, tiles[0], item])
        console.log('item');
      }

      setTimeout(() => {
        setTiles([]);
        setCount(0)
      }, 800)
    }
  }
  const restartGame = () => {
    setFound([]);
    setDataArray(shuffleArray(TILE_COLORS));
  }
  return (
    <>
      <h1> {found.length === TILE_COLORS.length ? "You Win" : "Memory"}</h1>
      <div className="board">
        {
          dataArray?.map((el:any, i:number)=> (
            <div 
            style={{
              background: tiles.includes(el) ? el.color : found.includes(el) ? el?.color : "white",
              pointerEvents: tiles.includes(el) ? "none" : found.includes(el) ? "none" : "auto"
            }}
            key={i}
            className={
              `tile ${tiles.includes(el) ? el.color : found.includes(el) ? el.color : ""}`
            }
            data-name={el} 
            onClick={() => handleColor(el)}></div>
          ))
        }
      </div>
      {
        found.length === TILE_COLORS.length && <button onClick={() => restartGame()}>Restart</button>
      }
    </>
  );
}

function shuffleArray(array:any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
}