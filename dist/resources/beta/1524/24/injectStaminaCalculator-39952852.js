import{J as t,y as a,i as s}from"./calfSystem-019a589c.js"
import{i as n}from"./intValue-44683b42.js"
import{v as i}from"./valueText-5851fcdc.js"
import"./padZ-cba8efb8.js"
import{t as o,a as r}from"./timeBox-3c021154.js"
function e(){const e=t("stat-stamina-nextGain")
if(0===e.length)return
const m=a("statbar-stamina-tooltip-stamina"),c=function(a){return/([,0-9]+)\s\/\s([,0-9]+)/.exec(i(t("stat-name",a)))}(m)
s(m,function(t,a){return'<dt class="stat-stamina-nextHuntTime">Max Stam At</dt>'+o(i(t),Math.floor((n(a[2])-n(a[1]))/r("stat-stamina-gainPerHour")))}(e,c))}export default e
//# sourceMappingURL=injectStaminaCalculator-39952852.js.map
