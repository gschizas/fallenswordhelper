import{I as t,y as a,i as s}from"./calfSystem-9c7241dc.js"
import{i as n}from"./intValue-4cb61c79.js"
import{v as i}from"./valueText-2c80175b.js"
import"./padZ-95af3fc2.js"
import{t as o,a as r}from"./timeBox-04f58741.js"
export default function(){const m=t("stat-stamina-nextGain")
if(0===m.length)return
const e=a("statbar-stamina-tooltip-stamina"),c=function(a){return/([,0-9]+)\s\/\s([,0-9]+)/.exec(i(t("stat-name",a)))}(e)
s(e,function(t,a){return'<dt class="stat-stamina-nextHuntTime">Max Stam At</dt>'+o(i(t),Math.floor((n(a[2])-n(a[1]))/r("stat-stamina-gainPerHour")))}(m,c))}
//# sourceMappingURL=injectStaminaCalculator-4f0737c0.js.map
