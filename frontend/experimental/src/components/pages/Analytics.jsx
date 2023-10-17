import { Link, Outlet } from 'react-router-dom'

const Analytics = () => {

    return (
        <>
            <h1>Analytics Page</h1>

            <li><Link to='top-tracks'>Top Tracks</Link></li>
            <li><Link to='top-artists'>Top Artists</Link></li>

            <Outlet />
        </>
    )
}

export default Analytics