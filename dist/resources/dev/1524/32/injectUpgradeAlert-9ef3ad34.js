import{u as a,j as s,H as o,a6 as t,a as e}from"./calfSystem-19a5d332.js"
import{n,d,p}from"./parseGoldUpgrades-d870f3af.js"
function f(a){e(3,p,[a])}function r(){const s=o("lastUpgradeCheck")
s&&t<s||a({cmd:"points",type:1}).then(f)}function c(){s()&&n()&&(o("needToDoUpgrade")?d():r())}export default c
//# sourceMappingURL=injectUpgradeAlert-9ef3ad34.js.map
