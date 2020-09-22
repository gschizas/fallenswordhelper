import{Z as e,B as s,H as t,i as o,$ as r}from"./calfSystem-38898f3e.js"
import"./playerName-b488fc7a.js"
import{t as i}from"./toLowerCase-2f55d839.js"
import"./onlineDot-e1f61292.js"
import"./batch-21cc76f7.js"
import"./colouredDots-968ed19c.js"
import"./currentGuildId-7855dbba.js"
import"./intValue-44683b42.js"
import"./valueText-df2d502e.js"
import"./doStatTotal-19a42dfd.js"
import{g as a}from"./profile-d93f313c.js"
import"./formToUrl-3fe1dedb.js"
import"./interceptSubmit-7919653e.js"
import{r as d}from"./replaceDoubleSpace-3d54502a.js"
import"./csvSplit-dcc6dfc9.js"
import{s as n}from"./shouldBeArray-de467b07.js"
import{g as f,a as l}from"./getIsOwnGuild-925780e2.js"
const m=[["self","fshGreen","guildSelfMessage"],["friendly","fshOliveDrab","guildFrndMessage"],["old","fshDarkCyan","guildPastMessage"],["enemy","fshRed","guildEnmyMessage"]],c=[["guildFrnd","friendly"],["guildPast","old"],["guildEnmy","enemy"]]
function p(e){const s=n(e)
return s?s.map(d).map(i):[]}function u(t){return l()?(e("guildSelf",s(t)),"self"):function(e){const s=c.map(([e,s])=>[p(e),s]),t=d(i(e)),o=s.find(([e])=>e.includes(t))
if(o)return o[1]}(s(t))}function g(e){const s=u(e)
s&&function(e,s){const[,i,a]=m.find(([e])=>e===s)
e.parentNode.classList.add(i)
const d=t(a)
d&&d.length>0&&o(e.parentNode,"<br>"+r(d))}(e,s)}function j(){const s=f()
s?g(s):a()&&e("guildSelf","")}export default j
//# sourceMappingURL=profileInjectGuildRel-e3fd0261.js.map
