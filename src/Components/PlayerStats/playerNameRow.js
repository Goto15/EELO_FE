import React from 'react';
import  {TableCell, TableRow } from '@material-ui/core';

function PlayerNameRow({player, selectPlayer}){
  return (
    <TableRow hover={true} onClick={() => selectPlayer(player)}>
      <TableCell>{player.ign}</TableCell>
    </TableRow>
  )
}

export default PlayerNameRow;
