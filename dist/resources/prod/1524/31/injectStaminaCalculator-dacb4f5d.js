import{t,a}from"./timeBox-a182819f.js"
import{J as s,y as n,i as e}from"./calfSystem-7aee5245.js"
import{i}from"./intValue-e7ef611d.js"
import{v as o}from"./valueText-281cbf4b.js"
import"./padZ-4bdbf4bf.js"
function r(){const r=s("stat-stamina-nextGain")
if(0===r.length)return
const m=n("statbar-stamina-tooltip-stamina"),f=function(t){return/([,0-9]+)\s\/\s([,0-9]+)/.exec(o(s("stat-name",t)))}(m)
f&&e(m,function(s,n){return`<dt class="stat-stamina-nextHuntTime">Max Stam At</dt>${t(o(s),Math.floor((i(n[2])-i(n[1]))/a("stat-stamina-gainPerHour")))}`}(r,f))}export default r
//# sourceMappingURL=injectStaminaCalculator-dacb4f5d.js.map
