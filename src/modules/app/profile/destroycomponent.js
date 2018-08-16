import profile from './profile';

export default function destroyComponent(componentIdAry) {
  return profile({subcmd: 'destroycomponent', removeIndex: componentIdAry});
}
