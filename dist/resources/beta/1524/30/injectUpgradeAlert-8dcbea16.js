import{u as a,j as s,H as e,a4 as o,a as t}from"./calfSystem-ebf4b17d.js"
import{n,d as p,p as d}from"./parseGoldUpgrades-99e79a94.js"
function r(a){t(3,d,[a])}function f(){const s=e("lastUpgradeCheck")
s&&o<s||a({cmd:"points",type:1}).then(r)}function c(){s()&&n()&&(e("needToDoUpgrade")?p():f())}export default c
//# sourceMappingURL=injectUpgradeAlert-8dcbea16.js.map
