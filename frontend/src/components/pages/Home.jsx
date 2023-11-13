import RedirectButton from '../RedirectButton'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'

const Home = () => {

    return (
        <>
            <h1>Home Page</h1>
            <RedirectButton to='http://localhost:8080/api/login'/>
            <Stack spacing={2} direction='row'>
                <Button variant='text'>Text</Button>
                <Button variant='contained'>Contained</Button>
                <Button variant='outlined'>Outlined</Button>
            </Stack>
        </>
    )
}

export default Home