import{t as a,j as s,D as t,a7 as o,a as d}from"./calfSystem-d49dbbd3.js"
import{n as e,d as n,p}from"./parseGoldUpgrades-9d647a19.js"
function r(a){d(3,p,[a])}function c(){const s=t("lastUpgradeCheck")
s&&o<s||a({cmd:"points",type:1}).then(r)}export default function(){s()&&e()&&(t("needToDoUpgrade")?n():c())}
//# sourceMappingURL=injectUpgradeAlert-ca909d6b.js.map
