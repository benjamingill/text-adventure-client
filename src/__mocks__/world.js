export default function World() {
  this.addItemToInventory = jest.fn();

  this.addItemToRoom = jest.fn();

  this.findItemsInInventory = jest.fn();

  this.findItemsInRoom = jest.fn();

  this.getBriefMode = jest.fn();

  this.getCurrentRoom = jest.fn();

  this.getDebugMode = jest.fn();

  this.getItemsFromInventory = jest.fn();

  this.getScore = jest.fn();

  this.getMoves = jest.fn();

  this.getItem = jest.fn();

  this.getItemsFromItem = jest.fn();

  this.getItemsFromRoom = jest.fn();

  this.getRoom = jest.fn();

  this.removeItemFromInventory = jest.fn();

  this.removeItemFromRoom = jest.fn();

  this.save = jest.fn();

  this.saveUnhandledCommand = jest.fn();

  this.getBriefMode = jest.fn();

  this.setCurrentRoom = jest.fn();

  this.setDebugMode = jest.fn();
}
