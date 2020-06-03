import{F as t,x as a,i as s}from"./calfSystem-57340987.js"
import{i as n}from"./intValue-e99f58ac.js"
import{v as i}from"./valueText-2c905a41.js"
import"./padZ-4a0f9130.js"
import{t as o,a as r}from"./timeBox-0536c83b.js"
export default function(){const e=t("stat-stamina-nextGain")
if(0===e.length)return
const m=a("statbar-stamina-tooltip-stamina"),f=function(a){return/([,0-9]+)\s\/\s([,0-9]+)/.exec(i(t("stat-name",a)))}(m)
s(m,function(t,a){return'<dt class="stat-stamina-nextHuntTime">Max Stam At</dt>'+o(i(t),Math.floor((n(a[2])-n(a[1]))/r("stat-stamina-gainPerHour")))}(e,f))}
//# sourceMappingURL=injectStaminaCalculator-136dff76.js.map
