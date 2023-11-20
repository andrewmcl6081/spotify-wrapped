import { useState, useEffect } from 'react'
import RedirectButton from '../RedirectButton'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'

const Home = () => {
    const [data, setData] = useState(null)
    const [data2, setData2] = useState(null)

    useEffect(() => {
        fetch('/api')
            .then((res) => res.json())
            .then((data) => setData(data.message))
            .catch((error) => console.log(error))
    }, [])

    return (
        <>
            <h1>Home Page</h1>
            <RedirectButton to='http://localhost:8080/api/login'/>
            <Stack spacing={2} direction='row'>
                <Button variant='text'>Text</Button>
                <Button variant='contained'>Contained</Button>
                <Button variant='outlined'>Outlined</Button>
            </Stack>
            <p>{!data ? "Loading..." : data}</p>
            <p>{!data ? "Loading Data 2..." : data2}</p>
        </>
    )
}

export default Home