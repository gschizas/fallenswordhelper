import { g as guild } from './guild-e8cc7899.js';

function advisorView(period) {
  return guild({ subcmd: 'advisor', subcmd2: 'view', period });
}

// import { $dataAccess } from './_dataAccess';
// import viewAdvisor from './fallbacks/viewAdvisor';

function daAdvisor(period) {
  // return $dataAccess(advisorView, viewAdvisor, period);
  return advisorView(period);
}

export { daAdvisor as d };
//# sourceMappingURL=daAdvisor-3ff7e341.js.map
