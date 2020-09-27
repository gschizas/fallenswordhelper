import{u as a,j as s,H as o,a4 as t,a as e}from"./calfSystem-d3aab5a8.js"
import{n,d,p}from"./parseGoldUpgrades-7bcf5d6a.js"
function r(a){e(3,p,[a])}function c(){const s=o("lastUpgradeCheck")
s&&t<s||a({cmd:"points",type:1}).then(r)}function f(){s()&&n()&&(o("needToDoUpgrade")?d():c())}export default f
//# sourceMappingURL=injectUpgradeAlert-7c87ff2c.js.map
