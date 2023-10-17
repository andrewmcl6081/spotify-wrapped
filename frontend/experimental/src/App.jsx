import { Link, Route, Routes } from 'react-router-dom'
import Home from './components/pages/Home'
import About from './components/pages/About'
import Analytics from './components/pages/Analytics'
import Analytics2 from './components/pages/Analytics2'
import Tracks from './components/pages/Tracks'
import Artists from './components/pages/Artists'

const App = () => {

    return (
        <>
            <nav>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/about'>About</Link></li>
                    <li><Link to='/analytics'>Analytics</Link></li>
                    <li><Link to='/analytics2'>Analytics2</Link></li>
                </ul>
            </nav>
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/about' element={<About />}></Route>
                <Route path='/analytics2' element={<Analytics2/>}></Route>
                <Route path='/analytics' element={<Analytics />}>
                    <Route index element={<Tracks />} />
                    <Route path='top-tracks' element={<Tracks/>} />
                    <Route path='top-artists' element={<Artists/>} />
                </Route>
            </Routes>
        </>    
    )
}

export default App