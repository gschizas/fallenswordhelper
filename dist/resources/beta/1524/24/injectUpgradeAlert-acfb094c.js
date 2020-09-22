import{u as a,j as s,H as o,a4 as t,a as e}from"./calfSystem-019a589c.js"
import{n,d as p,p as f}from"./parseGoldUpgrades-f975f14a.js"
function r(a){e(3,f,[a])}function c(){const s=o("lastUpgradeCheck")
s&&t<s||a({cmd:"points",type:1}).then(r)}function d(){s()&&n()&&(o("needToDoUpgrade")?p():c())}export default d
//# sourceMappingURL=injectUpgradeAlert-acfb094c.js.map
