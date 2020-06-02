import{F as t,x as a,i as s}from"./calfSystem-9554b525.js"
import{i as n}from"./intValue-bb872327.js"
import{v as i}from"./valueText-350043d0.js"
import"./padZ-484af22c.js"
import{t as o,a as r}from"./timeBox-f089d98f.js"
export default function(){const m=t("stat-stamina-nextGain")
if(0===m.length)return
const e=a("statbar-stamina-tooltip-stamina"),f=function(a){return/([,0-9]+)\s\/\s([,0-9]+)/.exec(i(t("stat-name",a)))}(e)
s(e,function(t,a){return'<dt class="stat-stamina-nextHuntTime">Max Stam At</dt>'+o(i(t),Math.floor((n(a[2])-n(a[1]))/r("stat-stamina-gainPerHour")))}(m,f))}
//# sourceMappingURL=injectStaminaCalculator-b96a2b27.js.map
