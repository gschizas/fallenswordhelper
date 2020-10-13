import{u as a,j as s,H as o,a4 as t,a as e}from"./calfSystem-964f4fc9.js"
import{n,d as p,p as d}from"./parseGoldUpgrades-1618364d.js"
function f(a){e(3,d,[a])}function r(){const s=o("lastUpgradeCheck")
s&&t<s||a({cmd:"points",type:1}).then(f)}function c(){s()&&n()&&(o("needToDoUpgrade")?p():r())}export default c
//# sourceMappingURL=injectUpgradeAlert-1b176e26.js.map
