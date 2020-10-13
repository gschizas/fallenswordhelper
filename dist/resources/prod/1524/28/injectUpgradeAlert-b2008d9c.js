import{u as a,j as s,H as o,a4 as t,a as e}from"./calfSystem-a5da5210.js"
import{n,d,p}from"./parseGoldUpgrades-62d39064.js"
function r(a){e(3,p,[a])}function c(){const s=o("lastUpgradeCheck")
s&&t<s||a({cmd:"points",type:1}).then(r)}function f(){s()&&n()&&(o("needToDoUpgrade")?d():c())}export default f
//# sourceMappingURL=injectUpgradeAlert-b2008d9c.js.map
