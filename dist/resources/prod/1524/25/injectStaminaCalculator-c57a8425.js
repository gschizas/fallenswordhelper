import{J as t,y as a,i as s}from"./calfSystem-71b9378d.js"
import{i as n}from"./intValue-65d3c36c.js"
import{v as i}from"./valueText-4f638fd7.js"
import"./padZ-0c2f5370.js"
import{t as o,a as r}from"./timeBox-536f8191.js"
function m(){const m=t("stat-stamina-nextGain")
if(0===m.length)return
const e=a("statbar-stamina-tooltip-stamina"),f=function(a){return/([,0-9]+)\s\/\s([,0-9]+)/.exec(i(t("stat-name",a)))}(e)
s(e,function(t,a){return'<dt class="stat-stamina-nextHuntTime">Max Stam At</dt>'+o(i(t),Math.floor((n(a[2])-n(a[1]))/r("stat-stamina-gainPerHour")))}(m,f))}export default m
//# sourceMappingURL=injectStaminaCalculator-c57a8425.js.map
