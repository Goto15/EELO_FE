const baseURL = 'https://epicelodata.com:3000/';
const players = [];

function sortRounds(matches) {
  const swissRounds = matches
    .filter(function (match) {
      return !isNaN(match.round);
    })
    .sort(function (a, b) {
      return parseInt(a.round) - parseInt(b.round);
    });

  const top8 = matches.filter(function (match) {
    return isNaN(match.round);
  });

  return swissRounds.concat(top8);
}

function renderPlayer(playerInfo) {
  const playerName = document.getElementById('player-name');
  playerName.innerText = playerInfo.player;

  const playerTournaments = document.getElementById('tournament-tables');
  playerTournaments.innerHTML = '';

  const tournaments = Object.keys(playerInfo.matches);
  tournaments.forEach((tournament) => {
    const tournamentName = document.createElement('h5');
    tournamentName.innerText = tournament;
    playerTournaments.append(tournamentName);

    const tournamentTable = document.createElement('table');
    const tournamentTHead = document.createElement('thead');

    const roundTH = document.createElement('th');
    roundTH.innerText = 'round';
    tournamentTHead.appendChild(roundTH);

    const oppTH = document.createElement('th');
    oppTH.innerText = 'opponent';
    tournamentTHead.appendChild(oppTH);

    const resultTH = document.createElement('th');
    resultTH.innerText = 'result';
    tournamentTHead.appendChild(resultTH);

    const deltaTH = document.createElement('th');
    deltaTH.innerText = 'eloDelta';
    tournamentTHead.appendChild(deltaTH);

    sortRounds(playerInfo.matches[tournament]).forEach((match) => {
      const matchRow = tournamentTable.insertRow();

      const roundTD = matchRow.insertCell(0);
      roundTD.appendChild(document.createTextNode(match.round));

      const oppTD = matchRow.insertCell(1);
      oppTD.appendChild(document.createTextNode(match.opponent));

      const resultTD = matchRow.insertCell(2);
      resultTD.appendChild(document.createTextNode(match.result));

      const eloTD = matchRow.insertCell(3);
      eloTD.appendChild(document.createTextNode(match.elo_delta));
    });

    tournamentTable.appendChild(tournamentTHead);
    playerTournaments.append(tournamentTable);
  });
}

function getPlayersID(id) {
  return fetch(`${baseURL}players/${id}`)
    .then((resp) => resp.json())
    .then((json) => renderPlayer(json));
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
    elo.className = 'right-border';
    elo.appendChild(document.createTextNode(player.elo));

    const record = playerRow.insertCell(3);
    record.appendChild(document.createTextNode(`${player.wins}-${player.losses}`));

    const winPercent = playerRow.insertCell(4);
    winPercent.className = 'right-border';
    winPercent.appendChild(document.createTextNode(`${player.win_percentage}%`));

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
  fetch(`${baseURL}players`)
    .then((resp) => resp.json())
    .then((json) => {
      json.forEach((e) => {
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
