import{F as t,x as a,i as s}from"./calfSystem-6fc0cc1b.js"
import{i as n}from"./intValue-3f75a919.js"
import{v as i}from"./valueText-5a2c4671.js"
import"./padZ-8f1e016d.js"
import{t as o,a as e}from"./timeBox-7e76d622.js"
export default function(){const r=t("stat-stamina-nextGain")
if(0===r.length)return
const m=a("statbar-stamina-tooltip-stamina"),f=function(a){return/([,0-9]+)\s\/\s([,0-9]+)/.exec(i(t("stat-name",a)))}(m)
s(m,function(t,a){return'<dt class="stat-stamina-nextHuntTime">Max Stam At</dt>'+o(i(t),Math.floor((n(a[2])-n(a[1]))/e("stat-stamina-gainPerHour")))}(r,f))}
//# sourceMappingURL=injectStaminaCalculator-ca0279c5.js.map
