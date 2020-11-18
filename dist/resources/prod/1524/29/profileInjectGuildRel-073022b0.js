import{Y as e,B as s,H as t,i as o,_ as r}from"./calfSystem-57628ebe.js"
import"./playerName-d617838d.js"
import{t as i}from"./toLowerCase-0a22477f.js"
import"./onlineDot-aa286806.js"
import"./batch-b6de9fa7.js"
import"./colouredDots-964dd7e9.js"
import"./currentGuildId-909a3fed.js"
import"./intValue-f94761c7.js"
import"./valueText-a430d398.js"
import"./doStatTotal-59cd65f6.js"
import"./executeAll-18adff71.js"
import{g as a}from"./profile-339631b9.js"
import"./formToUrl-ed8f6bd0.js"
import"./interceptSubmit-42e92144.js"
import{r as n}from"./replaceDoubleSpace-89ffec51.js"
import"./csvSplit-b214d56b.js"
import{s as d}from"./shouldBeArray-2a74e3f9.js"
import{g as f,a as l}from"./getIsOwnGuild-64030e21.js"
const m=[["self","fshGreen","guildSelfMessage"],["friendly","fshOliveDrab","guildFrndMessage"],["old","fshDarkCyan","guildPastMessage"],["enemy","fshRed","guildEnmyMessage"]],p=[["guildFrnd","friendly"],["guildPast","old"],["guildEnmy","enemy"]]
function u(e){const s=d(e)
return s?s.map(n).map(i):[]}function c(t){return l()?(e("guildSelf",s(t)),"self"):function(e){const s=p.map(([e,s])=>[u(e),s]),t=n(i(e)),o=s.find(([e])=>e.includes(t))
if(o)return o[1]}(s(t))}function j(e){const s=c(e)
s&&function(e,s){const[,i,a]=m.find(([e])=>e===s)
e.parentNode.classList.add(i)
const n=t(a)
n&&n.length>0&&o(e.parentNode,"<br>"+r(n))}(e,s)}function g(){const s=f()
s?j(s):a()&&e("guildSelf","")}export default g
//# sourceMappingURL=profileInjectGuildRel-073022b0.js.map
