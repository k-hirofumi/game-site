import { Box, Flex } from "@chakra-ui/react"
import { memo } from "react"

export const Home = memo(() => {
    function sqrt(a: number): number {

        let result = 1;
        for (let i = 1; i <= 10; i++) { //　i <= 10　← 精度
            const multi = multiplier(i)

            while ((result * result) < a) {
                result += (1 * multi);
            }
            result -= (1 * multi);

        }
        return result;
    }

    function multiplier(multi: number): number {
        let x: number = 1
        for (let j = 1; j <= multi; j++) {
            x /= 10;
        }
        return x;
    }




    return (
        <Box>
            <Flex bg={"black"} display={"inline-block"}>
                <p>AAAA</p>
                <Flex bg={"red"} display={"inline-block"}>

                    {sqrt(5)}
                </Flex>

            </Flex>

        </Box>
    )
})