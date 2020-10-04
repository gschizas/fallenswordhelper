import{u as a,j as s,H as e,a8 as o,a as t}from"./calfSystem-ec5e5725.js"
import{n,d as p,p as d}from"./parseGoldUpgrades-442d3ab4.js"
function r(a){t(3,d,[a])}function c(){const s=e("lastUpgradeCheck")
s&&o<s||a({cmd:"points",type:1}).then(r)}function f(){s()&&n()&&(e("needToDoUpgrade")?p():c())}export default f
//# sourceMappingURL=injectUpgradeAlert-bde39737.js.map
