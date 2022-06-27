import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components"

//キャンバススタイル
const SCanvas = styled.canvas`
    width: 70%;
    background-color: skyblue 
`;

export const Game = () => {
    const BOX_SIZE = 7;
    const [horizontalCount, setHorizontalCount] = useState<number>(0);
    const [verticalCount, setVerticalCount] = useState<number>(0);
    const [horizontalDirection, setHorizontalDirection] = useState<boolean>(true);
    const [verticalDirection, setVerticalDirection] = useState<boolean>(true);


    const canvasRef = useRef(null);

    const getContext = useCallback((): CanvasRenderingContext2D => {
        const canvas: any = canvasRef.current;

        return canvas.getContext('2d');
    }, []);


    //カウント処理
    useEffect(() => {
        //カウント
        const countInterval = setInterval(() => {
            setHorizontalCount((prevState: number) => prevState + 1)
            setVerticalCount((prevState: number) => prevState + 1)

        }, 10)

        return () => {
            clearInterval(countInterval);
        };
    }, []);

    //画面クリア処理
    useEffect(() => {
        const ctx: CanvasRenderingContext2D = getContext();
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    }, [verticalCount, horizontalCount])
    //横移動処理
    useEffect(() => {
        const ctx: CanvasRenderingContext2D = getContext();
        horizontalDirection ? ctx.fillRect(horizontalCount, 0, BOX_SIZE, BOX_SIZE) : ctx.fillRect(ctx.canvas.width - horizontalCount, 0, BOX_SIZE, BOX_SIZE);

        if ((ctx.canvas.width - BOX_SIZE - horizontalCount) < 0) {
            horizontalDirection ? setHorizontalDirection(false) : setHorizontalDirection(true);
            setHorizontalCount(0);
        }
    }, [horizontalCount])

    //縦移動処理
    useEffect(() => {
        const ctx: CanvasRenderingContext2D = getContext();
        verticalDirection ? ctx.fillRect(0, verticalCount, BOX_SIZE, BOX_SIZE) : ctx.fillRect(0, ctx.canvas.height - verticalCount, BOX_SIZE, BOX_SIZE);

        if ((ctx.canvas.height - BOX_SIZE - verticalCount) < 0) {
            verticalDirection ? setVerticalDirection(false) : setVerticalDirection(true);
            setVerticalCount(0);
        }
    }, [verticalCount])



    return (
        <div>
            <SCanvas className="canvas" ref={canvasRef} />
        </div>
    )
}