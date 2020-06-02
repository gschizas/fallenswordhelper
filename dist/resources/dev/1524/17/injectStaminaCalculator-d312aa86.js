import{F as t,x as a,i as s}from"./calfSystem-1c103624.js"
import{i as n}from"./intValue-f5e62e5b.js"
import{v as e}from"./valueText-ef8b2cab.js"
import"./padZ-717e9500.js"
import{t as i,a as o}from"./timeBox-39fad860.js"
export default function(){const r=t("stat-stamina-nextGain")
if(0===r.length)return
const m=a("statbar-stamina-tooltip-stamina"),f=function(a){return/([,0-9]+)\s\/\s([,0-9]+)/.exec(e(t("stat-name",a)))}(m)
s(m,function(t,a){return'<dt class="stat-stamina-nextHuntTime">Max Stam At</dt>'+i(e(t),Math.floor((n(a[2])-n(a[1]))/o("stat-stamina-gainPerHour")))}(r,f))}
//# sourceMappingURL=injectStaminaCalculator-d312aa86.js.map
