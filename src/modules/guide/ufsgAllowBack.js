import interceptSubmit from '../common/interceptSubmit';

export default function ufsgAllowBack() {
  interceptSubmit(document.body);
}
