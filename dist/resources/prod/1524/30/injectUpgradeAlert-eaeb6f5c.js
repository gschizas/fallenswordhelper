import{u as a,j as s,H as o,a4 as t,a as e}from"./calfSystem-6459f18a.js"
import{n,d as p,p as r}from"./parseGoldUpgrades-b6840a77.js"
function d(a){e(3,r,[a])}function f(){const s=o("lastUpgradeCheck")
s&&t<s||a({cmd:"points",type:1}).then(d)}function c(){s()&&n()&&(o("needToDoUpgrade")?p():f())}export default c
//# sourceMappingURL=injectUpgradeAlert-eaeb6f5c.js.map
