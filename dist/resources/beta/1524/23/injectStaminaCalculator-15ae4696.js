import{I as t,y as a,i as s}from"./calfSystem-34fcd691.js"
import{i as e}from"./intValue-0e84cdad.js"
import{v as n}from"./valueText-eb3ddde5.js"
import"./padZ-ce2146a0.js"
import{t as i,a as o}from"./timeBox-aee2f750.js"
export default function(){const r=t("stat-stamina-nextGain")
if(0===r.length)return
const m=a("statbar-stamina-tooltip-stamina"),f=function(a){return/([,0-9]+)\s\/\s([,0-9]+)/.exec(n(t("stat-name",a)))}(m)
s(m,function(t,a){return'<dt class="stat-stamina-nextHuntTime">Max Stam At</dt>'+i(n(t),Math.floor((e(a[2])-e(a[1]))/o("stat-stamina-gainPerHour")))}(r,f))}
//# sourceMappingURL=injectStaminaCalculator-15ae4696.js.map
