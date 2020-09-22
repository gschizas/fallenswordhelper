import{J as t,y as a,i as s}from"./calfSystem-38898f3e.js"
import{i as n}from"./intValue-44683b42.js"
import{v as i}from"./valueText-df2d502e.js"
import"./padZ-cba8efb8.js"
import{t as e,a as o}from"./timeBox-90463736.js"
function r(){const r=t("stat-stamina-nextGain")
if(0===r.length)return
const m=a("statbar-stamina-tooltip-stamina"),f=function(a){return/([,0-9]+)\s\/\s([,0-9]+)/.exec(i(t("stat-name",a)))}(m)
s(m,function(t,a){return'<dt class="stat-stamina-nextHuntTime">Max Stam At</dt>'+e(i(t),Math.floor((n(a[2])-n(a[1]))/o("stat-stamina-gainPerHour")))}(r,f))}export default r
//# sourceMappingURL=injectStaminaCalculator-a0fb8fd2.js.map
