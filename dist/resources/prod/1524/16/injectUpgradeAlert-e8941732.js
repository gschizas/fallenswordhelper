import{t as a,j as s,D as t,a2 as e,a as o}from"./calfSystem-be09bdff.js"
import{n,d as f,p}from"./parseGoldUpgrades-f2c0a632.js"
function d(a){o(3,p,[a])}function r(){const s=t("lastUpgradeCheck")
s&&e<s||a({cmd:"points",type:1}).then(d)}export default function(){s()&&n()&&(t("needToDoUpgrade")?f():r())}
//# sourceMappingURL=injectUpgradeAlert-e8941732.js.map
