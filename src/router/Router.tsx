import { Route, Routes } from "react-router-dom"
import { Game } from "../components/pages/Game"
import { Home } from "../components/pages/Home"
import { Result } from "../components/pages/Result"
import { Layout } from "../Layout"

export const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />} />
            <Route index element={<Home />} />
            <Route path="game" element={<Game />} />
            <Route path="result" element={<Result />} />

        </Routes>

    )
}