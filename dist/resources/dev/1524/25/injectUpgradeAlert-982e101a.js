import{u as a,j as s,H as o,a7 as t,a as e}from"./calfSystem-69dd5601.js"
import{n,d,p}from"./parseGoldUpgrades-99367825.js"
function r(a){e(3,p,[a])}function c(){const s=o("lastUpgradeCheck")
s&&t<s||a({cmd:"points",type:1}).then(r)}function f(){s()&&n()&&(o("needToDoUpgrade")?d():c())}export default f
//# sourceMappingURL=injectUpgradeAlert-982e101a.js.map
