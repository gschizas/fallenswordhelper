import{Y as e,B as s,H as t,i as o,_ as r}from"./calfSystem-d3aab5a8.js"
import"./playerName-6a2b4679.js"
import{t as a}from"./toLowerCase-c42114e1.js"
import"./onlineDot-f41c7d87.js"
import"./batch-8971e6ac.js"
import"./colouredDots-eecfe1a5.js"
import"./currentGuildId-b5159547.js"
import"./intValue-65d3c36c.js"
import"./valueText-00c55739.js"
import"./doStatTotal-5defe8e4.js"
import{g as i}from"./profile-60d69902.js"
import"./formToUrl-19959c48.js"
import"./interceptSubmit-07270cc9.js"
import{r as n}from"./replaceDoubleSpace-08433fa1.js"
import"./csvSplit-8c1a6c7f.js"
import{s as l}from"./shouldBeArray-2c799eba.js"
import{g as c,a as d}from"./getIsOwnGuild-92ab65a1.js"
const f=[["self","fshGreen","guildSelfMessage"],["friendly","fshOliveDrab","guildFrndMessage"],["old","fshDarkCyan","guildPastMessage"],["enemy","fshRed","guildEnmyMessage"]],m=[["guildFrnd","friendly"],["guildPast","old"],["guildEnmy","enemy"]]
function p(e){const s=l(e)
return s?s.map(n).map(a):[]}function u(t){return d()?(e("guildSelf",s(t)),"self"):function(e){const s=m.map(([e,s])=>[p(e),s]),t=n(a(e)),o=s.find(([e])=>e.includes(t))
if(o)return o[1]}(s(t))}function g(e){const s=u(e)
s&&function(e,s){const[,a,i]=f.find(([e])=>e===s)
e.parentNode.classList.add(a)
const n=t(i)
n&&n.length>0&&o(e.parentNode,"<br>"+r(n))}(e,s)}function j(){const s=c()
s?g(s):i()&&e("guildSelf","")}export default j
//# sourceMappingURL=profileInjectGuildRel-c37afc99.js.map
