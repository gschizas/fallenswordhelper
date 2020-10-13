import{J as t,y as a,i as s}from"./calfSystem-b136673a.js"
import{i as n}from"./intValue-f4d85578.js"
import{v as i}from"./valueText-90e91fab.js"
import"./padZ-28ca6b6e.js"
import{t as o,a as e}from"./timeBox-f94d4a60.js"
function r(){const r=t("stat-stamina-nextGain")
if(0===r.length)return
const m=a("statbar-stamina-tooltip-stamina"),f=function(a){return/([,0-9]+)\s\/\s([,0-9]+)/.exec(i(t("stat-name",a)))}(m)
f&&s(m,function(t,a){return'<dt class="stat-stamina-nextHuntTime">Max Stam At</dt>'+o(i(t),Math.floor((n(a[2])-n(a[1]))/e("stat-stamina-gainPerHour")))}(r,f))}export default r
//# sourceMappingURL=injectStaminaCalculator-5658d9f6.js.map
