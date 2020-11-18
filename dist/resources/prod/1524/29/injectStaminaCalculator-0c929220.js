import{J as t,y as a,i as s}from"./calfSystem-57628ebe.js"
import{i as n}from"./intValue-f94761c7.js"
import{v as e}from"./valueText-a430d398.js"
import"./padZ-a3ed1fe1.js"
import{t as i,a as o}from"./timeBox-83bc5a5f.js"
function r(){const r=t("stat-stamina-nextGain")
if(0===r.length)return
const m=a("statbar-stamina-tooltip-stamina"),f=function(a){return/([,0-9]+)\s\/\s([,0-9]+)/.exec(e(t("stat-name",a)))}(m)
f&&s(m,function(t,a){return'<dt class="stat-stamina-nextHuntTime">Max Stam At</dt>'+i(e(t),Math.floor((n(a[2])-n(a[1]))/o("stat-stamina-gainPerHour")))}(r,f))}export default r
//# sourceMappingURL=injectStaminaCalculator-0c929220.js.map
