import{I as t,y as a,i as s}from"./calfSystem-d04e4be4.js"
import{i as e}from"./intValue-ec94378e.js"
import{v as n}from"./valueText-bd7566e4.js"
import"./padZ-cb9d6b55.js"
import{t as i,a as o}from"./timeBox-1fbec907.js"
export default function(){const r=t("stat-stamina-nextGain")
if(0===r.length)return
const m=a("statbar-stamina-tooltip-stamina"),f=function(a){return/([,0-9]+)\s\/\s([,0-9]+)/.exec(n(t("stat-name",a)))}(m)
s(m,function(t,a){return'<dt class="stat-stamina-nextHuntTime">Max Stam At</dt>'+i(n(t),Math.floor((e(a[2])-e(a[1]))/o("stat-stamina-gainPerHour")))}(r,f))}
//# sourceMappingURL=injectStaminaCalculator-b7de38d0.js.map
