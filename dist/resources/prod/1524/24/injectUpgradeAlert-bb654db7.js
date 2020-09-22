import{u as a,j as s,H as e,a4 as o,a as t}from"./calfSystem-ec854151.js"
import{n,d as p,p as c}from"./parseGoldUpgrades-5facb2f3.js"
function f(a){t(3,c,[a])}function r(){const s=e("lastUpgradeCheck")
s&&o<s||a({cmd:"points",type:1}).then(f)}function d(){s()&&n()&&(e("needToDoUpgrade")?p():r())}export default d
//# sourceMappingURL=injectUpgradeAlert-bb654db7.js.map
