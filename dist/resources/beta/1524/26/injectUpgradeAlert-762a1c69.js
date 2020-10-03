import{u as a,j as s,H as e,a4 as o,a as t}from"./calfSystem-cf4d22a7.js"
import{n,d as p,p as c}from"./parseGoldUpgrades-ec9858f1.js"
function d(a){t(3,c,[a])}function f(){const s=e("lastUpgradeCheck")
s&&o<s||a({cmd:"points",type:1}).then(d)}function r(){s()&&n()&&(e("needToDoUpgrade")?p():f())}export default r
//# sourceMappingURL=injectUpgradeAlert-762a1c69.js.map
