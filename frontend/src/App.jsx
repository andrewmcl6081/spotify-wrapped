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

const styles = {
  appBar: {
    background: 'rgba(0,0,0,.8)'
  }
}

const App = () => {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [anchorElNav, setAnchorElNav] = useState(null)

  console.log("Authorized: ", isAuthorized)

  // Function to check authentication status
  useEffect(() => {

    const checkAuthentication = async () => {
      try {
        const response = await fetch('/api/auth/authorized', { credentials: 'include'})
        const data = await response.json()
    
        setIsAuthorized(data.isAuthorized)
      }
      catch (error) {
        console.error('Error checking authentication status: ', error)
      }
    }

    checkAuthentication()    
  }, [])

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  return (
    <>
      <AppBar position='static' sx={styles.appBar}>
        <Container maxWidth='xl'>
          <Toolbar disableGutters>
            <AlbumIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1  }} />
            <Typography
              variant='h6'
              noWrap
              component='a'
              href='#'
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 400,
                fontSize: '24px',
                letterSpacing: '.1rem',
                textDecoration: 'none',
                color: '#B0E0E6'
              }}
            >
              Wrapify
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }}}>
              <IconButton
                size='large'
                aria-label='navigation'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleOpenNavMenu}
              >
                <MenuIcon sx={{ color: '#B0E0E6' }}/>
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
                        <Typography textAlign='center' sx={{ color: '#B0E0E6'}} >{page}</Typography>
                      </MenuItem>
                    </Link>
                  ))
                ) : (
                  pages.map((page) => (
                    <Link key={page} to={`/${page.toLowerCase()}`} style={{ textDecoration: 'none' }}>
                      <MenuItem onClick={handleCloseNavMenu}>
                        <Typography textAlign='center' sx={{ color: '#B0E0E6'}} >{page}</Typography>
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
                textDecoration: 'none',
                color: '#B0E0E6'
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
                      sx={{ my: 2, color: '#B0E0E6', display: 'block' }}
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
                      sx={{ my: 2, color: '#B0E0E6', display: 'block'}}
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