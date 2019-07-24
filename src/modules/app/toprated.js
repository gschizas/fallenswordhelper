import callApp from './callApp';

// Can't use this yet, there's no VL
export default function toprated(subcmd) {
  return callApp({cmd: 'toprated', subcmd: subcmd});
}
