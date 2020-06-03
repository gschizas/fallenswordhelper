import{F as t,x as a,i as s}from"./calfSystem-8b6534a5.js"
import{i as n}from"./intValue-bb1f2246.js"
import{v as i}from"./valueText-ed45d645.js"
import"./padZ-1409dbd9.js"
import{t as o,a as r}from"./timeBox-7b4f9f92.js"
export default function(){const e=t("stat-stamina-nextGain")
if(0===e.length)return
const m=a("statbar-stamina-tooltip-stamina"),f=function(a){return/([,0-9]+)\s\/\s([,0-9]+)/.exec(i(t("stat-name",a)))}(m)
s(m,function(t,a){return'<dt class="stat-stamina-nextHuntTime">Max Stam At</dt>'+o(i(t),Math.floor((n(a[2])-n(a[1]))/r("stat-stamina-gainPerHour")))}(e,f))}
//# sourceMappingURL=injectStaminaCalculator-6d2c88c0.js.map
