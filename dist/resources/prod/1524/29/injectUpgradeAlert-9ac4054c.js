import{u as a,j as s,H as e,a4 as o,a as t}from"./calfSystem-57628ebe.js"
import{n,d as p,p as r}from"./parseGoldUpgrades-9753a8e6.js"
function d(a){t(3,r,[a])}function c(){const s=e("lastUpgradeCheck")
s&&o<s||a({cmd:"points",type:1}).then(d)}function f(){s()&&n()&&(e("needToDoUpgrade")?p():c())}export default f
//# sourceMappingURL=injectUpgradeAlert-9ac4054c.js.map
