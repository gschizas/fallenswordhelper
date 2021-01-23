import{Z as e,B as s,H as t,i as o,$ as r}from"./calfSystem-393ab895.js"
import{g as a,a as i}from"./getIsOwnGuild-faeabd4e.js"
import{g as n}from"./profile-3e138563.js"
import{r as l}from"./replaceDoubleSpace-a9060de0.js"
import{s as f}from"./shouldBeArray-c2b21111.js"
import{t as d}from"./toLowerCase-51740687.js"
import"./currentGuildId-469c60c3.js"
import"./colouredDots-feee957b.js"
import"./batch-28b89a64.js"
import"./onlineDot-9b46cf0c.js"
import"./doStatTotal-2c67bbbb.js"
import"./executeAll-86fbe671.js"
import"./playerName-03162bd7.js"
import"./intValue-e7ef611d.js"
import"./valueText-89c9d82f.js"
import"./interceptSubmit-193429ea.js"
import"./formToUrl-7683ac99.js"
import"./csvSplit-aa512e64.js"
const m=[["self","fshGreen","guildSelfMessage"],["friendly","fshOliveDrab","guildFrndMessage"],["old","fshDarkCyan","guildPastMessage"],["enemy","fshRed","guildEnmyMessage"]],c=[["guildFrnd","friendly"],["guildPast","old"],["guildEnmy","enemy"]]
function p(e){const s=f(e)
return s?s.map(l).map(d):[]}function u(t){return i()?(e("guildSelf",s(t)),"self"):function(e){const s=c.map((([e,s])=>[p(e),s])),t=l(d(e)),o=s.find((([e])=>e.includes(t)))
if(o)return o[1]}(s(t))}function j(e){const s=u(e)
s&&function(e,s){const[,a,i]=m.find((([e])=>e===s))
e.parentNode.classList.add(a)
const n=t(i)
n&&n.length>0&&o(e.parentNode,`<br>${r(n)}`)}(e,s)}function b(){const s=a()
s?j(s):n()&&e("guildSelf","")}export default b
//# sourceMappingURL=profileInjectGuildRel-09b91ac7.js.map
