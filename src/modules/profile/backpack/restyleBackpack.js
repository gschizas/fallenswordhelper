import './restyleBackpack.css';
import getElementById from '../../common/getElement';

export default function restyleBackpack() {
  const bpBack = getElementById('backpack');
  bpBack.className = 'fshBackpack';
  bpBack.removeAttribute('style');
}
