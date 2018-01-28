import callApp from '../../callApp';
// import failStub from '../../failStub';

export default function recall(invId, playerId, mode) {
  // return failStub();
  return callApp({
    cmd: 'guild',
    subcmd: 'inventory',
    subcmd2: 'recall',
    id: invId, // + 10000000,
    player_id: playerId,
    mode: mode
  });
}
