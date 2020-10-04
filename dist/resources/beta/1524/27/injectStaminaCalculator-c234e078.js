import{J as t,y as a,i as s}from"./calfSystem-70c7a660.js"
import{i as n}from"./intValue-ef353ded.js"
import{v as i}from"./valueText-6c1d3d77.js"
import"./padZ-b87d0d09.js"
import{t as o,a as e}from"./timeBox-09c84df2.js"
function r(){const r=t("stat-stamina-nextGain")
if(0===r.length)return
const m=a("statbar-stamina-tooltip-stamina"),f=function(a){return/([,0-9]+)\s\/\s([,0-9]+)/.exec(i(t("stat-name",a)))}(m)
f&&s(m,function(t,a){return'<dt class="stat-stamina-nextHuntTime">Max Stam At</dt>'+o(i(t),Math.floor((n(a[2])-n(a[1]))/e("stat-stamina-gainPerHour")))}(r,f))}export default r
//# sourceMappingURL=injectStaminaCalculator-c234e078.js.map
