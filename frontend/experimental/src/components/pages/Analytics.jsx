import { Route, Routes, Link} from 'react-router-dom'
import { useEffect, useState } from 'react'
import Tracks from './Tracks'
import Artists from './Artists'

const Analytics = ({ isAuthorized }) => {

    console.log('in Analytics authorized is', isAuthorized)

    return(
        <>
            <h1>Analytics</h1>
            <li><Link to='/analytics/top-tracks'>Top Tracks</Link></li>
            <li><Link to='/analytics/top-artists'>Top Artists</Link></li>

            <Routes>
                <Route index element={ <Tracks isAuthorized={isAuthorized} /> }/>
                <Route path='top-tracks' element={ <Tracks isAuthorized={isAuthorized} /> }/>
                <Route path='top-artists' element={ <Artists /> }/>
            </Routes>
        </>
    )
}

export default Analytics