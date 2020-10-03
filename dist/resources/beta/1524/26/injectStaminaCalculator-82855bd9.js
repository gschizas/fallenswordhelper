import{J as t,y as a,i as s}from"./calfSystem-cf4d22a7.js"
import{i as n}from"./intValue-e4cdd281.js"
import{v as i}from"./valueText-5ba89d31.js"
import"./padZ-f9e33f92.js"
import{t as o,a as e}from"./timeBox-6fc1aa94.js"
function r(){const r=t("stat-stamina-nextGain")
if(0===r.length)return
const m=a("statbar-stamina-tooltip-stamina"),f=function(a){return/([,0-9]+)\s\/\s([,0-9]+)/.exec(i(t("stat-name",a)))}(m)
s(m,function(t,a){return'<dt class="stat-stamina-nextHuntTime">Max Stam At</dt>'+o(i(t),Math.floor((n(a[2])-n(a[1]))/e("stat-stamina-gainPerHour")))}(r,f))}export default r
//# sourceMappingURL=injectStaminaCalculator-82855bd9.js.map
