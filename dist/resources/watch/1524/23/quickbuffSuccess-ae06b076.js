import { w as callApp } from './calfSystem-2b1fed3f.js';

function quickbuff(userAry, buffAry) {
  return callApp({
    cmd: 'quickbuff',
    subcmd: 'activate',
    username: userAry,
    skill: buffAry,
  });
}

// import { $dataAccess } from './_dataAccess';

function daQuickbuff(userAry, buffAry) {
  // return $dataAccess(appQb, ajaxQb, userAry, buffAry);
  return quickbuff(userAry, buffAry);
}

function quickbuffSuccess(result) {
  return result.s && result.r[0].casts.length === 1;
}

export { daQuickbuff as d, quickbuffSuccess as q };
//# sourceMappingURL=quickbuffSuccess-ae06b076.js.map
