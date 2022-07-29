import { Box, Button, Flex, Spacer } from "@chakra-ui/react";
import { FC, memo, useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useKey } from "react-use";
import styled from "styled-components"
import invImg from "../../images/invader.png";
import invImgBulue from "../../images/invaderBlue.png";
import invImgYelow from "../../images/invaderYellow.png";
import invBombImg from "../../images/invaderBomb.png";
import invBombImg2 from "../../images/invaderBomb2.png";
import { InvaderButtons } from "../atoms/InvaderButtons";
import { PlayerObj, PlayerAttackObj, InvaderObj, InvaderAttackObj } from "../../types/InvaderType";

//キャンバススタイル
const SCanvas = styled.canvas`
    width: 70%;
    background-color: black 
`;

type Props = {
    invaderSpeed: number;
    invaderAmount: number;
    invaderAttackMovement: number;
    invaderAttackFrequency: number;
    invaderAttackSize: number;
}


export const InvaderGame: FC<Props> = memo((props) => {
    const {
        invaderSpeed = 10
        , invaderAmount = 30
        , invaderAttackMovement = 5
        , invaderAttackFrequency = 10
        , invaderAttackSize = 14
    } = props;

    const TIME_INTERVAL = 50;
    const PLAYER_SIZE = 6;
    const ATTACK_SIZE = 3;
    const ATTACK_MOVEMENT = 3;
    const ATTACK_AMOUNT = 3;
    const PLAYER_MOVEMENT = 3;
    const PLAYER_INITIAL_POSITON_Y = 10; //画面下からの距離
    const PLAYER_LIFE_POINT = 3;
    const INVADER_SIZE = 7;
    const INVADER_MOVEMENT_HORIZONTAL = 5; //敵の横移動距離
    const INVADER_MOVEMENT_VERTICAL = 8; //敵の縦移動距離
    const INVADER_SPEED = invaderSpeed; //敵の移動速度(0に近づくほど速い)
    const INVADERS_DISTANCE_HORIZONTAL = 8; //敵の横間隔
    const INVADERS_DISTANCE_VERTICAL = 2; //敵の縦間隔
    const INVADERS_START_MARGIN_LEFT = 20; //スタート時の左側マージン
    const INVADERS_START_MARGIN_TOP = 10; //スタート時の縦位置
    const INVADERS_ONE_ROW = 10; //1行の敵の数
    const INVADERS_AMOUNT = invaderAmount; //敵の数 ６行に収まるよう設定する
    const INVADERS_MARGIN = 20; //最大移動位置    
    const INVADERS_COLORS = [invImgYelow, invImgBulue, invImg, invImgYelow, invImgBulue, invImg]; //敵の色のバリエーション
    const INVADERS_ATTACK = [invBombImg, invBombImg2]; //敵の色のバリエーション
    const INVADERS_ATTACK_SIZE = invaderAttackSize;
    const INVADER_ATTACK_MOVEMENT = invaderAttackMovement; //敵攻撃の移動
    const INVADER_ATTACK_FREQUENCY = invaderAttackFrequency; //敵攻撃の頻度(0に近づくほど多い)
    const DIFENSE_LINE = 15; //防衛ライン


    //invaderの画像を取得
    const INVADER_IMAGES: any =
        INVADERS_COLORS.map((value, index) => {
            const img = new Image();
            img.src = value;
            return img
        });

    //invader攻撃の画像を取得
    const INVADER_ATTACK_IMAGES: any =
        INVADERS_ATTACK.map((value, index) => {
            const img = new Image();
            img.src = value;
            return img
        });

    //invaderの初期値
    const INVADERS_DEFAULT_STATUS: Array<InvaderObj> = [
        ...Array(INVADERS_AMOUNT)
    ].map((value, index) => {
        const row = Math.floor(index / INVADERS_ONE_ROW)
        const col = (index - row * INVADERS_ONE_ROW) * (INVADER_SIZE + INVADERS_DISTANCE_HORIZONTAL)
        return {
            image: INVADER_IMAGES[row],
            died: false,
            x: col + INVADERS_START_MARGIN_LEFT,
            y: row * (INVADER_SIZE + INVADERS_DISTANCE_VERTICAL) + INVADERS_START_MARGIN_TOP
        }
    });


    const navigate = useNavigate();

    const [timeCount, setTimeCount] = useState<number>(0);
    const [attackArray, setAttackArrary] = useState<Array<PlayerAttackObj>>([]);
    const [playerPosition, setPlayerPosition] = useState<PlayerObj>({ life: 0, x: 0, y: 0 });
    const [playerLifePoints, setPlayerLifePoints] = useState<number>(PLAYER_LIFE_POINT);

    const canvasRef = useRef(null);
    const intervalRef = useRef<NodeJS.Timer | null>(null);
    const timeCountRef = useRef<number>(0);
    const playerPositionRef = useRef<PlayerObj>({ life: 0, x: 0, y: 0 });
    const playerLifePointsRef = useRef<number>(0);
    const invadersRef = useRef<Array<InvaderObj>>(INVADERS_DEFAULT_STATUS);
    const attackArrayRef = useRef<Array<PlayerAttackObj>>([]);
    const invaderAttackArrayRef = useRef<Array<InvaderAttackObj>>([]);
    const invadersHorizontalDirection = useRef<boolean>(true);

    timeCountRef.current = timeCount;
    playerPositionRef.current = playerPosition;
    playerLifePointsRef.current = playerLifePoints;
    attackArrayRef.current = attackArray;

    //範囲指定の乱数生成器
    function getRandomArbitrary(min: number, max: number) {
        return Math.random() * (max - min) + min;
    }

    //左移動
    const playerMoveLeft = useCallback(() => {
        setPlayerPosition((position) => {
            position.x -= PLAYER_MOVEMENT
            return position;
        });
    }, []);

    //右移動
    const playerMoveRight = useCallback(() => {
        setPlayerPosition((position) => {
            position.x += PLAYER_MOVEMENT
            return position;
        })
    }, []);

    //攻撃
    const attack = useCallback(() => {
        const ctx: CanvasRenderingContext2D = getContext();
        setAttackArrary((attackA) => attackA = attackA.length < ATTACK_AMOUNT ? [...attackA, { x: playerPositionRef.current.x + (PLAYER_SIZE / 2), y: ctx.canvas.height - 10 }] : [...attackA])
    }, []);

    //キーイベント登録
    useKey('ArrowLeft', playerMoveLeft);
    useKey('ArrowRight', playerMoveRight);
    useKey('ArrowUp', attack);

    //キャンバス取得関数
    const getContext = useCallback((): CanvasRenderingContext2D => {
        const canvas: any = canvasRef.current;

        return canvas.getContext('2d');
    }, []);


    //カウント開始（メイン処理）
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

        //タイマー処理
        intervalRef.current = setInterval(() => {
            setTimeCount((count: number) => ++count)

            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

            //DIFENSE LINE
            ctx.beginPath();
            ctx.fillStyle = "red";
            ctx.fillRect(0, ctx.canvas.height - DIFENSE_LINE, ctx.canvas.width, 1);

            //PLYAER
            ctx.beginPath();
            ctx.moveTo(playerPositionRef.current.x + (PLAYER_SIZE / 2), playerPositionRef.current.y);
            ctx.lineTo(playerPositionRef.current.x, playerPositionRef.current.y + PLAYER_SIZE);
            ctx.lineTo(playerPositionRef.current.x + PLAYER_SIZE, playerPositionRef.current.y + PLAYER_SIZE);
            ctx.closePath();
            ctx.fillStyle = "white";
            ctx.fill();
            playerLifePointsRef.current > 1 ? ctx.strokeStyle = "blue" : ctx.strokeStyle = "red";
            ctx.lineWidth = 0.5;
            ctx.stroke();

            //ATTACK!!
            for (let i = attackArrayRef.current.length - 1; i >= 0; i--) {
                attackArrayRef.current[i].y -= ATTACK_MOVEMENT;
                //枠線あり
                ctx.beginPath();
                ctx.arc(attackArrayRef.current[i].x, attackArrayRef.current[i].y, ATTACK_SIZE / 2, 0, Math.PI * 2, true);
                ctx.fillStyle = "lightskyblue";
                ctx.fill();

                if (attackArrayRef.current[0].y < 0) {
                    setAttackArrary((array) => array = array.slice(1))
                };
            }

            //INVADER
            if (timeCountRef.current % INVADER_SPEED == 0) {
                invadersRef.current.map((invader) => {

                    invadersHorizontalDirection.current ? invader.x += INVADER_MOVEMENT_HORIZONTAL : invader.x -= INVADER_MOVEMENT_HORIZONTAL
                });
                //移動
                if (invadersRef.current[INVADERS_ONE_ROW - 1].x > ctx.canvas.width - INVADERS_MARGIN - INVADER_SIZE
                    || invadersRef.current[0].x < 0 + INVADERS_MARGIN) {
                    invadersRef.current.map((invader) => {
                        invader.y += INVADER_MOVEMENT_VERTICAL;
                    })
                }
                //移動方向
                if (invadersRef.current[INVADERS_ONE_ROW - 1].x > ctx.canvas.width - INVADERS_MARGIN - INVADER_SIZE
                    || invadersRef.current[0].x < 0 + INVADERS_MARGIN) {
                    invadersHorizontalDirection.current = !invadersHorizontalDirection.current;
                }
            }

            //INVADER_ATTACKの描画
            if (timeCountRef.current % INVADER_ATTACK_FREQUENCY == 0) {
                invaderAttackArrayRef.current.push({ image: INVADER_ATTACK_IMAGES[Math.floor(Math.random() * INVADER_ATTACK_IMAGES.length)], x: getRandomArbitrary(0, ctx.canvas.width - INVADERS_ATTACK_SIZE), y: 10 });
            }
            for (let i = invaderAttackArrayRef.current.length - 1; i >= 0; i--) {
                invaderAttackArrayRef.current[i].y += INVADER_ATTACK_MOVEMENT;

                if (((invaderAttackArrayRef.current[i].x <= playerPositionRef.current.x && invaderAttackArrayRef.current[i].x + INVADERS_ATTACK_SIZE >= playerPositionRef.current.x)
                    || (invaderAttackArrayRef.current[i].x >= playerPositionRef.current.x + PLAYER_SIZE && invaderAttackArrayRef.current[i].x + INVADERS_ATTACK_SIZE <= playerPositionRef.current.x + PLAYER_SIZE))
                    && (invaderAttackArrayRef.current[i].y <= playerPositionRef.current.y && invaderAttackArrayRef.current[i].y + INVADERS_ATTACK_SIZE >= playerPositionRef.current.y)) {
                    invaderAttackArrayRef.current.splice(i, 1);
                    setPlayerLifePoints((life) => --life)
                }
                ctx.beginPath();
                ctx.drawImage(invaderAttackArrayRef.current[i].image, invaderAttackArrayRef.current[i].x, invaderAttackArrayRef.current[i].y, INVADERS_ATTACK_SIZE, INVADERS_ATTACK_SIZE)
            }

            //ゲームオーバー判定
            if (playerLifePointsRef.current == 0) {
                gameStop();
                //結果へ遷移
                const getDefeatedCount = (() => {
                    let count: number = 0;
                    invadersRef.current.map((invader) => {
                        count += invader.died ? 1 : 0;
                    })
                    return count;

                })
                navigate('/invader/result', {
                    state: {
                        time: timeCountRef.current * (TIME_INTERVAL / 1000), defeatedCount: getDefeatedCount()
                    }
                });
            }

            invadersRef.current.map((invader, index) => {
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

                //INVADERの残りが0なら勝利
                if (getDefeatedCount() == INVADERS_AMOUNT) {
                    isEnd();
                }

                //INVADERの描画
                if (!invader.died) {
                    //防衛ラインを越えていれば敗北
                    if (invader.y > ctx.canvas.height - DIFENSE_LINE) {
                        isEnd();
                    }
                    ctx.drawImage(INVADERS_DEFAULT_STATUS[index].image, invader.x, invader.y, INVADER_SIZE, INVADER_SIZE)
                }
            })

            //ライフポイントがなくなれば敗北
            if (playerLifePointsRef.current == 0) {
                isEnd();
            }

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

    //ゲーム終了判定
    const isEnd = useCallback(() => {
        gameStop();
        navigate('/invader/result', {
            state: {
                time: Math.floor(timeCountRef.current * (TIME_INTERVAL / 1000)), defeatedCount: getDefeatedCount()
            }
        });
    }, [])

    //結果へ遷移
    const getDefeatedCount = useCallback(() => {
        let count: number = 0;
        invadersRef.current.map((invader) => {
            count += invader.died ? 1 : 0;
        })
        return count;
    }, [])



    return (
        <Box w={'80vw'} >
            <SCanvas className="canvas" ref={canvasRef} />
            <Box as="p" bg={playerLifePoints <= 1 ? "red" : "blue"} w={20} h={10} textAlign="center" fontSize={24} color="white">{playerLifePoints}</Box>
            <Flex>
                <InvaderButtons gameStart={gameStart} gameStop={gameStop} />
            </Flex>
        </Box>
    )
})

