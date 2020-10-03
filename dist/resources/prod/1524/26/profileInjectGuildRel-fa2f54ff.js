import{Y as s,B as e,H as t,i as o,_ as r}from"./calfSystem-a5fc99d4.js"
import"./playerName-f44ad46e.js"
import{t as a}from"./toLowerCase-b21b7cc8.js"
import"./onlineDot-0c100c3d.js"
import"./batch-69aa6624.js"
import"./colouredDots-b5256428.js"
import"./currentGuildId-c73fd152.js"
import"./intValue-e4cdd281.js"
import"./valueText-4ea8a5e7.js"
import"./doStatTotal-a4838f62.js"
import{g as i}from"./profile-8b7c9d88.js"
import"./formToUrl-287ebfb7.js"
import"./interceptSubmit-1ba9df73.js"
import{r as n}from"./replaceDoubleSpace-3242d7f7.js"
import"./csvSplit-653f6227.js"
import{s as d}from"./shouldBeArray-920759e1.js"
import{g as f,a as l}from"./getIsOwnGuild-a65361f5.js"
const m=[["self","fshGreen","guildSelfMessage"],["friendly","fshOliveDrab","guildFrndMessage"],["old","fshDarkCyan","guildPastMessage"],["enemy","fshRed","guildEnmyMessage"]],c=[["guildFrnd","friendly"],["guildPast","old"],["guildEnmy","enemy"]]
function p(s){const e=d(s)
return e?e.map(n).map(a):[]}function u(t){return l()?(s("guildSelf",e(t)),"self"):function(s){const e=c.map(([s,e])=>[p(s),e]),t=n(a(s)),o=e.find(([s])=>s.includes(t))
if(o)return o[1]}(e(t))}function g(s){const e=u(s)
e&&function(s,e){const[,a,i]=m.find(([s])=>s===e)
s.parentNode.classList.add(a)
const n=t(i)
n&&n.length>0&&o(s.parentNode,"<br>"+r(n))}(s,e)}function j(){const e=f()
e?g(e):i()&&s("guildSelf","")}export default j
//# sourceMappingURL=profileInjectGuildRel-fa2f54ff.js.map
