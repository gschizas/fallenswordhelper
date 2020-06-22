import{I as t,y as a,i as s}from"./calfSystem-1b876afa.js"
import{i as n}from"./intValue-4dd66c70.js"
import{v as i}from"./valueText-266fd211.js"
import"./padZ-cd657e78.js"
import{t as o,a as r}from"./timeBox-c63c93d1.js"
export default function(){const e=t("stat-stamina-nextGain")
if(0===e.length)return
const m=a("statbar-stamina-tooltip-stamina"),f=function(a){return/([,0-9]+)\s\/\s([,0-9]+)/.exec(i(t("stat-name",a)))}(m)
s(m,function(t,a){return'<dt class="stat-stamina-nextHuntTime">Max Stam At</dt>'+o(i(t),Math.floor((n(a[2])-n(a[1]))/r("stat-stamina-gainPerHour")))}(e,f))}
//# sourceMappingURL=injectStaminaCalculator-88397654.js.map
