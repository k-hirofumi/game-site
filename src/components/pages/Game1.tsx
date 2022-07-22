import { FC, memo, useEffect, useRef, useState } from "react"
import { InvaderGame } from "../molecules/InvaderGame"

type Props = {
    mode: 'easy' | 'normal' | 'hard';
}
export const Game1: FC<Props> = memo((props) => {
    const { mode } = props;

    // const [invaderSpeed, setInvaderSpeed] = useState<number>(0);
    // const [invaderAmount, setInvaderAmount] = useState<number>(0);
    // const [invaderAttackMovement, setInvaderAttackMovement] = useState<number>(0);
    // const [invaderAttackFrequency, setInvaderAttackFrequency] = useState<number>(0);
    // const [invaderAttackSize, setInvaderAttackSize] = useState<number>(0);

    const invaderSpeedRef = useRef(0);
    const invaderAmountRef = useRef(0);
    const invaderAttackMovementRef = useRef(0);
    const invaderAttackFrequencyRef = useRef(0);
    const invaderAttackSizeRef = useRef(0);

    //ステートは一度目のレンダリングで初期値が渡されてしまうため、ここでは副作用を使用する。
    // useEffect(() => {
    //     setInvaderSpeed((speed) => speed = mode === "easy" ? 10 : mode === "normal" ? 9 : 8)
    //     setInvaderAmount((amount) => amount = mode === "easy" ? 40 : mode === "normal" ? 50 : 60)
    //     setInvaderAttackMovement((move) => move = mode === "easy" ? 5 : mode === "normal" ? 20 : 30)
    //     setInvaderAttackFrequency((freq) => freq = mode === "easy" ? 10 : mode === "normal" ? 9 : 8)
    //     setInvaderAttackSize((size) => size = mode === "easy" ? 14 : mode === "normal" ? 16 : 16)
    // }, [])

    invaderSpeedRef.current = mode === "easy" ? 10 : mode === "normal" ? 9 : 8;
    invaderAmountRef.current = mode === "easy" ? 40 : mode === "normal" ? 50 : 60;
    invaderAttackMovementRef.current = mode === "easy" ? 5 : mode === "normal" ? 6 : 7;
    invaderAttackFrequencyRef.current = mode === "easy" ? 10 : mode === "normal" ? 9 : 8;
    invaderAttackSizeRef.current = mode === "easy" ? 14 : mode === "normal" ? 16 : 16;

    return (
        <InvaderGame
            invaderSpeed={invaderSpeedRef.current}
            invaderAmount={invaderAmountRef.current}
            invaderAttackMovement={invaderAttackMovementRef.current}
            invaderAttackFrequency={invaderAttackFrequencyRef.current}
            invaderAttackSize={invaderAttackSizeRef.current} />
    )
})

