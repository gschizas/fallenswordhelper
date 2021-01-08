import{Y as e,B as s,H as t,i as o,_ as r}from"./calfSystem-ebf4b17d.js"
import"./playerName-1bc13590.js"
import{t as i}from"./toLowerCase-5e186769.js"
import"./onlineDot-08128370.js"
import"./batch-3642a7ff.js"
import"./colouredDots-89402236.js"
import"./currentGuildId-f7450bbe.js"
import"./intValue-e8157483.js"
import"./valueText-b6db7b96.js"
import"./doStatTotal-4d2c7207.js"
import"./executeAll-be2ac0ec.js"
import{g as n}from"./profile-5c2817c8.js"
import"./formToUrl-c9020722.js"
import"./interceptSubmit-3d708b68.js"
import{r as a}from"./replaceDoubleSpace-85926b11.js"
import"./csvSplit-1d6bbc93.js"
import{s as l}from"./shouldBeArray-fb88982b.js"
import{g as f,a as d}from"./getIsOwnGuild-71f83f16.js"
const m=[["self","fshGreen","guildSelfMessage"],["friendly","fshOliveDrab","guildFrndMessage"],["old","fshDarkCyan","guildPastMessage"],["enemy","fshRed","guildEnmyMessage"]],c=[["guildFrnd","friendly"],["guildPast","old"],["guildEnmy","enemy"]]
function p(e){const s=l(e)
return s?s.map(a).map(i):[]}function u(t){return d()?(e("guildSelf",s(t)),"self"):function(e){const s=c.map(([e,s])=>[p(e),s]),t=a(i(e)),o=s.find(([e])=>e.includes(t))
if(o)return o[1]}(s(t))}function b(e){const s=u(e)
s&&function(e,s){const[,i,n]=m.find(([e])=>e===s)
e.parentNode.classList.add(i)
const a=t(n)
a&&a.length>0&&o(e.parentNode,"<br>"+r(a))}(e,s)}function j(){const s=f()
s?b(s):n()&&e("guildSelf","")}export default j
//# sourceMappingURL=profileInjectGuildRel-7b38232c.js.map
