import{u as a,j as s,H as o,a7 as t,a as e}from"./calfSystem-02c48ff5.js"
import{n,d as p,p as f}from"./parseGoldUpgrades-72635744.js"
function r(a){e(3,f,[a])}function c(){const s=o("lastUpgradeCheck")
s&&t<s||a({cmd:"points",type:1}).then(r)}function d(){s()&&n()&&(o("needToDoUpgrade")?p():c())}export default d
//# sourceMappingURL=injectUpgradeAlert-43563183.js.map
