import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import Home from './components/pages/Home'
import About from './components/pages/About'
import Analytics from './components/pages/Analytics'
import Tracks from './components/pages/Tracks'
import Artists from './components/pages/Artists'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/custom-styles.css'
import { useEffect } from 'react'

const App = () => {

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
                            <NavDropdown title='Analytics' id='collapsible-nav-dropdown'>
                                <NavDropdown.Item as={Link} to='/analytics/top-tracks'>Top Tracks</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to='/analytics/top-artists'>Top Artists</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/about' element={<About />}></Route>
                <Route path='/analytics/*' element={<Analytics />}>
                    <Route index element={<Tracks />} />
                    <Route path='top-tracks' element={<Tracks/>} />
                    <Route path='top-artists' element={<Artists/>} />
                </Route>
            </Routes>
        </>    
    )
}

export default App