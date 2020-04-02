export default function dropItemLoader() {
  import('./injectProfileDropItems').then(m => m.default());
}
