const baseURL = 'http://localhost:3000/';
const players = [];
let pageNum = 1;
const pageLength = 24;

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

function changePage(num) {
  pageNum = num;
  renderPlayerTable();

  //Highlight correct button.
  let numPages = event.target.parentElement.children.length;
  for (let i = 0; i < numPages; i += 1) {
    //Must subtract 1 since arrays are 0 indexed but humans are 1 indexed.
    if (i === parseInt(event.target.innerHTML) - 1) {
      event.target.classList.add('selected-page');
    } else {
      event.target.parentElement.children[i].classList.remove('selected-page');
    }
  }
}

function createPages(count) {
  const pagination = document.getElementById('pagination');

  for (let i = 1; i <= Math.ceil(count / pageLength); i += 1) {
    const page = document.createElement('button');

    if (i === pageNum) page.className = 'selected-page';

    page.innerText = i;

    page.addEventListener('click', () => {
      changePage(i);
    });
    pagination.appendChild(page);
  }
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
    tournamentTable.classList.add('player-table');
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

      matchRow.insertCell(0).appendChild(document.createTextNode(match.round));
      matchRow.insertCell(1).appendChild(document.createTextNode(match.opponent));
      matchRow.insertCell(2).appendChild(document.createTextNode(match.result));
      matchRow.insertCell(3).appendChild(document.createTextNode(match.elo_delta));
    });

    tournamentTable.appendChild(tournamentTHead);
    playerTournaments.append(tournamentTable);
  });
}

function getPlayersID(id) {
  return fetch(`${baseURL}players/${id}/matches`)
    .then((resp) => resp.json())
    .then((json) => {
      renderPlayer(json);
    });
}

function renderPlayerTable() {
  const rankingTable = document
    .getElementById('players')
    .getElementsByTagName('tbody')[0];

  rankingTable.innerHTML = '';

  numberPlayers =
    pageLength * pageNum > players.length ? players.length : pageLength * pageNum;

  for (let i = pageLength * pageNum - pageLength; i < numberPlayers; i += 1) {
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
    tourneys.className = 'extra-info';
    tourneys.appendChild(document.createTextNode(player.num_tournaments));

    const tourneyWins = playerRow.insertCell(6);
    tourneyWins.className = 'extra-info';
    tourneyWins.appendChild(document.createTextNode(player.tournament_wins));

    const top8s = playerRow.insertCell(7);
    top8s.className = 'extra-info';
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
      createPages(players.length);
    });
}

document.addEventListener('DOMContentLoaded', () => {
  getPlayers();
});
