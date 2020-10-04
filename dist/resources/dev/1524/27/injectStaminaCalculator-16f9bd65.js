import{J as t,y as a,i as s}from"./calfSystem-ec5e5725.js"
import{i as n}from"./intValue-ef353ded.js"
import{v as e}from"./valueText-f1c6f878.js"
import"./padZ-b87d0d09.js"
import{t as i,a as o}from"./timeBox-94e84afa.js"
function r(){const r=t("stat-stamina-nextGain")
if(0===r.length)return
const m=a("statbar-stamina-tooltip-stamina"),f=function(a){return/([,0-9]+)\s\/\s([,0-9]+)/.exec(e(t("stat-name",a)))}(m)
f&&s(m,function(t,a){return'<dt class="stat-stamina-nextHuntTime">Max Stam At</dt>'+i(e(t),Math.floor((n(a[2])-n(a[1]))/o("stat-stamina-gainPerHour")))}(r,f))}export default r
//# sourceMappingURL=injectStaminaCalculator-16f9bd65.js.map
