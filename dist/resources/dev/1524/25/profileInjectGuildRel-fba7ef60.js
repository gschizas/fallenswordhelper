import{Z as s,B as e,H as t,i as o,$ as r}from"./calfSystem-69dd5601.js"
import"./playerName-688c2cbc.js"
import{t as i}from"./toLowerCase-c42114e1.js"
import"./onlineDot-0fddc3bd.js"
import"./batch-9d8c3bf7.js"
import"./colouredDots-84d91696.js"
import"./currentGuildId-a0138513.js"
import"./intValue-65d3c36c.js"
import"./valueText-1de8e1c5.js"
import"./doStatTotal-5575a7a5.js"
import{g as a}from"./profile-811bd14e.js"
import"./formToUrl-543a6364.js"
import"./interceptSubmit-9f6267e0.js"
import{r as n}from"./replaceDoubleSpace-08433fa1.js"
import"./csvSplit-8c1a6c7f.js"
import{s as d}from"./shouldBeArray-547bc477.js"
import{g as l,a as c}from"./getIsOwnGuild-12592983.js"
const f=[["self","fshGreen","guildSelfMessage"],["friendly","fshOliveDrab","guildFrndMessage"],["old","fshDarkCyan","guildPastMessage"],["enemy","fshRed","guildEnmyMessage"]],m=[["guildFrnd","friendly"],["guildPast","old"],["guildEnmy","enemy"]]
function p(s){const e=d(s)
return e?e.map(n).map(i):[]}function u(t){return c()?(s("guildSelf",e(t)),"self"):function(s){const e=m.map(([s,e])=>[p(s),e]),t=n(i(s)),o=e.find(([s])=>s.includes(t))
if(o)return o[1]}(e(t))}function g(s){const e=u(s)
e&&function(s,e){const[,i,a]=f.find(([s])=>s===e)
s.parentNode.classList.add(i)
const n=t(a)
n&&n.length>0&&o(s.parentNode,"<br>"+r(n))}(s,e)}function j(){const e=l()
e?g(e):a()&&s("guildSelf","")}export default j
//# sourceMappingURL=profileInjectGuildRel-fba7ef60.js.map
