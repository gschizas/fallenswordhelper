import{I as t,y as a,i as s}from"./calfSystem-9901ad27.js"
import{i as n}from"./intValue-0e84cdad.js"
import{v as e}from"./valueText-3f53d458.js"
import"./padZ-ce2146a0.js"
import{t as i,a as o}from"./timeBox-41be4fec.js"
export default function(){const r=t("stat-stamina-nextGain")
if(0===r.length)return
const m=a("statbar-stamina-tooltip-stamina"),f=function(a){return/([,0-9]+)\s\/\s([,0-9]+)/.exec(e(t("stat-name",a)))}(m)
s(m,function(t,a){return'<dt class="stat-stamina-nextHuntTime">Max Stam At</dt>'+i(e(t),Math.floor((n(a[2])-n(a[1]))/o("stat-stamina-gainPerHour")))}(r,f))}
//# sourceMappingURL=injectStaminaCalculator-d0010201.js.map
