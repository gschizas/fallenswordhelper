import{u as a,j as s,H as e,a4 as o,a as t}from"./calfSystem-47fc08ae.js"
import{n,d as p,p as d}from"./parseGoldUpgrades-8b56827d.js"
function r(a){t(3,d,[a])}function c(){const s=e("lastUpgradeCheck")
s&&o<s||a({cmd:"points",type:1}).then(r)}function f(){s()&&n()&&(e("needToDoUpgrade")?p():c())}export default f
//# sourceMappingURL=injectUpgradeAlert-2d8fd1b5.js.map
