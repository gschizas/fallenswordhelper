import cmdExport from './cmdExport';

export default function inventory() {
  return cmdExport({ subcmd: 'inventory' });
}
