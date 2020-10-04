import{u as a,j as s,H as o,a5 as t,a as e}from"./calfSystem-70c7a660.js"
import{n,d as p,p as r}from"./parseGoldUpgrades-951328a2.js"
function c(a){e(3,r,[a])}function d(){const s=o("lastUpgradeCheck")
s&&t<s||a({cmd:"points",type:1}).then(c)}function f(){s()&&n()&&(o("needToDoUpgrade")?p():d())}export default f
//# sourceMappingURL=injectUpgradeAlert-c000e771.js.map
