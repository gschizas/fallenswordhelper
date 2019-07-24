import guild from './guild';

export default function log(logId, latest, limit) {
  return guild({
    subcmd: 'log',
    log_id: logId,
    latest: latest,
    limit: limit
  });
}
