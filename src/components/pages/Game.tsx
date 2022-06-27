import { useEffect, useRef, useState } from "react";

export const Game = () => {
    const [count, setCount] = useState<number>(0);

    const canvasRef = useRef(null);

    const getContext = (): CanvasRenderingContext2D => {
        const canvas: any = canvasRef.current;

        return canvas.getContext('2d');
    };


    //カウント処理
    useEffect(() => {
        //カウント
        const countInterval = setInterval(() => {
            setCount((prevState: number) => prevState + 1)
        }, 10)

        return () => {
            clearInterval(countInterval);
        };
    });

    //移動処理
    useEffect(() => {
        const ctx: CanvasRenderingContext2D = getContext();
        ctx.clearRect(count - 1, 0, 200, 200);
        ctx.fillRect(count, 0, 100, 100);
        ctx.save();
    }, [count])


    return (
        <div>
            <p>aaaa</p>
            <canvas className="canvas" ref={canvasRef} />
        </div>
    )
}