import { AppBar, Box, Toolbar, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem} from '@mui/material'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Home from './components/pages/Home'
import About from './components/pages/About'
import Analytics from './components/pages/Analytics'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import AlbumIcon from '@mui/icons-material/Album'

import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/custom-styles.css'

const pages = ['Home', 'About']
const authPages = ['Home', 'About', 'Analytics']

const App = () => {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [anchorElNav, setAnchorElNav] = useState(null)

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

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  console.log("Rendering App's children")
  return (
    <>
      <AppBar position='static' color='secondary'>
        <Container maxWidth='xl'>
          <Toolbar disableGutters>
            <AlbumIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant='h6'
              noWrap
              component='a'
              href='#'
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Wrapify
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size='large'
                aria-label='navigation'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleOpenNavMenu}
                color='inherit'
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                { isAuthorized ? (
                  authPages.map((page) => (
                    <Link key={page} to={`/${page.toLowerCase()}`} style={{ textDecoration: 'none' }}>
                      <MenuItem onClick={handleCloseNavMenu}>
                        <Typography textAlign='center'>{page}</Typography>
                      </MenuItem>
                    </Link>
                  ))
                ) : (
                  pages.map((page) => (
                    <Link key={page} to={`/${page.toLowerCase()}`} style={{ textDecoration: 'none' }}>
                      <MenuItem onClick={handleCloseNavMenu}>
                        <Typography textAlign='center'>{page}</Typography>
                      </MenuItem>
                    </Link>
                  ))
                )}
              </Menu>
            </Box>
            <AlbumIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant='h5'
              noWrap
              component='a'
              href='#'
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Wrapify
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              { isAuthorized ? (
                authPages.map((page) => (
                  <Link key={page} to={`/${page.toLowerCase()}`} style={{ textDecoration: 'none' }}>
                    <Button
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: 'white', display: 'block'}}
                    >
                      {page}
                    </Button>
                  </Link>
                ))
              ) : (
                pages.map((page) => (
                  <Link key={page} to={`/${page.toLowerCase()}`} style={{ textDecoration: 'none' }}>
                    <Button
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: 'white', display: 'block'}}
                    >
                      {page}
                    </Button>
                  </Link>
                ))
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* App Routes Defined */}
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/analytics/*' element={<Analytics isAuthorized={isAuthorized}/>}></Route>
      </Routes>
    </>   
  )
}

export default App