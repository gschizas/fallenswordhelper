import getTextTrim from '../../common/getTextTrim';
import querySelectorArray from '../../common/querySelectorArray';

let transform;

function buildTransform() {
  if (!transform) {
    transform = new RegExp(
      'Skill ([\\w ]*) level (\\d*) was activated on \'(\\w*)\'|' +
      'The skill ([\\w ]*) of (current or higher ' +
      'level is currently active) on \'(\\w*)\'|' +
      'Player \'(\\w*)\' (has set their preferences to block ' +
      'the skill) \'([\\w ]*)\' from being cast on them.'
    );
  }
}

function meta(report) {
  return transform.exec(report);
}

export default function buffReportParser(scope) {
  buildTransform();
  const buffsAttempted = querySelectorArray('#quickbuff-report font', scope)
    .map(getTextTrim).map(meta);
  return buffsAttempted;
}
