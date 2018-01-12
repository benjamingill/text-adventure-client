const initial = {
  currentRoom: 1,
  score: 0,
  moves: 0,
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
    return this.player.currentRoom;
  }

  setCurrentRoom(id) {
    this.player.currentRoom = id;
    setPlayer(this.player);
  }
}
