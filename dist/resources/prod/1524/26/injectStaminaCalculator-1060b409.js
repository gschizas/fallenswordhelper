import{J as t,y as a,i as s}from"./calfSystem-a5fc99d4.js"
import{i as n}from"./intValue-e4cdd281.js"
import{v as e}from"./valueText-4ea8a5e7.js"
import"./padZ-f9e33f92.js"
import{t as i,a as o}from"./timeBox-6b7c7514.js"
function r(){const r=t("stat-stamina-nextGain")
if(0===r.length)return
const m=a("statbar-stamina-tooltip-stamina"),f=function(a){return/([,0-9]+)\s\/\s([,0-9]+)/.exec(e(t("stat-name",a)))}(m)
s(m,function(t,a){return'<dt class="stat-stamina-nextHuntTime">Max Stam At</dt>'+i(e(t),Math.floor((n(a[2])-n(a[1]))/o("stat-stamina-gainPerHour")))}(r,f))}export default r
//# sourceMappingURL=injectStaminaCalculator-1060b409.js.map
