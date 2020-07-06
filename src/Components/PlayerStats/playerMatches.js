import React, { Fragment, useEffect, useState } from 'react';
import PlayerName from './playerName';
import TournamentMatchList from './tournamentMatchList';

function PlayerMatches({ selectedPlayer }){
  const [playerMatches, setPlayerMatches] = useState(null);

  useEffect(() => {
    if(selectedPlayer) {
      fetch(`https://epicelodata.com:3000/players/${selectedPlayer.id}/matches`)
        .then((resp) => resp.json())
        .then((json) => setPlayerMatches(json));
    }
  }, [selectedPlayer]);

  return (
      <Fragment>
        <PlayerName name={selectedPlayer ? selectedPlayer.ign : 'No Selection'} />
        {playerMatches ? 
          (Object.keys(playerMatches.matches).map(tournament => {
            return (
                <TournamentMatchList
                  key={tournament}
                  name={tournament}
                  matches={playerMatches.matches[tournament]}
                />)})
          ) : null}
      </Fragment>
  );
}

export default PlayerMatches;