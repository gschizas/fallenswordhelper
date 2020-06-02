import{F as t,x as a,i as s}from"./calfSystem-02ae8657.js"
import{i as e}from"./intValue-514fe585.js"
import{v as n}from"./valueText-cd2843d1.js"
import"./padZ-ee453f37.js"
import{t as i,a as o}from"./timeBox-eba963e4.js"
export default function(){const r=t("stat-stamina-nextGain")
if(0===r.length)return
const m=a("statbar-stamina-tooltip-stamina"),f=function(a){return/([,0-9]+)\s\/\s([,0-9]+)/.exec(n(t("stat-name",a)))}(m)
s(m,function(t,a){return'<dt class="stat-stamina-nextHuntTime">Max Stam At</dt>'+i(n(t),Math.floor((e(a[2])-e(a[1]))/o("stat-stamina-gainPerHour")))}(r,f))}
//# sourceMappingURL=injectStaminaCalculator-f4348d44.js.map
