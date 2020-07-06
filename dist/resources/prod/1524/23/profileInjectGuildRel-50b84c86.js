import{Y as e,B as s,G as t,i as o,_ as r}from"./calfSystem-019de1cf.js"
import"./playerName-569fc693.js"
import{t as a}from"./toLowerCase-dda30e6b.js"
import"./onlineDot-b729ce9d.js"
import"./batch-7b1ea568.js"
import"./colouredDots-f42e5f7f.js"
import"./currentGuildId-a399e8da.js"
import"./intValue-0e84cdad.js"
import"./valueText-4e1cfc2e.js"
import"./doStatTotal-928129d1.js"
import{g as i}from"./profile-57565e2d.js"
import"./formToUrl-91be1404.js"
import"./interceptSubmit-7b40d68d.js"
import{r as d}from"./replaceDoubleSpace-aad7da5f.js"
import"./csvSplit-4ba7a6af.js"
import{s as n}from"./shouldBeArray-f051bc29.js"
import{g as f,a as l}from"./getIsOwnGuild-5922e7d8.js"
const m=[["self","fshGreen","guildSelfMessage"],["friendly","fshOliveDrab","guildFrndMessage"],["old","fshDarkCyan","guildPastMessage"],["enemy","fshRed","guildEnmyMessage"]],c=[["guildFrnd","friendly"],["guildPast","old"],["guildEnmy","enemy"]]
function p(e){const s=n(e)
return s?s.map(d).map(a):[]}function u(t){return l()?(e("guildSelf",s(t)),"self"):function(e){const s=c.map(([e,s])=>[p(e),s]),t=d(a(e)),o=s.find(([e])=>e.includes(t))
if(o)return o[1]}(s(t))}function g(e){const s=u(e)
s&&function(e,s){const[,a,i]=m.find(([e])=>e===s)
e.parentNode.classList.add(a)
const d=t(i)
d&&d.length>0&&o(e.parentNode,"<br>"+r(d))}(e,s)}export default function(){const s=f()
s?g(s):i()&&e("guildSelf","")}
//# sourceMappingURL=profileInjectGuildRel-50b84c86.js.map
