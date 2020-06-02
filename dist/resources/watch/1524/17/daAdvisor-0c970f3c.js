import { g as guild } from './guild-6a11d62e.js';

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
//# sourceMappingURL=daAdvisor-0c970f3c.js.map
