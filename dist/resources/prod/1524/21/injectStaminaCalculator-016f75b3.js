import{I as t,y as a,i as s}from"./calfSystem-2741d97b.js"
import{i as n}from"./intValue-1a593541.js"
import{v as i}from"./valueText-9aacf9d4.js"
import"./padZ-7a081566.js"
import{t as o,a as r}from"./timeBox-133362e6.js"
export default function(){const e=t("stat-stamina-nextGain")
if(0===e.length)return
const m=a("statbar-stamina-tooltip-stamina"),f=function(a){return/([,0-9]+)\s\/\s([,0-9]+)/.exec(i(t("stat-name",a)))}(m)
s(m,function(t,a){return'<dt class="stat-stamina-nextHuntTime">Max Stam At</dt>'+o(i(t),Math.floor((n(a[2])-n(a[1]))/r("stat-stamina-gainPerHour")))}(e,f))}
//# sourceMappingURL=injectStaminaCalculator-016f75b3.js.map
