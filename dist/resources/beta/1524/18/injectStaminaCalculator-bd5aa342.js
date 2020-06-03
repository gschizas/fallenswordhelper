import{F as t,x as a,i as s}from"./calfSystem-4197cc22.js"
import{i as n}from"./intValue-202eff7d.js"
import{v as i}from"./valueText-cddc877a.js"
import"./padZ-0ee33b17.js"
import{t as e,a as o}from"./timeBox-0d400af2.js"
export default function(){const r=t("stat-stamina-nextGain")
if(0===r.length)return
const m=a("statbar-stamina-tooltip-stamina"),f=function(a){return/([,0-9]+)\s\/\s([,0-9]+)/.exec(i(t("stat-name",a)))}(m)
s(m,function(t,a){return'<dt class="stat-stamina-nextHuntTime">Max Stam At</dt>'+e(i(t),Math.floor((n(a[2])-n(a[1]))/o("stat-stamina-gainPerHour")))}(r,f))}
//# sourceMappingURL=injectStaminaCalculator-bd5aa342.js.map
