import cmdExport from './export';

export default function inventory() {
  return cmdExport({subcmd: 'inventory'});
}
