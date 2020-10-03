import{J as t,y as a,i as s}from"./calfSystem-4991bf5b.js"
import{i as n}from"./intValue-e4cdd281.js"
import{v as i}from"./valueText-4b5d9d8a.js"
import"./padZ-f9e33f92.js"
import{t as o,a as e}from"./timeBox-48b2548b.js"
function r(){const r=t("stat-stamina-nextGain")
if(0===r.length)return
const m=a("statbar-stamina-tooltip-stamina"),f=function(a){return/([,0-9]+)\s\/\s([,0-9]+)/.exec(i(t("stat-name",a)))}(m)
s(m,function(t,a){return'<dt class="stat-stamina-nextHuntTime">Max Stam At</dt>'+o(i(t),Math.floor((n(a[2])-n(a[1]))/e("stat-stamina-gainPerHour")))}(r,f))}export default r
//# sourceMappingURL=injectStaminaCalculator-40aec1f5.js.map
