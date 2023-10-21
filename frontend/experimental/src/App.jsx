import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Home from './components/pages/Home'
import About from './components/pages/About'
import Analytics from './components/pages/Analytics'
import Tracks from './components/pages/Tracks'
import Artists from './components/pages/Artists'

import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/custom-styles.css'

const App = () => {
    const [isAuthorized, setIsAuthorized] = useState(false)
    console.log("Top of App")

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)
        const jwt = urlParams.get("jwt")

        if(jwt) {
            console.log("Receieved JWT, saving to local storage")
            localStorage.setItem('jwt', jwt)
            setIsAuthorized(true)
        }
        
    }, [])

    console.log("Rendering App's children")
    return (
        <>
            <Navbar expand='lg' className='bg-body-tertiary'>
                <Container>
                    <Navbar.Brand as={Link} to='/'>Wrapify</Navbar.Brand>
                    <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                    <Navbar.Collapse id='responsive-navbar-nav'>
                        <Nav className='me-auto'>
                            <Nav.Link as={Link} to='/'>Home</Nav.Link>
                            <Nav.Link as={Link} to='/about'>About</Nav.Link>
                            { isAuthorized && <Nav.Link as={Link} to='/analytics/top-tracks'>Analytics</Nav.Link>}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/about' element={<About />}></Route>
                <Route path='/analytics/*' element={<Analytics isAuthorized={isAuthorized}/>}></Route>
            </Routes>
        </>    
    )
}

export default App