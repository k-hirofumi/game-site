import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    styles: {
        global: {
            body: {
                backgroundColor: "gray.10",
                color: "gray.500"
            }
        }
    }
})

export default theme;