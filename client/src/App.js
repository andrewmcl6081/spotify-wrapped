import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import TopTracks from './pages/TopTracks'
import NoPage from './pages/NoPage'


export default function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Home />} />
                    <Route path='/home' element={<Home />} />
                    <Route path='/TopTracks' element={<TopTracks />} />
                    <Route path='*' element={<NoPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}