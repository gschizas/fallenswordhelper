import{F as t,x as a,i as s}from"./calfSystem-ee582533.js"
import{i as n}from"./intValue-a842cf8a.js"
import{v as e}from"./valueText-a2e47d93.js"
import"./padZ-55be60ec.js"
import{t as i,a as o}from"./timeBox-8c121fa6.js"
export default function(){const r=t("stat-stamina-nextGain")
if(0===r.length)return
const m=a("statbar-stamina-tooltip-stamina"),f=function(a){return/([,0-9]+)\s\/\s([,0-9]+)/.exec(e(t("stat-name",a)))}(m)
s(m,function(t,a){return'<dt class="stat-stamina-nextHuntTime">Max Stam At</dt>'+i(e(t),Math.floor((n(a[2])-n(a[1]))/o("stat-stamina-gainPerHour")))}(r,f))}
//# sourceMappingURL=injectStaminaCalculator-f459c1ab.js.map
