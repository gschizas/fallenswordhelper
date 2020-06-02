import{F as t,x as a,i as s}from"./calfSystem-d49dbbd3.js"
import{i as n}from"./intValue-2ed328c8.js"
import{v as i}from"./valueText-064e4f1c.js"
import"./padZ-004f73b4.js"
import{t as e,a as o}from"./timeBox-6a4e7cc7.js"
export default function(){const r=t("stat-stamina-nextGain")
if(0===r.length)return
const m=a("statbar-stamina-tooltip-stamina"),f=function(a){return/([,0-9]+)\s\/\s([,0-9]+)/.exec(i(t("stat-name",a)))}(m)
s(m,function(t,a){return'<dt class="stat-stamina-nextHuntTime">Max Stam At</dt>'+e(i(t),Math.floor((n(a[2])-n(a[1]))/o("stat-stamina-gainPerHour")))}(r,f))}
//# sourceMappingURL=injectStaminaCalculator-90d16a89.js.map
