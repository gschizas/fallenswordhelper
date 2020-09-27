import{Y as e,B as s,H as t,i as o,_ as r}from"./calfSystem-71b9378d.js"
import"./playerName-17bbea9d.js"
import{t as i}from"./toLowerCase-c42114e1.js"
import"./onlineDot-4f9ab5c3.js"
import"./batch-151895c0.js"
import"./colouredDots-10fbd2da.js"
import"./currentGuildId-58e8f97e.js"
import"./intValue-65d3c36c.js"
import"./valueText-4f638fd7.js"
import"./doStatTotal-f1c3cd46.js"
import{g as a}from"./profile-678af0d6.js"
import"./formToUrl-203c6ff2.js"
import"./interceptSubmit-c92da7b4.js"
import{r as n}from"./replaceDoubleSpace-08433fa1.js"
import"./csvSplit-8c1a6c7f.js"
import{s as f}from"./shouldBeArray-0139e4ee.js"
import{g as d,a as l}from"./getIsOwnGuild-46322b8e.js"
const c=[["self","fshGreen","guildSelfMessage"],["friendly","fshOliveDrab","guildFrndMessage"],["old","fshDarkCyan","guildPastMessage"],["enemy","fshRed","guildEnmyMessage"]],m=[["guildFrnd","friendly"],["guildPast","old"],["guildEnmy","enemy"]]
function p(e){const s=f(e)
return s?s.map(n).map(i):[]}function u(t){return l()?(e("guildSelf",s(t)),"self"):function(e){const s=m.map(([e,s])=>[p(e),s]),t=n(i(e)),o=s.find(([e])=>e.includes(t))
if(o)return o[1]}(s(t))}function g(e){const s=u(e)
s&&function(e,s){const[,i,a]=c.find(([e])=>e===s)
e.parentNode.classList.add(i)
const n=t(a)
n&&n.length>0&&o(e.parentNode,"<br>"+r(n))}(e,s)}function j(){const s=d()
s?g(s):a()&&e("guildSelf","")}export default j
//# sourceMappingURL=profileInjectGuildRel-d2b16d38.js.map
