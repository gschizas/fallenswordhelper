import getValue from '../../system/getValue';

export default function expandMenu(section) {
  if (getValue('expandMenuOnKeyPress')) {
    localStorage.setItem('hcs.nav.openIndex', section);
  }
}
