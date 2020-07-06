import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, } from '@material-ui/core';
import MatchRow from './matchRow';

function TournamentMatchList({name, matches}){
  return (
    <div style={{margin: '0 auto', maxWidth: '450px', minWidth: '400px'}}>
      <h2>{name}</h2>
      <TableContainer>
        <Table size='small'>
          <TableHead>
            <TableRow variant='head'>
              <TableCell>round</TableCell>
              <TableCell>opponent</TableCell>
              <TableCell>result</TableCell>
              <TableCell>eloΔ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {matches.map((match, index) => <MatchRow match={match} key={index}/>)}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default TournamentMatchList;