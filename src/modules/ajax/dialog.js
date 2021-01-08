import dialogMsg from '../common/dialogMsg';

export default function dialog(data) {
  if (data.r !== 0) {
    dialogMsg(data.m);
  }
  return data;
}
