import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import About from './pages/About'
import TopArtists from './pages/TopArtists'
import TopTracks from './pages/TopTracks'
import NoPage from './pages/NoPage'

export default function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Home />} />
                    <Route path='/Home' element={<Home />} />
                    <Route path='/Login' element={<Login />} />
                    <Route path='/TopTracks' element={<TopTracks />} />
                    <Route path='/TopArtists' element={<TopArtists />} />
                    <Route path='/About' element={<About />} />
                    <Route path='*' element={<NoPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}