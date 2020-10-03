import{u as a,j as s,H as o,a7 as t,a as e}from"./calfSystem-4991bf5b.js"
import{n,d as p,p as d}from"./parseGoldUpgrades-146cd026.js"
function r(a){e(3,d,[a])}function c(){const s=o("lastUpgradeCheck")
s&&t<s||a({cmd:"points",type:1}).then(r)}function f(){s()&&n()&&(o("needToDoUpgrade")?p():c())}export default f
//# sourceMappingURL=injectUpgradeAlert-c70a4a82.js.map
