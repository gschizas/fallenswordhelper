import{I as t,y as a,i as s}from"./calfSystem-019de1cf.js"
import{i as n}from"./intValue-0e84cdad.js"
import{v as e}from"./valueText-4e1cfc2e.js"
import"./padZ-ce2146a0.js"
import{t as i,a as o}from"./timeBox-dd76cdd2.js"
export default function(){const r=t("stat-stamina-nextGain")
if(0===r.length)return
const m=a("statbar-stamina-tooltip-stamina"),c=function(a){return/([,0-9]+)\s\/\s([,0-9]+)/.exec(e(t("stat-name",a)))}(m)
s(m,function(t,a){return'<dt class="stat-stamina-nextHuntTime">Max Stam At</dt>'+i(e(t),Math.floor((n(a[2])-n(a[1]))/o("stat-stamina-gainPerHour")))}(r,c))}
//# sourceMappingURL=injectStaminaCalculator-1923c810.js.map
