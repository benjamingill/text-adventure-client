export default function World() {
  this.addItemToInventory = jest.fn();

  this.findItemsInInventory = jest.fn();

  this.findItemsInRoom = jest.fn();

  this.getItem = jest.fn();

  this.getItemsFromItem = jest.fn();

  this.getItemsFromRoom = jest.fn();

  this.getRoom = jest.fn();

  this.removeItemFromRoom = jest.fn();
}
