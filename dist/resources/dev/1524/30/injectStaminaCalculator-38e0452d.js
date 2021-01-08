import{J as t,y as a,i as s}from"./calfSystem-54df10e3.js"
import{i as n}from"./intValue-e8157483.js"
import{v as i}from"./valueText-90531bb6.js"
import"./padZ-bd3dfcf9.js"
import{t as o,a as e}from"./timeBox-90286417.js"
function r(){const r=t("stat-stamina-nextGain")
if(0===r.length)return
const m=a("statbar-stamina-tooltip-stamina"),f=function(a){return/([,0-9]+)\s\/\s([,0-9]+)/.exec(i(t("stat-name",a)))}(m)
f&&s(m,function(t,a){return'<dt class="stat-stamina-nextHuntTime">Max Stam At</dt>'+o(i(t),Math.floor((n(a[2])-n(a[1]))/e("stat-stamina-gainPerHour")))}(r,f))}export default r
//# sourceMappingURL=injectStaminaCalculator-38e0452d.js.map
