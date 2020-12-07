import{J as t,y as a,i as s}from"./calfSystem-ebf4b17d.js"
import{i as n}from"./intValue-e8157483.js"
import{v as i}from"./valueText-b6db7b96.js"
import"./padZ-bd3dfcf9.js"
import{t as e,a as o}from"./timeBox-39adca1e.js"
function r(){const r=t("stat-stamina-nextGain")
if(0===r.length)return
const m=a("statbar-stamina-tooltip-stamina"),f=function(a){return/([,0-9]+)\s\/\s([,0-9]+)/.exec(i(t("stat-name",a)))}(m)
f&&s(m,function(t,a){return'<dt class="stat-stamina-nextHuntTime">Max Stam At</dt>'+e(i(t),Math.floor((n(a[2])-n(a[1]))/o("stat-stamina-gainPerHour")))}(r,f))}export default r
//# sourceMappingURL=injectStaminaCalculator-6f81cb25.js.map
