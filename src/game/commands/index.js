import * as environment from './environment';
import * as movement from './movement';
import * as system from './system';
import help from './help';

const commands = [
  movement.north,
  movement.south,
  movement.east,
  movement.west,
  movement.up,
  movement.down,
  environment.look,
  environment.lookAt,
  system.commandBrief,
  system.clear,
  system.load,
  system.save,
  system.commandDebug,
  system.debugShowState,
  system.debugShowRoom,
  help,
  system.invalidCommand,
];

export default commands;
