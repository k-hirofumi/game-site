import { Button, Flex, Spacer } from "@chakra-ui/react";
import { memo, useCallback, useEffect, useRef, useState } from "react";
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
}

type playerObj = {
    life: number;
    x: number;
    y: number;
}
type invaderObj = {
    died: boolean;
    x: number;
    y: number;
}

function getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

export const Game = memo(() => {

    const TIME_INTERVAL = 50;
    const BOX_SIZE = 7;
    const PLAYER_SIZE = 7;
    const ATTACK_SIZE = 3;
    const BOX_MOVEMENT = 1;
    const PLAYER_MOVEMENT = 3;
    const PLAYER_INITIAL_POSITON_X = 10;
    const PLAYER_INITIAL_POSITON_Y = 10; //画面下からの距離
    const PLAYER_LIFE_POINT = 3;
    const ATTACK_MOVEMENT = 3;
    const ATTACK_AMOUNT = 3;
    const INVADER_SIZE = 5;
    const INVADER_MOVEMENT_HORIZONTAL = 5; //敵の横移動距離
    const INVADER_MOVEMENT_VERTICAL = 3; //敵の縦移動距離
    const INVADER_SPEED = 10; //敵の移動速度(0に近づくほど速い)
    const INVADERS_DISTANCE_HORIZONTAL = 8; //敵の横間隔
    const INVADERS_DISTANCE_VERTICAL = 2; //敵の縦間隔
    const INVADERS_START_MARGIN_LEFT = 20; //スタート時の左側マージン
    const INVADERS_MARGIN = 20; //最大移動位置
    const INVADERS_AMOUNT = 30; //敵の数
    const INVADERS_ATTACK_MOVEMENT = 3;
    const INVADERS_ATTACK_AMOUNT = 10;
    const INVADERS_ATTACK_SIZE = 7;
    const INVADER_ATTACK_MOVEMENT = 5; //敵攻撃の移動
    const INVADER_ATTACK_FREQUENCY = 10; //敵攻撃の頻度(0に近づくほど多い)

    const INVADERS_DEFAULT_POSITION: Array<invaderObj> = [
        ...Array(INVADERS_AMOUNT)
    ].map((value, index) => {
        const row = Math.floor(index / 10)
        const col = (index - row * 10) * (INVADER_SIZE + INVADERS_DISTANCE_HORIZONTAL)
        return {
            died: false,
            x: col + INVADERS_START_MARGIN_LEFT,
            y: row * (INVADER_SIZE + INVADERS_DISTANCE_VERTICAL)
        }
    });



    const [timeCount, setTimeCount] = useState<number>(0);
    const [attackArray, setAttackArrary] = useState<Array<attackObj>>([]);
    const [invaders, setInvaders] = useState<Array<invaderObj>>(INVADERS_DEFAULT_POSITION)
    const [invaderAttackArray, setInvaderAttackArrary] = useState<Array<attackObj>>([]);
    const [playerPosition, setPlayerPosition] = useState<playerObj>({ life: 0, x: 0, y: 0 });
    const [playerLifePoints, setPlayerLifePoints] = useState<number>(PLAYER_LIFE_POINT);

    const timeCountRef = useRef<number>(0);
    const playerPositionRef = useRef<playerObj>({ life: 0, x: 0, y: 0 });
    const playerLifePointsRef = useRef<number>(0);
    const attackArrayRef = useRef<Array<attackObj>>([]);
    const invaderAttackArrayRef = useRef<Array<attackObj>>([]);
    const invadersHorizontalDirection = useRef<boolean>(true);


    //KeyDown
    timeCountRef.current = timeCount;
    playerPositionRef.current = playerPosition;
    playerLifePointsRef.current = playerLifePoints;
    attackArrayRef.current = attackArray;
    invaderAttackArrayRef.current = invaderAttackArray;


    const playerMoveLeft = () => {
        // if()
        setPlayerPosition((position) => {
            position.x -= PLAYER_MOVEMENT
            return position;
        });
    }

    const playerMoveRight = () => {
        setPlayerPosition((position) => {
            position.x += PLAYER_MOVEMENT
            return position;
        })
    };

    const attack = () => {
        const ctx: CanvasRenderingContext2D = getContext();
        setAttackArrary((attackA) => attackA = attackA.length < ATTACK_AMOUNT ? [...attackA, { x: playerPositionRef.current.x, y: ctx.canvas.height - 10 }] : [...attackA])
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



    //カウント開始
    const gameStart = useCallback(() => {
        const ctx: CanvasRenderingContext2D = getContext();
        setPlayerPosition((position) => {
            position.y = ctx.canvas.height - PLAYER_INITIAL_POSITON_Y;
            return position;
        });

        //スタートの重複を防止
        if (intervalRef.current !== null) {
            return;
        }

        intervalRef.current = setInterval(() => {
            setTimeCount((count: number) => ++count)
            console.log(timeCount)

            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

            //PLYAER
            playerLifePointsRef.current > 1 ? ctx.fillStyle = "black" : ctx.fillStyle = "red";
            ctx.fillRect(playerPositionRef.current.x, playerPositionRef.current.y, PLAYER_SIZE, PLAYER_SIZE);
            ctx.fillStyle = "black";

            //ATTACK!!
            for (let i = attackArrayRef.current.length - 1; i >= 0; i--) {
                attackArrayRef.current[i].y -= ATTACK_MOVEMENT;
                ctx.fillRect(attackArrayRef.current[i].x, attackArrayRef.current[i].y - PLAYER_SIZE, ATTACK_SIZE, ATTACK_SIZE);

                if (attackArrayRef.current[0].y < 0) {
                    setAttackArrary((array) => array = array.slice(1))
                };
            }

            //INVADER
            if (timeCountRef.current % INVADER_SPEED == 0) {
                invaders.map((invader) => {

                    invadersHorizontalDirection.current ? invader.x += INVADER_MOVEMENT_HORIZONTAL : invader.x -= INVADER_MOVEMENT_HORIZONTAL
                });
                //移動
                if (invaders[9].x > ctx.canvas.width - INVADERS_MARGIN - INVADER_SIZE
                    || invaders[0].x < 0 + INVADERS_MARGIN) {
                    invaders.map((invader) => {
                        invader.y += INVADER_MOVEMENT_VERTICAL;
                    })
                }
                //移動方向
                if (invaders[9].x > ctx.canvas.width - INVADERS_MARGIN - INVADER_SIZE
                    || invaders[0].x < 0 + INVADERS_MARGIN) {
                    invadersHorizontalDirection.current = !invadersHorizontalDirection.current;
                }

            }

            //INVADER_ATTACK
            if (timeCountRef.current % INVADER_ATTACK_FREQUENCY == 0) {
                // invaderAttackArrayRef.current = [...invaderAttackArrayRef.current, { x: getRandomArbitrary(0, ctx.canvas.width - INVADERS_ATTACK_SIZE), y: 10 }];
                invaderAttackArrayRef.current.push({ x: getRandomArbitrary(0, ctx.canvas.width - INVADERS_ATTACK_SIZE), y: 10 });
            }
            for (let i = invaderAttackArrayRef.current.length - 1; i >= 0; i--) {
                invaderAttackArrayRef.current[i].y += INVADER_ATTACK_MOVEMENT;

                if (((invaderAttackArrayRef.current[i].x >= playerPositionRef.current.x && invaderAttackArrayRef.current[i].x <= playerPositionRef.current.x + PLAYER_SIZE)
                    || (invaderAttackArrayRef.current[i].x + INVADERS_ATTACK_SIZE >= playerPositionRef.current.x && invaderAttackArrayRef.current[i].x + INVADERS_ATTACK_SIZE <= playerPositionRef.current.x + PLAYER_SIZE))
                    && (invaderAttackArrayRef.current[i].y <= playerPositionRef.current.y && invaderAttackArrayRef.current[i].y + INVADERS_ATTACK_SIZE >= playerPositionRef.current.y)) {
                    invaderAttackArrayRef.current.splice(i, 1);
                    setPlayerLifePoints((life) => --life)
                }

                ctx.fillRect(invaderAttackArrayRef.current[i].x, invaderAttackArrayRef.current[i].y, INVADERS_ATTACK_SIZE, INVADERS_ATTACK_SIZE);
            }

            //ゲームオーバー判定
            if (playerLifePointsRef.current == 0) {
                gameStop();
            }


            invaders.map((invader) => {
                //当たり判定
                //プレイヤーの攻撃
                if (invader.died) {
                    return;
                }
                for (let i = attackArrayRef.current.length - 1; i >= 0; i--) {
                    if ((invader.x <= attackArrayRef.current[i].x && invader.x + INVADER_SIZE >= attackArrayRef.current[i].x) && (invader.y <= attackArrayRef.current[i].y && invader.y + INVADER_SIZE >= attackArrayRef.current[i].y)) {
                        invader.died = true;
                        attackArrayRef.current.splice(i, 1)
                    }
                }

                if (!invader.died) {
                    ctx.fillRect(invader.x, invader.y, INVADER_SIZE, INVADER_SIZE);
                }
            })


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

    // useEffect(() => {
    //     if(playerLifePointsRef.current == 0){
    //         clearInterval(intervalRef.current);
    //         intervalRef.current = null;
    //     }
    // },[])



    return (
        <div>
            <SCanvas className="canvas" ref={canvasRef} />
            <Flex>
                <Button m={2} onClick={gameStart}>START</Button>
                <Button m={2} onClick={gameStop}>STOP</Button>
            </Flex>
            <p>{timeCount}</p>
            <p>{playerLifePoints}</p>
            <p>{attackArrayRef.current.length > 0 ? attackArrayRef.current[0].y : ""}</p>

            <p>{playerPositionRef.current.x}</p>
            <p>{attackArrayRef.current.length}</p>
        </div>
    )
})

