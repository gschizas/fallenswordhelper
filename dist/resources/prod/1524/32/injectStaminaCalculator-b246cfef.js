import{t,a}from"./timeBox-dc87ac81.js"
import{J as s,y as n,i}from"./calfSystem-45544049.js"
import{i as o}from"./intValue-da5ad0eb.js"
import{v as e}from"./valueText-f47f9857.js"
import"./padZ-0fd2ec23.js"
function r(){const r=s("stat-stamina-nextGain")
if(0===r.length)return
const m=n("statbar-stamina-tooltip-stamina"),f=function(t){return/([,0-9]+)\s\/\s([,0-9]+)/.exec(e(s("stat-name",t)))}(m)
f&&i(m,function(s,n){return`<dt class="stat-stamina-nextHuntTime">Max Stam At</dt>${t(e(s),Math.floor((o(n[2])-o(n[1]))/a("stat-stamina-gainPerHour")))}`}(r,f))}export default r
//# sourceMappingURL=injectStaminaCalculator-b246cfef.js.map
