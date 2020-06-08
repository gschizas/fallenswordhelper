import{Z as e,B as s,G as t,i as o,$ as r}from"./calfSystem-a2862afc.js"
import"./playerName-72c7301a.js"
import{t as a}from"./toLowerCase-2574a84c.js"
import"./onlineDot-003f5d07.js"
import"./batch-1aa805d3.js"
import"./colouredDots-0f189e6b.js"
import"./currentGuildId-e84c528e.js"
import"./intValue-8b673ab3.js"
import"./valueText-0b6b2a96.js"
import"./doStatTotal-c038ec00.js"
import{g as i}from"./profile-bfe1c384.js"
import"./formToUrl-3b57fbeb.js"
import"./interceptSubmit-e6a64c8e.js"
import{r as n}from"./replaceDoubleSpace-f8451b4e.js"
import"./csvSplit-f4c1f44b.js"
import{s as f}from"./shouldBeArray-8e5331f1.js"
import{g as l,a as m}from"./getIsOwnGuild-f1633f48.js"
const c=[["self","fshGreen","guildSelfMessage"],["friendly","fshOliveDrab","guildFrndMessage"],["old","fshDarkCyan","guildPastMessage"],["enemy","fshRed","guildEnmyMessage"]],d=[["guildFrnd","friendly"],["guildPast","old"],["guildEnmy","enemy"]]
function p(e){const s=f(e)
return s?s.map(n).map(a):[]}function u(t){return m()?(e("guildSelf",s(t)),"self"):function(e){const s=d.map(([e,s])=>[p(e),s]),t=n(a(e)),o=s.find(([e])=>e.includes(t))
if(o)return o[1]}(s(t))}function g(e){const s=u(e)
s&&function(e,s){const[,a,i]=c.find(([e])=>e===s)
e.parentNode.classList.add(a)
const n=t(i)
n&&n.length>0&&o(e.parentNode,"<br>"+r(n))}(e,s)}export default function(){const s=l()
s?g(s):i()&&e("guildSelf","")}
//# sourceMappingURL=profileInjectGuildRel-85c5d511.js.map
