import{I as t,y as a,i as s}from"./calfSystem-4cc738f8.js"
import{i as n}from"./intValue-209ea1ab.js"
import{v as i}from"./valueText-29e97f89.js"
import"./padZ-efc0fa0f.js"
import{t as e,a as o}from"./timeBox-bbabca7c.js"
export default function(){const r=t("stat-stamina-nextGain")
if(0===r.length)return
const m=a("statbar-stamina-tooltip-stamina"),f=function(a){return/([,0-9]+)\s\/\s([,0-9]+)/.exec(i(t("stat-name",a)))}(m)
s(m,function(t,a){return'<dt class="stat-stamina-nextHuntTime">Max Stam At</dt>'+e(i(t),Math.floor((n(a[2])-n(a[1]))/o("stat-stamina-gainPerHour")))}(r,f))}
//# sourceMappingURL=injectStaminaCalculator-c86674bc.js.map
