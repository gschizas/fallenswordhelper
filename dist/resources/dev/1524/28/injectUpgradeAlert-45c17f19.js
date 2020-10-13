import{u as a,j as s,H as o,a7 as t,a as e}from"./calfSystem-b136673a.js"
import{n,d as p,p as r}from"./parseGoldUpgrades-b3afa9c0.js"
function c(a){e(3,r,[a])}function d(){const s=o("lastUpgradeCheck")
s&&t<s||a({cmd:"points",type:1}).then(c)}function f(){s()&&n()&&(o("needToDoUpgrade")?p():d())}export default f
//# sourceMappingURL=injectUpgradeAlert-45c17f19.js.map
