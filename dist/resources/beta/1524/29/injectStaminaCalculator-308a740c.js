import{J as t,y as a,i as s}from"./calfSystem-f9a27018.js"
import{i as n}from"./intValue-f94761c7.js"
import{v as i}from"./valueText-d637a521.js"
import"./padZ-a3ed1fe1.js"
import{t as o,a as e}from"./timeBox-092a82bd.js"
function r(){const r=t("stat-stamina-nextGain")
if(0===r.length)return
const m=a("statbar-stamina-tooltip-stamina"),f=function(a){return/([,0-9]+)\s\/\s([,0-9]+)/.exec(i(t("stat-name",a)))}(m)
f&&s(m,function(t,a){return'<dt class="stat-stamina-nextHuntTime">Max Stam At</dt>'+o(i(t),Math.floor((n(a[2])-n(a[1]))/e("stat-stamina-gainPerHour")))}(r,f))}export default r
//# sourceMappingURL=injectStaminaCalculator-308a740c.js.map
