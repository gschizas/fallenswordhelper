import{t as a,j as s,D as t,a7 as e,a as o}from"./calfSystem-5545a3e6.js"
import{n,d,p}from"./parseGoldUpgrades-29c0d76d.js"
function r(a){o(3,p,[a])}function c(){const s=t("lastUpgradeCheck")
s&&e<s||a({cmd:"points",type:1}).then(r)}export default function(){s()&&n()&&(t("needToDoUpgrade")?d():c())}
//# sourceMappingURL=injectUpgradeAlert-8a10f651.js.map
