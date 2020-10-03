import{u as a,j as s,H as o,a4 as t,a as e}from"./calfSystem-a5fc99d4.js"
import{n,d as p,p as c}from"./parseGoldUpgrades-96c6b432.js"
function d(a){e(3,c,[a])}function r(){const s=o("lastUpgradeCheck")
s&&t<s||a({cmd:"points",type:1}).then(d)}function f(){s()&&n()&&(o("needToDoUpgrade")?p():r())}export default f
//# sourceMappingURL=injectUpgradeAlert-ec71a221.js.map
