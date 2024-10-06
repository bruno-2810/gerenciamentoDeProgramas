import { BrowserRouter, Routes, Route } from "react-router-dom"
import App from './pages/inicio/App.jsx'
import Canais from "./pages/canal/index.jsx"
import Favoritos from "./pages/favorito/index.jsx"
import Programa from "./pages/programa/index.jsx"
import Usuario from "./pages/usuario/index.jsx"

export default function Navegacao () {
    return(
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App/>}/>
                    <Route path="/canal" element={<Canais/>}/>
                    <Route path="/programa" element={<Programa/>}/>
                    <Route path="/programafav" element={<Favoritos/>}/>
                    <Route path="/usuario" element={<Usuario/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}