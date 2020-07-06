import React, { Fragment, useState } from 'react';
import PlayerMatches from './PlayerStats/playerMatches';
import PlayerTable from './PlayerStats/playerTable';

function PlayerStats(){
  const [selectedPlayer, setSelectedPlayer] = useState(null)
  const selectPlayer = (player) => setSelectedPlayer(player);

  return (
    <Fragment>
      <PlayerTable selectPlayer={selectPlayer}/>
      <hr/>
      <div style={{clear: 'both'}}></div>
      <PlayerMatches selectedPlayer={selectedPlayer}/>
      <div style={{clear: 'both'}}></div>
    </Fragment>
  )
}

export default PlayerStats;