import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import {} from '@material-ui/core/styles';
import TableNav from './tableNav';
import PlayerRow from './playerRow';
import PlayerNameRow from './playerNameRow';

function PlayerTable({ selectPlayer }) {
  const [players, setPlayers] = useState(null);
  const [playerPage, setPlayerPage] = useState(1);
  const [displayedRows] = useState(15);

  useEffect(() => {
    fetch('https://epicelodata.com:3000/players')
      .then((resp) => resp.json())
      .then((json) => setPlayers(json.sort((a, b) => b.elo - a.elo))
      );
  }, []);

  const changePage = (event, newPage) => setPlayerPage(newPage)

  return (
    <div>
    <TableContainer  className='player-table-head-col'>
      <Table size='small'>
        <TableHead>
          <TableRow variant='head'>
            <TableCell>ign</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {players
            ? players
                .slice(playerPage * displayedRows - displayedRows, playerPage * displayedRows)
                .map((player) => {
                  return (
                    <PlayerNameRow 
                    key={player.ign} 
                    player={player} 
                    selectPlayer={selectPlayer}/>
                    )}
                  )
            : null}
        </TableBody>
      </Table>
    </TableContainer>
    <TableContainer className='player-table-body'>
      <Table size='small'>
        <TableHead>
          <TableRow variant='head'>
            <TableCell>elo</TableCell>
            <TableCell>peak</TableCell>
            <TableCell>dd_elo</TableCell>
            <TableCell>con_elo</TableCell>
            <TableCell>record</TableCell>
            <TableCell>%</TableCell>
            <TableCell>tourneys</TableCell>
            <TableCell>wins</TableCell>
            <TableCell>top8s</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {players
            ? players
                .slice(playerPage * displayedRows - displayedRows, playerPage * displayedRows)
                .map((player) => {
                  return (
                    <PlayerRow 
                    player={player} 
                    key={player.ign} 
                    selectPlayer={selectPlayer}/>
                    )}
                  )
            : null}
        </TableBody>
      </Table>
    </TableContainer>
    <div style={{clear: 'both'}}/>
    {players ? 
      <TableNav
        pages={Math.ceil(players.length / displayedRows)}
        currentPage={playerPage}
        changePage={changePage}
      /> 
      : null}
    </div>
    );
}

export default PlayerTable;
