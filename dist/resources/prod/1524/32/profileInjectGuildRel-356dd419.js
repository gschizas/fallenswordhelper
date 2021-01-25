import{Z as e,B as s,H as t,i as o,$ as r}from"./calfSystem-45544049.js"
import{g as a,a as i}from"./getIsOwnGuild-5da2f70e.js"
import{g as n}from"./profile-c4f7e7d2.js"
import{r as l}from"./replaceDoubleSpace-856176a4.js"
import{s as d}from"./shouldBeArray-0846c8b2.js"
import{t as f}from"./toLowerCase-ace931b6.js"
import"./currentGuildId-2687cdb7.js"
import"./colouredDots-8e1602e8.js"
import"./batch-62de3d3c.js"
import"./onlineDot-d26b9768.js"
import"./doStatTotal-c1750c57.js"
import"./executeAll-f8eab1e4.js"
import"./playerName-c1bcaeb9.js"
import"./intValue-da5ad0eb.js"
import"./valueText-f47f9857.js"
import"./interceptSubmit-bea77d0e.js"
import"./formToUrl-61791a0c.js"
import"./csvSplit-a4e91aa0.js"
const m=[["self","fshGreen","guildSelfMessage"],["friendly","fshOliveDrab","guildFrndMessage"],["old","fshDarkCyan","guildPastMessage"],["enemy","fshRed","guildEnmyMessage"]],c=[["guildFrnd","friendly"],["guildPast","old"],["guildEnmy","enemy"]]
function p(e){const s=d(e)
return s?s.map(l).map(f):[]}function u(t){return i()?(e("guildSelf",s(t)),"self"):function(e){const s=c.map((([e,s])=>[p(e),s])),t=l(f(e)),o=s.find((([e])=>e.includes(t)))
if(o)return o[1]}(s(t))}function j(e){const s=u(e)
s&&function(e,s){const[,a,i]=m.find((([e])=>e===s))
e.parentNode.classList.add(a)
const n=t(i)
n&&n.length>0&&o(e.parentNode,`<br>${r(n)}`)}(e,s)}function g(){const s=a()
s?j(s):n()&&e("guildSelf","")}export default g
//# sourceMappingURL=profileInjectGuildRel-356dd419.js.map
