import{F as t,x as a,i as s}from"./calfSystem-740ec4d2.js"
import{i as n}from"./intValue-576c2dec.js"
import{v as i}from"./valueText-3095af99.js"
import"./padZ-54c74bdd.js"
import{t as o,a as e}from"./timeBox-f6aa8d4f.js"
export default function(){const r=t("stat-stamina-nextGain")
if(0===r.length)return
const m=a("statbar-stamina-tooltip-stamina"),f=function(a){return/([,0-9]+)\s\/\s([,0-9]+)/.exec(i(t("stat-name",a)))}(m)
s(m,function(t,a){return'<dt class="stat-stamina-nextHuntTime">Max Stam At</dt>'+o(i(t),Math.floor((n(a[2])-n(a[1]))/e("stat-stamina-gainPerHour")))}(r,f))}
//# sourceMappingURL=injectStaminaCalculator-759bed67.js.map
