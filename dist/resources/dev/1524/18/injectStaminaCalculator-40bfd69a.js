import{F as t,x as a,i as s}from"./calfSystem-5545a3e6.js"
import{i as n}from"./intValue-02f9213d.js"
import{v as i}from"./valueText-3403f71f.js"
import"./padZ-d6df3a69.js"
import{t as o,a as e}from"./timeBox-b9c426ea.js"
export default function(){const r=t("stat-stamina-nextGain")
if(0===r.length)return
const m=a("statbar-stamina-tooltip-stamina"),f=function(a){return/([,0-9]+)\s\/\s([,0-9]+)/.exec(i(t("stat-name",a)))}(m)
s(m,function(t,a){return'<dt class="stat-stamina-nextHuntTime">Max Stam At</dt>'+o(i(t),Math.floor((n(a[2])-n(a[1]))/e("stat-stamina-gainPerHour")))}(r,f))}
//# sourceMappingURL=injectStaminaCalculator-40bfd69a.js.map
