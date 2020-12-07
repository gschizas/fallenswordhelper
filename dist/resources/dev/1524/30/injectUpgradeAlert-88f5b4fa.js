import{u as a,j as s,H as e,a7 as o,a as t}from"./calfSystem-54df10e3.js"
import{n,d as p,p as d}from"./parseGoldUpgrades-15e6237b.js"
function r(a){t(3,d,[a])}function f(){const s=e("lastUpgradeCheck")
s&&o<s||a({cmd:"points",type:1}).then(r)}function c(){s()&&n()&&(e("needToDoUpgrade")?p():f())}export default c
//# sourceMappingURL=injectUpgradeAlert-88f5b4fa.js.map
