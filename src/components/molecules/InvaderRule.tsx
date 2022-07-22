import { Box, Button } from "@chakra-ui/react"
import { FC } from "react";

type Props = {
    goToGame: () => void;
}
export const InvaderRule: FC<Props> = (props) => {
    const { goToGame } = props;
    return (
        <Box bg={'white'} w={600} h={400} textAlign="center">
            <Box as="b" fontSize={30}>説明</Box>
            <Box as="p">・スタートボタンでゲームが開始されます</Box>
            <Box as="p">・ストップボタンでゲームが一時中断されます</Box>
            <Box as="p">・← →キーで横移動します</Box>
            <Box as="p">・↑ キーで攻撃できます。一度に使用できるのは３発までです。</Box>
            <Box as="p">・3回敵の攻撃に当たる、または防衛ラインを突破されると負けです</Box>
            <Box as="p">・敵を全て撃破すると勝ちです。</Box>
            <Button mt={10} bg={'white'} boxShadow='outline' onClick={goToGame}>ゲーム画面へ</Button>
        </Box>
    )
}