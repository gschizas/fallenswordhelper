import{Y as s,B as e,H as t,i as o,_ as r}from"./calfSystem-f9a27018.js"
import"./playerName-6c5f1f5b.js"
import{t as i}from"./toLowerCase-0a22477f.js"
import"./onlineDot-cd4bee30.js"
import"./batch-78c008bf.js"
import"./colouredDots-1d7367db.js"
import"./currentGuildId-a542fdb9.js"
import"./intValue-f94761c7.js"
import"./valueText-d637a521.js"
import"./doStatTotal-1e076944.js"
import"./executeAll-18adff71.js"
import{g as a}from"./profile-42726f68.js"
import"./formToUrl-b3369df3.js"
import"./interceptSubmit-039f8ca3.js"
import{r as f}from"./replaceDoubleSpace-89ffec51.js"
import"./csvSplit-b214d56b.js"
import{s as n}from"./shouldBeArray-2e642379.js"
import{g as l,a as d}from"./getIsOwnGuild-bd28ca0b.js"
const m=[["self","fshGreen","guildSelfMessage"],["friendly","fshOliveDrab","guildFrndMessage"],["old","fshDarkCyan","guildPastMessage"],["enemy","fshRed","guildEnmyMessage"]],c=[["guildFrnd","friendly"],["guildPast","old"],["guildEnmy","enemy"]]
function p(s){const e=n(s)
return e?e.map(f).map(i):[]}function u(t){return d()?(s("guildSelf",e(t)),"self"):function(s){const e=c.map(([s,e])=>[p(s),e]),t=f(i(s)),o=e.find(([s])=>s.includes(t))
if(o)return o[1]}(e(t))}function j(s){const e=u(s)
e&&function(s,e){const[,i,a]=m.find(([s])=>s===e)
s.parentNode.classList.add(i)
const f=t(a)
f&&f.length>0&&o(s.parentNode,"<br>"+r(f))}(s,e)}function g(){const e=l()
e?j(e):a()&&s("guildSelf","")}export default g
//# sourceMappingURL=profileInjectGuildRel-a5c8b20f.js.map
