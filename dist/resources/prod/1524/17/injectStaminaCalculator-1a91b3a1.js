import{F as t,x as a,i as s}from"./calfSystem-dec5e071.js"
import{i as e}from"./intValue-8ad0a3ce.js"
import{v as n}from"./valueText-67a7e51e.js"
import"./padZ-89cf7495.js"
import{t as i,a as o}from"./timeBox-bdafe97a.js"
export default function(){const r=t("stat-stamina-nextGain")
if(0===r.length)return
const m=a("statbar-stamina-tooltip-stamina"),f=function(a){return/([,0-9]+)\s\/\s([,0-9]+)/.exec(n(t("stat-name",a)))}(m)
s(m,function(t,a){return'<dt class="stat-stamina-nextHuntTime">Max Stam At</dt>'+i(n(t),Math.floor((e(a[2])-e(a[1]))/o("stat-stamina-gainPerHour")))}(r,f))}
//# sourceMappingURL=injectStaminaCalculator-1a91b3a1.js.map
