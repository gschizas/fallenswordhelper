import{Z as e,B as s,H as t,i as o,$ as r}from"./calfSystem-54df10e3.js"
import"./playerName-8f1e4e48.js"
import{t as a}from"./toLowerCase-5e186769.js"
import"./onlineDot-78a7c8a3.js"
import"./batch-08f429bb.js"
import"./colouredDots-f56c0daa.js"
import"./currentGuildId-7eae4191.js"
import"./intValue-e8157483.js"
import"./valueText-90531bb6.js"
import"./doStatTotal-e15e6025.js"
import"./executeAll-be2ac0ec.js"
import{g as i}from"./profile-2af3ee20.js"
import"./formToUrl-54567b6c.js"
import"./interceptSubmit-d6a9b28d.js"
import{r as n}from"./replaceDoubleSpace-85926b11.js"
import"./csvSplit-1d6bbc93.js"
import{s as l}from"./shouldBeArray-c3a8d09e.js"
import{g as f,a as d}from"./getIsOwnGuild-a8f0f4ea.js"
const m=[["self","fshGreen","guildSelfMessage"],["friendly","fshOliveDrab","guildFrndMessage"],["old","fshDarkCyan","guildPastMessage"],["enemy","fshRed","guildEnmyMessage"]],c=[["guildFrnd","friendly"],["guildPast","old"],["guildEnmy","enemy"]]
function p(e){const s=l(e)
return s?s.map(n).map(a):[]}function u(t){return d()?(e("guildSelf",s(t)),"self"):function(e){const s=c.map(([e,s])=>[p(e),s]),t=n(a(e)),o=s.find(([e])=>e.includes(t))
if(o)return o[1]}(s(t))}function j(e){const s=u(e)
s&&function(e,s){const[,a,i]=m.find(([e])=>e===s)
e.parentNode.classList.add(a)
const n=t(i)
n&&n.length>0&&o(e.parentNode,"<br>"+r(n))}(e,s)}function g(){const s=f()
s?j(s):i()&&e("guildSelf","")}export default g
//# sourceMappingURL=profileInjectGuildRel-e3fbf351.js.map
