import{u as a,j as s,H as e,a4 as o,a as t}from"./calfSystem-7aee5245.js"
import{n,d as p,p as f}from"./parseGoldUpgrades-41386f5f.js"
function r(a){t(3,f,[a])}function d(){const s=e("lastUpgradeCheck")
s&&o<s||a({cmd:"points",type:1}).then(r)}function c(){s()&&n()&&(e("needToDoUpgrade")?p():d())}export default c
//# sourceMappingURL=injectUpgradeAlert-959d174e.js.map
