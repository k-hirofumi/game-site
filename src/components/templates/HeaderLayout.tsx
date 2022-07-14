import { FC, memo, ReactNode } from "react"
import { Footer } from "../organisms/layout/Footer";
import { Header } from "../organisms/layout/Header";

type Props = {
    children: ReactNode;
}
export const HeaderLayout: FC<Props> = memo((props) => {
    const { children } = props;

    return (
        <>
            <Header />
            {children}
        </>
    )
})