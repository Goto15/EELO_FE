import React from 'react';
import {TableCell, TableRow} from '@material-ui/core';

function MatchRow({ match }){
  const didWin = match.result === 'won';
  const winLoseDecorator = didWin ? '' : '-'
  const red = '#ffe5e5';
  const green = '#d2f8d2';

  const style = { backgroundColor: didWin ? green : red }

  return  <TableRow hover={true}>
            <TableCell>{match.round}</TableCell>
            <TableCell align='right'>{match.opponent}</TableCell>
            <TableCell align='left' style={style}>{match.result}</TableCell>
            <TableCell>{`${winLoseDecorator}${match.elo_delta}`}</TableCell>
          </TableRow>
}

export default MatchRow;