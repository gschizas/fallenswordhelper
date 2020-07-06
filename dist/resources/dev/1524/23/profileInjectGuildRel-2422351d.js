import{Z as e,B as s,G as a,i as t,$ as o}from"./calfSystem-9901ad27.js"
import"./playerName-a0f4217f.js"
import{t as r}from"./toLowerCase-dda30e6b.js"
import"./onlineDot-b29de868.js"
import"./batch-e74a5e93.js"
import"./colouredDots-e6de8d7d.js"
import"./currentGuildId-86da8be9.js"
import"./intValue-0e84cdad.js"
import"./valueText-3f53d458.js"
import"./doStatTotal-226a98f1.js"
import{g as i}from"./profile-f87e4397.js"
import"./formToUrl-4cebc28a.js"
import"./interceptSubmit-ce974a7c.js"
import{r as d}from"./replaceDoubleSpace-aad7da5f.js"
import"./csvSplit-4ba7a6af.js"
import{s as n}from"./shouldBeArray-8c69684a.js"
import{g as f,a as l}from"./getIsOwnGuild-94fa006d.js"
const m=[["self","fshGreen","guildSelfMessage"],["friendly","fshOliveDrab","guildFrndMessage"],["old","fshDarkCyan","guildPastMessage"],["enemy","fshRed","guildEnmyMessage"]],c=[["guildFrnd","friendly"],["guildPast","old"],["guildEnmy","enemy"]]
function p(e){const s=n(e)
return s?s.map(d).map(r):[]}function u(a){return l()?(e("guildSelf",s(a)),"self"):function(e){const s=c.map(([e,s])=>[p(e),s]),a=d(r(e)),t=s.find(([e])=>e.includes(a))
if(t)return t[1]}(s(a))}function g(e){const s=u(e)
s&&function(e,s){const[,r,i]=m.find(([e])=>e===s)
e.parentNode.classList.add(r)
const d=a(i)
d&&d.length>0&&t(e.parentNode,"<br>"+o(d))}(e,s)}export default function(){const s=f()
s?g(s):i()&&e("guildSelf","")}
//# sourceMappingURL=profileInjectGuildRel-2422351d.js.map
