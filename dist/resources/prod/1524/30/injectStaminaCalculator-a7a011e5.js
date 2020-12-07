import{J as t,y as a,i as s}from"./calfSystem-6459f18a.js"
import{i as n}from"./intValue-e8157483.js"
import{v as i}from"./valueText-29c7adc9.js"
import"./padZ-bd3dfcf9.js"
import{t as o,a as r}from"./timeBox-0778505a.js"
function e(){const e=t("stat-stamina-nextGain")
if(0===e.length)return
const m=a("statbar-stamina-tooltip-stamina"),f=function(a){return/([,0-9]+)\s\/\s([,0-9]+)/.exec(i(t("stat-name",a)))}(m)
f&&s(m,function(t,a){return'<dt class="stat-stamina-nextHuntTime">Max Stam At</dt>'+o(i(t),Math.floor((n(a[2])-n(a[1]))/r("stat-stamina-gainPerHour")))}(e,f))}export default e
//# sourceMappingURL=injectStaminaCalculator-a7a011e5.js.map
