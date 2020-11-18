import{u as a,j as s,H as o,a4 as t,a as e}from"./calfSystem-f9a27018.js"
import{n,d,p}from"./parseGoldUpgrades-5dd2b5b0.js"
function r(a){e(3,p,[a])}function f(){const s=o("lastUpgradeCheck")
s&&t<s||a({cmd:"points",type:1}).then(r)}function c(){s()&&n()&&(o("needToDoUpgrade")?d():f())}export default c
//# sourceMappingURL=injectUpgradeAlert-83114ab4.js.map
