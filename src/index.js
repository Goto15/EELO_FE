const players = [];

function renderPlayer(player) {
  console.log(player);
}

function getPlayersID(id) {
  return fetch(`http://localhost:3000/players/${id}`)
    .then(resp => resp.json())
    .then(json => renderPlayer(json));
}

function renderPlayerTable() {
  const rankingTable = document
    .getElementById('players')
    .getElementsByTagName('tbody')[0];

  for (let i = 0; i < players.length; i += 1) {
    const player = players[i];
    const playerRow = rankingTable.insertRow();

    const rank = playerRow.insertCell(0);
    rank.appendChild(document.createTextNode(i + 1));

    const name = playerRow.insertCell(1);
    name.className = 'ign';
    name.appendChild(document.createTextNode(player.ign));

    const elo = playerRow.insertCell(2);
    elo.appendChild(document.createTextNode(player.elo));

    const record = playerRow.insertCell(3);
    record.appendChild(
      document.createTextNode(`${player.wins}-${player.losses}`)
    );

    const winPercent = playerRow.insertCell(4);
    winPercent.appendChild(
      document.createTextNode(`${player.win_percentage}%`)
    );

    const tourneys = playerRow.insertCell(5);
    tourneys.appendChild(document.createTextNode(player.num_tournaments));

    const tourneyWins = playerRow.insertCell(6);
    tourneyWins.appendChild(document.createTextNode(player.tournament_wins));

    const top8s = playerRow.insertCell(7);
    top8s.appendChild(document.createTextNode(player.top_8s));

    playerRow.addEventListener('click', () => {
      getPlayersID(player.id);
    });

    rankingTable.append(playerRow);
  }
}

function getPlayers() {
  fetch('http://localhost:3000/players')
    .then(resp => resp.json())
    .then(json => {
      json.forEach(e => {
        players.push(e);
      });
      // Reverse sort players by Elo
      players.sort((a, b) => parseInt(b.elo) - parseInt(a.elo));
      renderPlayerTable();
    });
}

document.addEventListener('DOMContentLoaded', () => {
  getPlayers();
});
