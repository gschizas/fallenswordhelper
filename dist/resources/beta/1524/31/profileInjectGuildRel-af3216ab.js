import{Y as e,B as s,H as t,i as o,_ as r}from"./calfSystem-47fc08ae.js"
import{g as i,a}from"./getIsOwnGuild-8c6cc963.js"
import{g as n}from"./profile-0e55bc83.js"
import{r as d}from"./replaceDoubleSpace-a9060de0.js"
import{s as l}from"./shouldBeArray-9caedd90.js"
import{t as f}from"./toLowerCase-51740687.js"
import"./currentGuildId-72bd2a1a.js"
import"./colouredDots-06e12c69.js"
import"./batch-cd69b94b.js"
import"./onlineDot-b5276d0b.js"
import"./doStatTotal-f1ff3773.js"
import"./executeAll-86fbe671.js"
import"./playerName-118d0325.js"
import"./intValue-e7ef611d.js"
import"./valueText-d53d9568.js"
import"./interceptSubmit-3f0967f1.js"
import"./formToUrl-e4e5b8f2.js"
import"./csvSplit-aa512e64.js"
const m=[["self","fshGreen","guildSelfMessage"],["friendly","fshOliveDrab","guildFrndMessage"],["old","fshDarkCyan","guildPastMessage"],["enemy","fshRed","guildEnmyMessage"]],c=[["guildFrnd","friendly"],["guildPast","old"],["guildEnmy","enemy"]]
function p(e){const s=l(e)
return s?s.map(d).map(f):[]}function u(t){return a()?(e("guildSelf",s(t)),"self"):function(e){const s=c.map((([e,s])=>[p(e),s])),t=d(f(e)),o=s.find((([e])=>e.includes(t)))
if(o)return o[1]}(s(t))}function j(e){const s=u(e)
s&&function(e,s){const[,i,a]=m.find((([e])=>e===s))
e.parentNode.classList.add(i)
const n=t(a)
n&&n.length>0&&o(e.parentNode,`<br>${r(n)}`)}(e,s)}function g(){const s=i()
s?j(s):n()&&e("guildSelf","")}export default g
//# sourceMappingURL=profileInjectGuildRel-af3216ab.js.map
