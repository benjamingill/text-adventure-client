const initial = {
  room: 4,
  score: 0,
  moves: 0,
  brief: false,
};

const setPlayer = values => localStorage.setItem('player', JSON.stringify(values));

export default class Player {
  constructor(initialValues = initial) {
    if (!localStorage.getItem('player')) {
      setPlayer(initialValues);
    }
    this.player = JSON.parse(localStorage.getItem('player'));
  }

  getCurrentRoom() {
    return this.player.room;
  }

  getCurrentScore() {
    return this.player.score;
  }

  getCurrentMoves() {
    return this.player.moves;
  }

  getIsBriefMode() {
    return this.player.brief;
  }

  setCurrentRoom(id) {
    this.player.room = id;
    setPlayer(this.player);
  }
}
