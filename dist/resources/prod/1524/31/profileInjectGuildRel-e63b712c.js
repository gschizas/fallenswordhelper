import{Y as e,B as s,H as t,i as o,_ as r}from"./calfSystem-7aee5245.js"
import{g as i,a}from"./getIsOwnGuild-e40ed67c.js"
import{g as n}from"./profile-18b82bb9.js"
import{r as d}from"./replaceDoubleSpace-a9060de0.js"
import{s as l}from"./shouldBeArray-c0e711d8.js"
import{t as f}from"./toLowerCase-51740687.js"
import"./currentGuildId-2e15c82d.js"
import"./colouredDots-57f9735c.js"
import"./batch-bd79b969.js"
import"./onlineDot-d2b3e93d.js"
import"./doStatTotal-0f89c931.js"
import"./executeAll-86fbe671.js"
import"./playerName-87d03488.js"
import"./intValue-e7ef611d.js"
import"./valueText-281cbf4b.js"
import"./interceptSubmit-e2017f31.js"
import"./formToUrl-c1b61cd0.js"
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
//# sourceMappingURL=profileInjectGuildRel-e63b712c.js.map
