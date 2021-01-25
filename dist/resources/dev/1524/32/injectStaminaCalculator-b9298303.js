import{t,a}from"./timeBox-2008d5da.js"
import{J as s,y as n,i}from"./calfSystem-19a5d332.js"
import{i as e}from"./intValue-da5ad0eb.js"
import{v as o}from"./valueText-c9c4edc1.js"
import"./padZ-0fd2ec23.js"
function r(){const r=s("stat-stamina-nextGain")
if(0===r.length)return
const m=n("statbar-stamina-tooltip-stamina"),c=function(t){return/([,0-9]+)\s\/\s([,0-9]+)/.exec(o(s("stat-name",t)))}(m)
c&&i(m,function(s,n){return`<dt class="stat-stamina-nextHuntTime">Max Stam At</dt>${t(o(s),Math.floor((e(n[2])-e(n[1]))/a("stat-stamina-gainPerHour")))}`}(r,c))}export default r
//# sourceMappingURL=injectStaminaCalculator-b9298303.js.map
