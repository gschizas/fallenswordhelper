import guild from './guild';

export default function advisorView(period) {
  return guild({subcmd: 'advisor', subcmd2: 'view', period: period});
}
