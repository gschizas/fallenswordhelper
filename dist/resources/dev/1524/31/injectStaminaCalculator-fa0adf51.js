import{t,a}from"./timeBox-7b2c57cd.js"
import{J as s,y as n,i}from"./calfSystem-393ab895.js"
import{i as o}from"./intValue-e7ef611d.js"
import{v as e}from"./valueText-89c9d82f.js"
import"./padZ-4bdbf4bf.js"
function r(){const r=s("stat-stamina-nextGain")
if(0===r.length)return
const m=n("statbar-stamina-tooltip-stamina"),f=function(t){return/([,0-9]+)\s\/\s([,0-9]+)/.exec(e(s("stat-name",t)))}(m)
f&&i(m,function(s,n){return`<dt class="stat-stamina-nextHuntTime">Max Stam At</dt>${t(e(s),Math.floor((o(n[2])-o(n[1]))/a("stat-stamina-gainPerHour")))}`}(r,f))}export default r
//# sourceMappingURL=injectStaminaCalculator-fa0adf51.js.map
