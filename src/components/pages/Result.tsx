import { Box, Flex } from "@chakra-ui/react";
import { memo, useState } from "react"
import { useLocation } from "react-router-dom";
import { lGame1Result } from "../../types/games";



export const Result = memo(() => {
    const location = useLocation();
    const [resultSet, setResultSet] = useState<any>(location.state);


    return (
        <Box bg={'white'} w={400} h={300} textAlign='center'  >
            <Box p={20}>
                <Box as="p" fontSize='3xl' > タイム：{resultSet.time}s</Box>
                <Box as="p" fontSize='3xl' >撃破数：{resultSet.defeatedCount}体</Box>
            </Box>
        </Box>
    )
})