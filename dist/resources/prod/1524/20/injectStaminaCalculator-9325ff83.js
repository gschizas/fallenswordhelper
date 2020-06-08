import{I as t,y as a,i as s}from"./calfSystem-03970067.js"
import{i as n}from"./intValue-0d844fc4.js"
import{v as i}from"./valueText-49d1445b.js"
import"./padZ-5ea37ccb.js"
import{t as o,a as r}from"./timeBox-7c53df98.js"
export default function(){const e=t("stat-stamina-nextGain")
if(0===e.length)return
const m=a("statbar-stamina-tooltip-stamina"),f=function(a){return/([,0-9]+)\s\/\s([,0-9]+)/.exec(i(t("stat-name",a)))}(m)
s(m,function(t,a){return'<dt class="stat-stamina-nextHuntTime">Max Stam At</dt>'+o(i(t),Math.floor((n(a[2])-n(a[1]))/r("stat-stamina-gainPerHour")))}(e,f))}
//# sourceMappingURL=injectStaminaCalculator-9325ff83.js.map
