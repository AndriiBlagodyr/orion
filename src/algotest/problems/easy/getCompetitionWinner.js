// O(N) - Time, O(k) Space, where N - number of gqmes, k - number of teams.
const competitions = [
  ['HTML', 'C#'],
  ['C#', 'Python'],
  ['Python', 'HTML'],
];
const resultsGames = [0, 0, 1];

const getWinner = (games, results) => {
  let winner = '';
  const hashMap = {};
  for (let i = 0; i < games.length; i++) {
    const element = games[i];
    const index = results[i];
    const winnerGame = index === 0 ? element[1] : element[0];
    if (hashMap[winnerGame]) {
      hashMap[winnerGame] = hashMap[winnerGame] + 3;
    } else {
      hashMap[winnerGame] = 3;
    }
    winner = hashMap[winner] > hashMap[winnerGame] ? winner : winnerGame;
  }
  return winner;
};

console.log(getWinner(competitions, resultsGames));




