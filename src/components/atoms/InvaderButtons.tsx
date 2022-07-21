import { Button } from "@chakra-ui/react";
import { FC } from "react";

type Props = {
    gameStart: () => void;
    gameStop: () => void;
}
export const InvaderButtons: FC<Props> = (props) => {
    const { gameStart, gameStop } = props;
    return (
        <>
            <Button m={2} bg={'white'} boxShadow='outline' onClick={gameStart}>START</Button>
            <Button m={2} bg={'white'} boxShadow='outline' onClick={gameStop}>STOP</Button>
        </>
    )
}