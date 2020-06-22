import{Z as s,B as e,G as t,i as o,$ as r}from"./calfSystem-4cc738f8.js"
import"./playerName-2fd84b2a.js"
import{t as a}from"./toLowerCase-e8c3179d.js"
import"./onlineDot-7fc3dfe9.js"
import"./batch-b1efab68.js"
import"./colouredDots-3c0d5727.js"
import"./currentGuildId-53b525a7.js"
import"./intValue-209ea1ab.js"
import"./valueText-29e97f89.js"
import"./doStatTotal-1b23cdfd.js"
import{g as i}from"./profile-d042f7a7.js"
import"./formToUrl-84dfad91.js"
import"./interceptSubmit-c1f9070f.js"
import{r as n}from"./replaceDoubleSpace-aa6e7904.js"
import"./csvSplit-afd1c5e2.js"
import{s as f}from"./shouldBeArray-8b887a94.js"
import{g as d,a as l}from"./getIsOwnGuild-22d0008c.js"
const m=[["self","fshGreen","guildSelfMessage"],["friendly","fshOliveDrab","guildFrndMessage"],["old","fshDarkCyan","guildPastMessage"],["enemy","fshRed","guildEnmyMessage"]],c=[["guildFrnd","friendly"],["guildPast","old"],["guildEnmy","enemy"]]
function p(s){const e=f(s)
return e?e.map(n).map(a):[]}function u(t){return l()?(s("guildSelf",e(t)),"self"):function(s){const e=c.map(([s,e])=>[p(s),e]),t=n(a(s)),o=e.find(([s])=>s.includes(t))
if(o)return o[1]}(e(t))}function g(s){const e=u(s)
e&&function(s,e){const[,a,i]=m.find(([s])=>s===e)
s.parentNode.classList.add(a)
const n=t(i)
n&&n.length>0&&o(s.parentNode,"<br>"+r(n))}(s,e)}export default function(){const e=d()
e?g(e):i()&&s("guildSelf","")}
//# sourceMappingURL=profileInjectGuildRel-ebb139b9.js.map
