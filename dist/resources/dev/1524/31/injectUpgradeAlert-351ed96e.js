import{u as a,j as s,H as e,a5 as o,a as t}from"./calfSystem-393ab895.js"
import{n,d,p}from"./parseGoldUpgrades-2f1debcd.js"
function r(a){t(3,p,[a])}function c(){const s=e("lastUpgradeCheck")
s&&o<s||a({cmd:"points",type:1}).then(r)}function f(){s()&&n()&&(e("needToDoUpgrade")?d():c())}export default f
//# sourceMappingURL=injectUpgradeAlert-351ed96e.js.map
