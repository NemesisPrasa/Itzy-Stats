import React from 'react'
import SpotifyTable from './SpotifyTable'
import './itzyDashBoard.css'

const ItzyDashBoard = () => {
  return (
    <div className='Itzy-dash-board'>
        <h1>Spotify Play Count</h1>
        <SpotifyTable />
    </div>
  )
}

export default ItzyDashBoard