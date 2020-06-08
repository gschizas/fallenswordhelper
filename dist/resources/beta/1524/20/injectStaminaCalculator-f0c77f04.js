import{I as t,y as a,i as s}from"./calfSystem-05554bae.js"
import{i as n}from"./intValue-f723fc88.js"
import{v as e}from"./valueText-d9bb024d.js"
import"./padZ-14d8d7ee.js"
import{t as i,a as o}from"./timeBox-2287e36a.js"
export default function(){const r=t("stat-stamina-nextGain")
if(0===r.length)return
const m=a("statbar-stamina-tooltip-stamina"),f=function(a){return/([,0-9]+)\s\/\s([,0-9]+)/.exec(e(t("stat-name",a)))}(m)
s(m,function(t,a){return'<dt class="stat-stamina-nextHuntTime">Max Stam At</dt>'+i(e(t),Math.floor((n(a[2])-n(a[1]))/o("stat-stamina-gainPerHour")))}(r,f))}
//# sourceMappingURL=injectStaminaCalculator-f0c77f04.js.map
