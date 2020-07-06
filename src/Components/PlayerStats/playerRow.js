import React from 'react';
import { TableRow, TableCell } from '@material-ui/core';

function PlayerRow({player, selectPlayer}) {
  return (
    <TableRow hover={true} onClick={() => selectPlayer(player)}>
      <TableCell className='secondColumn'>{player.elo}</TableCell>
      <TableCell>{player.max_elo}</TableCell>
      <TableCell>{player.dark_draft_elo}</TableCell>
      <TableCell>{player.constructed_elo}</TableCell>
      <TableCell>{player.wins}-{player.losses}</TableCell>
      <TableCell>{player.win_percentage}</TableCell>
      <TableCell>{player.num_tournaments}</TableCell>
      <TableCell>{player.tournament_wins}</TableCell>
      <TableCell>{player.top_8s}</TableCell>
    </TableRow>
  );
}

export default PlayerRow;
