import{u as a,j as s,H as e,a7 as o,a as t}from"./calfSystem-38898f3e.js"
import{n,d as p,p as r}from"./parseGoldUpgrades-492e3b7a.js"
function d(a){t(3,r,[a])}function f(){const s=e("lastUpgradeCheck")
s&&o<s||a({cmd:"points",type:1}).then(d)}function c(){s()&&n()&&(e("needToDoUpgrade")?p():f())}export default c
//# sourceMappingURL=injectUpgradeAlert-4e7ca281.js.map
