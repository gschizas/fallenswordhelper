import{F as t,x as a,i as s}from"./calfSystem-f7574730.js"
import{i as n}from"./intValue-0280032d.js"
import{v as i}from"./valueText-686b8935.js"
import"./padZ-30f972ec.js"
import{t as o,a as e}from"./timeBox-cd072e77.js"
export default function(){const r=t("stat-stamina-nextGain")
if(0===r.length)return
const m=a("statbar-stamina-tooltip-stamina"),f=function(a){return/([,0-9]+)\s\/\s([,0-9]+)/.exec(i(t("stat-name",a)))}(m)
s(m,function(t,a){return'<dt class="stat-stamina-nextHuntTime">Max Stam At</dt>'+o(i(t),Math.floor((n(a[2])-n(a[1]))/e("stat-stamina-gainPerHour")))}(r,f))}
//# sourceMappingURL=injectStaminaCalculator-311ed0df.js.map
