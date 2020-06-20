import{I as t,y as a,i as s}from"./calfSystem-89b939c8.js"
import{i as n}from"./intValue-cd93b930.js"
import{v as i}from"./valueText-bfc7b590.js"
import"./padZ-ac2daa66.js"
import{t as o,a as r}from"./timeBox-e050daaa.js"
export default function(){const e=t("stat-stamina-nextGain")
if(0===e.length)return
const m=a("statbar-stamina-tooltip-stamina"),c=function(a){return/([,0-9]+)\s\/\s([,0-9]+)/.exec(i(t("stat-name",a)))}(m)
s(m,function(t,a){return'<dt class="stat-stamina-nextHuntTime">Max Stam At</dt>'+o(i(t),Math.floor((n(a[2])-n(a[1]))/r("stat-stamina-gainPerHour")))}(e,c))}
//# sourceMappingURL=injectStaminaCalculator-dd26b55f.js.map
