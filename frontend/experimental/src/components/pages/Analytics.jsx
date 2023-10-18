import { Route, Routes, Link} from 'react-router-dom'
import { useEffect, useState } from 'react'
import Tracks from './Tracks'
import Artists from './Artists'

const Analytics = () => {

    console.log('in Analytics')

    return(
        <>
            <h1>Analytics</h1>
            <li><Link to='/analytics/top-tracks'>Top Tracks</Link></li>
            <li><Link to='/analytics/top-artists'>Top Artists</Link></li>

            <Routes>
                <Route index element={ <Tracks /> }/>
                <Route path='top-tracks' element={ <Tracks /> }/>
                <Route path='top-artists' element={ <Artists /> }/>
            </Routes>
        </>
    )
}

export default Analytics