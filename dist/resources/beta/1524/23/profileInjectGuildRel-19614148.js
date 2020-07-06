import{Y as e,B as s,G as a,i as t,_ as o}from"./calfSystem-34fcd691.js"
import"./playerName-d0ea3aa5.js"
import{t as r}from"./toLowerCase-dda30e6b.js"
import"./onlineDot-1dfc5004.js"
import"./batch-76cced14.js"
import"./colouredDots-84a9af5b.js"
import"./currentGuildId-fa7da475.js"
import"./intValue-0e84cdad.js"
import"./valueText-eb3ddde5.js"
import"./doStatTotal-73f2a0ea.js"
import{g as i}from"./profile-1f1ffc1f.js"
import"./formToUrl-41bbf6ea.js"
import"./interceptSubmit-492af249.js"
import{r as d}from"./replaceDoubleSpace-aad7da5f.js"
import"./csvSplit-4ba7a6af.js"
import{s as f}from"./shouldBeArray-ceec48b8.js"
import{g as n,a as l}from"./getIsOwnGuild-1987fdfd.js"
const m=[["self","fshGreen","guildSelfMessage"],["friendly","fshOliveDrab","guildFrndMessage"],["old","fshDarkCyan","guildPastMessage"],["enemy","fshRed","guildEnmyMessage"]],c=[["guildFrnd","friendly"],["guildPast","old"],["guildEnmy","enemy"]]
function p(e){const s=f(e)
return s?s.map(d).map(r):[]}function u(a){return l()?(e("guildSelf",s(a)),"self"):function(e){const s=c.map(([e,s])=>[p(e),s]),a=d(r(e)),t=s.find(([e])=>e.includes(a))
if(t)return t[1]}(s(a))}function g(e){const s=u(e)
s&&function(e,s){const[,r,i]=m.find(([e])=>e===s)
e.parentNode.classList.add(r)
const d=a(i)
d&&d.length>0&&t(e.parentNode,"<br>"+o(d))}(e,s)}export default function(){const s=n()
s?g(s):i()&&e("guildSelf","")}
//# sourceMappingURL=profileInjectGuildRel-19614148.js.map
