import { Button, Flex, Spacer } from "@chakra-ui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useKey } from "react-use";
import internal from "stream";
import styled from "styled-components"

//キャンバススタイル
const SCanvas = styled.canvas`
    width: 70%;
    background-color: skyblue 
`;

type attackObj = {
    x: number;
    y: number;
    setedTime: number;
}

export const Game = () => {

    const TIME_INTERVAL = 50;
    const BOX_SIZE = 7;
    const PLAYER_SIZE = 7;
    const ATTACK_SIZE = 3;
    const BOX_MOVEMENT = 1;
    const PLAYER_MOVEMENT = 3;
    const ATTACK_MOVEMENT = 3;
    const ATTACK_AMOUNT = 10;

    const [timeCount, setTimeCount] = useState<number>(0);
    const [horizontalCount, setHorizontalCount] = useState<number>(0);
    const [verticalCount, setVerticalCount] = useState<number>(0);
    const [horizontalDirection, setHorizontalDirection] = useState<boolean>(true);
    const [verticalDirection, setVerticalDirection] = useState<boolean>(true);
    const [attackArray, setAttackArrary] = useState<Array<attackObj>>([]);

    //KeyDown
    const [playerPosition, setPlayerPosition] = useState<number>(0);
    const playerMoveLeft = () => setPlayerPosition((count) => count -= PLAYER_MOVEMENT);
    const playerMoveRight = () => setPlayerPosition((count) => count += PLAYER_MOVEMENT);
    const attack = () => {
        const ctx: CanvasRenderingContext2D = getContext();
        setAttackArrary((attackA) => attackA = attackA.length < ATTACK_AMOUNT ? [...attackA, { x: -10, y: ctx.canvas.height - 10, setedTime: 0 }] : [...attackA])
    }

    useKey('ArrowLeft', playerMoveLeft);
    useKey('ArrowRight', playerMoveRight);
    useKey('ArrowUp', attack);


    const canvasRef = useRef(null);
    const intervalRef = useRef<NodeJS.Timer | null>(null);


    //キャンバス取得関数
    const getContext = useCallback((): CanvasRenderingContext2D => {
        const canvas: any = canvasRef.current;

        return canvas.getContext('2d');
    }, []);


    // //カウント開始
    // const gameStart = useCallback(() => {
    //     //カウント
    //     if (intervalRef.current !== null) {
    //         return;
    //     }
    //     intervalRef.current = setInterval(() => {
    //         setHorizontalCount((prevState: number) => prevState + 1)
    //         setVerticalCount((prevState: number) => prevState + 1)
    //     }, 10)
    // }, []);
    // //カウント終了
    // const gameStop = useCallback(() => {
    //     if (intervalRef.current === null) {
    //         return;
    //     }
    //     clearInterval(intervalRef.current);
    //     intervalRef.current = null;
    // }, []);


    //カウント開始
    const gameStart = useCallback(() => {
        //カウント
        if (intervalRef.current !== null) {
            return;
        }

        intervalRef.current = setInterval(() => {
            setTimeCount((count: number) => ++count)

        }, TIME_INTERVAL)
    }, []);

    //カウント終了
    const gameStop = useCallback(() => {
        if (intervalRef.current === null) {
            return;
        }
        clearInterval(intervalRef.current);
        intervalRef.current = null;
    }, []);


    // //画面クリア処理
    // useEffect(() => {
    //     const ctx: CanvasRenderingContext2D = getContext();
    //     ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // }, [verticalCount, horizontalCount])
    // //横移動処理
    // useEffect(() => {
    //     const ctx: CanvasRenderingContext2D = getContext();
    //     horizontalDirection ? ctx.fillRect(horizontalCount, 0, BOX_SIZE, BOX_SIZE) : ctx.fillRect(ctx.canvas.width - horizontalCount, 0, BOX_SIZE, BOX_SIZE);

    //     if ((ctx.canvas.width - BOX_SIZE - horizontalCount) < 0) {
    //         horizontalDirection ? setHorizontalDirection(false) : setHorizontalDirection(true);
    //         setHorizontalCount(0);
    //     }
    // }, [horizontalCount])

    // //縦移動処理
    // useEffect(() => {
    //     const ctx: CanvasRenderingContext2D = getContext();
    //     verticalDirection ? ctx.fillRect(0, verticalCount, BOX_SIZE, BOX_SIZE) : ctx.fillRect(0, ctx.canvas.height - verticalCount, BOX_SIZE, BOX_SIZE);

    //     if ((ctx.canvas.height - BOX_SIZE - verticalCount) < 0) {
    //         verticalDirection ? setVerticalDirection(false) : setVerticalDirection(true);
    //         setVerticalCount(0);
    //     }
    // }, [verticalCount])


    //PLYAER
    useEffect(() => {
        const ctx: CanvasRenderingContext2D = getContext();
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillRect(playerPosition, ctx.canvas.height - 10, PLAYER_SIZE, PLAYER_SIZE);

        if ((ctx.canvas.height - BOX_SIZE - playerPosition) < 0) {

        }
    }, [timeCount])

    //ATTACK!!
    useEffect(() => {
        const ctx: CanvasRenderingContext2D = getContext();
        for (let i = attackArray.length - 1; i >= 0; i--) {


            if (attackArray[i].x < 0) {
                attackArray[i].x = playerPosition;
                attackArray[i].setedTime = timeCount;
            };

            const up = (timeCount - attackArray[i].setedTime) * ATTACK_MOVEMENT;
            ctx.fillRect(attackArray[i].x, attackArray[i].y - up - PLAYER_SIZE, ATTACK_SIZE, ATTACK_SIZE);

            if (attackArray[0].y - up < 0) {
                setAttackArrary((array) => array = array.slice(1))
            }
        }

    }, [timeCount])






    return (
        <div>
            <SCanvas className="canvas" ref={canvasRef} />
            <Flex>
                <Button m={2} onClick={gameStart}>START</Button>
                <Button m={2} onClick={gameStop}>STOP</Button>
            </Flex>
            {/* <div>
                {attackArray.map((attack) => { return <p>{attack.x}</p> })}
            </div> */}

            {/* <span>{playerPosition}</span> */}
            <p>{timeCount}</p>
            <p>{playerPosition}</p>
            <p>{attackArray.length}</p>
        </div>
    )
}

