import { Box, Button } from "@chakra-ui/react";
import { FC, memo, useCallback, useEffect, useRef, useState } from "react"
import { InvaderGame } from "../molecules/InvaderGame"
import { InvaderRule } from "../molecules/InvaderRule";


export const Game1 = memo(() => {


    const [mode, setMode] = useState<number>(0);
    const [playStart, setPlayStart] = useState<boolean>(false);

    // const [invaderSpeed, setInvaderSpeed] = useState<number>(0);
    // const [invaderAmount, setInvaderAmount] = useState<number>(0);
    // const [invaderAttackMovement, setInvaderAttackMovement] = useState<number>(0);
    // const [invaderAttackFrequency, setInvaderAttackFrequency] = useState<number>(0);
    // const [invaderAttackSize, setInvaderAttackSize] = useState<number>(0);

    const invaderSpeedRef = useRef<number>(0);
    const invaderAmountRef = useRef<number>(0);
    const invaderAttackMovementRef = useRef<number>(0);
    const invaderAttackFrequencyRef = useRef<number>(0);
    const invaderAttackSizeRef = useRef<number>(0);

    // //ステートは一度目のレンダリングで初期値が渡されてしまうため、ここでは副作用を使用する。
    // useEffect(() => {
    //     setInvaderSpeed((speed) => speed = mode === 0 ? 10 : mode === 1 ? 9 : 8)
    //     setInvaderAmount((amount) => amount = mode === 0 ? 40 : mode === 1 ? 50 : 60)
    //     setInvaderAttackMovement((move) => move = mode === 0 ? 5 : mode === 1 ? 6 : 7)
    //     setInvaderAttackFrequency((freq) => freq = mode === 0 ? 10 : mode === 1 ? 9 : 8)
    //     setInvaderAttackSize((size) => size = mode === 0 ? 14 : mode === 1 ? 16 : 16)
    // }, [playStart, mode])

    invaderSpeedRef.current = mode === 0 ? 10 : mode === 1 ? 9 : 8;
    invaderAmountRef.current = mode === 0 ? 40 : mode === 1 ? 50 : 60;
    invaderAttackMovementRef.current = mode === 0 ? 5 : mode === 1 ? 6 : 7;
    invaderAttackFrequencyRef.current = mode === 0 ? 10 : mode === 1 ? 9 : 8;
    invaderAttackSizeRef.current = mode === 0 ? 14 : mode === 1 ? 16 : 16;



    const goToEasy = useCallback(() => {
        setPlayStart(true)
        setMode(0)
    }, []);
    const goToNormal = useCallback(() => {
        setPlayStart(true)
        setMode(1)
    }, []);
    const goToHard = useCallback(() => {
        setPlayStart(true)
        setMode(2)
    }, []);


    return (
        <>
            {!playStart ?
                <InvaderRule goToEasy={goToEasy} goToNormal={goToNormal} goToHard={goToHard} />
                :
                <InvaderGame
                    invaderSpeed={invaderSpeedRef.current}
                    invaderAmount={invaderAmountRef.current}
                    invaderAttackMovement={invaderAttackMovementRef.current}
                    invaderAttackFrequency={invaderAttackFrequencyRef.current}
                    invaderAttackSize={invaderAttackSizeRef.current} />

                // <InvaderGame
                //     invaderSpeed={invaderSpeed}
                //     invaderAmount={invaderAmount}
                //     invaderAttackMovement={invaderAttackMovement}
                //     invaderAttackFrequency={invaderAttackFrequency}
                //     invaderAttackSize={invaderAttackSize} />
            }
        </>



    )
})

