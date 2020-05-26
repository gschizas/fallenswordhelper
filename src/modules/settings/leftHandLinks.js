import bunchOfSimple from './bunchOfSimple';
import theLinks from './leftHandLinks.json';

export default function leftHandLinks() {
  return '<tr><th colspan="2"><b>Left Hand Menu Additional Links</b></th></tr>'
    + '<tr><th colspan="2">Warning: Changes to the left hand menu have a '
    + 'significant impact on page load performance</th></tr>'
    + `${bunchOfSimple(theLinks)}`;
}
