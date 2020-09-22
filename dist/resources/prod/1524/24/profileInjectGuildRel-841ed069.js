import{Y as s,B as e,H as t,i as o,_ as r}from"./calfSystem-ec854151.js"
import"./playerName-f06eed80.js"
import{t as i}from"./toLowerCase-2f55d839.js"
import"./onlineDot-8d331eb0.js"
import"./batch-2b06347e.js"
import"./colouredDots-069c8fd6.js"
import"./currentGuildId-1299fc05.js"
import"./intValue-44683b42.js"
import"./valueText-0f3877db.js"
import"./doStatTotal-5c96ff36.js"
import{g as n}from"./profile-812bb681.js"
import"./formToUrl-48dc238d.js"
import"./interceptSubmit-99d78c5d.js"
import{r as a}from"./replaceDoubleSpace-3d54502a.js"
import"./csvSplit-dcc6dfc9.js"
import{s as d}from"./shouldBeArray-9b99ea80.js"
import{g as f,a as l}from"./getIsOwnGuild-df46ec89.js"
const m=[["self","fshGreen","guildSelfMessage"],["friendly","fshOliveDrab","guildFrndMessage"],["old","fshDarkCyan","guildPastMessage"],["enemy","fshRed","guildEnmyMessage"]],c=[["guildFrnd","friendly"],["guildPast","old"],["guildEnmy","enemy"]]
function p(s){const e=d(s)
return e?e.map(a).map(i):[]}function u(t){return l()?(s("guildSelf",e(t)),"self"):function(s){const e=c.map(([s,e])=>[p(s),e]),t=a(i(s)),o=e.find(([s])=>s.includes(t))
if(o)return o[1]}(e(t))}function g(s){const e=u(s)
e&&function(s,e){const[,i,n]=m.find(([s])=>s===e)
s.parentNode.classList.add(i)
const a=t(n)
a&&a.length>0&&o(s.parentNode,"<br>"+r(a))}(s,e)}function j(){const e=f()
e?g(e):n()&&s("guildSelf","")}export default j
//# sourceMappingURL=profileInjectGuildRel-841ed069.js.map
