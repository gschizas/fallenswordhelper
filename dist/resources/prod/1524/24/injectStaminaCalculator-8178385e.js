import{J as t,y as a,i as s}from"./calfSystem-ec854151.js"
import{i as n}from"./intValue-44683b42.js"
import{v as i}from"./valueText-0f3877db.js"
import"./padZ-cba8efb8.js"
import{t as o,a as e}from"./timeBox-84b97331.js"
function r(){const r=t("stat-stamina-nextGain")
if(0===r.length)return
const m=a("statbar-stamina-tooltip-stamina"),f=function(a){return/([,0-9]+)\s\/\s([,0-9]+)/.exec(i(t("stat-name",a)))}(m)
s(m,function(t,a){return'<dt class="stat-stamina-nextHuntTime">Max Stam At</dt>'+o(i(t),Math.floor((n(a[2])-n(a[1]))/e("stat-stamina-gainPerHour")))}(r,f))}export default r
//# sourceMappingURL=injectStaminaCalculator-8178385e.js.map
