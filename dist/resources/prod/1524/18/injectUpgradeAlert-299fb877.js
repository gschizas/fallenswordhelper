import{t as a,j as s,D as t,a2 as o,a as e}from"./calfSystem-8b6534a5.js"
import{n,d as p,p as r}from"./parseGoldUpgrades-9c4554fa.js"
function c(a){e(3,r,[a])}function d(){const s=t("lastUpgradeCheck")
s&&o<s||a({cmd:"points",type:1}).then(c)}export default function(){s()&&n()&&(t("needToDoUpgrade")?p():d())}
//# sourceMappingURL=injectUpgradeAlert-299fb877.js.map
