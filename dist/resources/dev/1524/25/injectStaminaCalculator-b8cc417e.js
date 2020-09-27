import{J as t,y as a,i as s}from"./calfSystem-69dd5601.js"
import{i as n}from"./intValue-65d3c36c.js"
import{v as i}from"./valueText-1de8e1c5.js"
import"./padZ-0c2f5370.js"
import{t as e,a as o}from"./timeBox-fd25e533.js"
function r(){const r=t("stat-stamina-nextGain")
if(0===r.length)return
const m=a("statbar-stamina-tooltip-stamina"),f=function(a){return/([,0-9]+)\s\/\s([,0-9]+)/.exec(i(t("stat-name",a)))}(m)
s(m,function(t,a){return'<dt class="stat-stamina-nextHuntTime">Max Stam At</dt>'+e(i(t),Math.floor((n(a[2])-n(a[1]))/o("stat-stamina-gainPerHour")))}(r,f))}export default r
//# sourceMappingURL=injectStaminaCalculator-b8cc417e.js.map
