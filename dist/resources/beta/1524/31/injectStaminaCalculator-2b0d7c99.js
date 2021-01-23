import{t,a}from"./timeBox-cad4b8c8.js"
import{J as s,y as n,i}from"./calfSystem-47fc08ae.js"
import{i as e}from"./intValue-e7ef611d.js"
import{v as o}from"./valueText-d53d9568.js"
import"./padZ-4bdbf4bf.js"
function r(){const r=s("stat-stamina-nextGain")
if(0===r.length)return
const m=n("statbar-stamina-tooltip-stamina"),f=function(t){return/([,0-9]+)\s\/\s([,0-9]+)/.exec(o(s("stat-name",t)))}(m)
f&&i(m,function(s,n){return`<dt class="stat-stamina-nextHuntTime">Max Stam At</dt>${t(o(s),Math.floor((e(n[2])-e(n[1]))/a("stat-stamina-gainPerHour")))}`}(r,f))}export default r
//# sourceMappingURL=injectStaminaCalculator-2b0d7c99.js.map
