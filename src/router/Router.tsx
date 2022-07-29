import { memo } from "react"
import { Route, Routes } from "react-router-dom"
import { Game1 } from "../components/pages/Game1"
import { GamePre1 } from "../components/pages/GamePre1"
import { Home } from "../components/pages/Home"
import { Practice } from "../components/pages/Practice"
import { Result } from "../components/pages/Result"
import { GameLayout } from "../layouts/GameLayout"
import { MainLayout } from "../layouts/MainLayout"

export const Router = memo(() => {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />} >
                <Route index element={<Home />} />
                <Route path="invader" element={<GameLayout />} >
                    <Route index element={<Game1 />} />
                    <Route path="result" element={<Result />} />
                </Route>

                <Route path="GamePre1" element={<GamePre1 />} />
                <Route path="result" element={<Result />} />
                <Route path="practice" element={<Practice />} />
            </Route>

        </Routes>

    )
})