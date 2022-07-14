import { memo } from "react"
import { Route, Routes } from "react-router-dom"
import { Game1 } from "../components/pages/Game1"
import { GamePre1 } from "../components/pages/GamePre1"
import { Home } from "../components/pages/Home"
import { Practice } from "../components/pages/Practice"
import { Result } from "../components/pages/Result"
import { Layout } from "../Layout"

export const Router = memo(() => {
    return (
        <Routes>
            <Route path="/" element={<Layout />} >
                <Route index element={<Home />} />
                <Route path="game1" element={<Game1 />} />
                <Route path="GamePre1" element={<GamePre1 />} />
                <Route path="result" element={<Result />} />
                <Route path="practice" element={<Practice />} />
            </Route>

        </Routes>

    )
})