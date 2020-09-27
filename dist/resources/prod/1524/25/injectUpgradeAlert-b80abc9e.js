import{u as a,j as s,H as e,a4 as o,a as t}from"./calfSystem-71b9378d.js"
import{n,d as p,p as d}from"./parseGoldUpgrades-afb2ef55.js"
function f(a){t(3,d,[a])}function r(){const s=e("lastUpgradeCheck")
s&&o<s||a({cmd:"points",type:1}).then(f)}function c(){s()&&n()&&(e("needToDoUpgrade")?p():r())}export default c
//# sourceMappingURL=injectUpgradeAlert-b80abc9e.js.map
