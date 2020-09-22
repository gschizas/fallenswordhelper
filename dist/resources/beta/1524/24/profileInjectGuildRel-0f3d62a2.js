import{Y as e,B as s,H as t,i as o,_ as r}from"./calfSystem-019a589c.js"
import"./playerName-6eb83d57.js"
import{t as a}from"./toLowerCase-2f55d839.js"
import"./onlineDot-78d506d7.js"
import"./batch-e42a9cfa.js"
import"./colouredDots-43d784a6.js"
import"./currentGuildId-29e13ecc.js"
import"./intValue-44683b42.js"
import"./valueText-5851fcdc.js"
import"./doStatTotal-8e5283b8.js"
import{g as i}from"./profile-3a0c68d6.js"
import"./formToUrl-c83543e1.js"
import"./interceptSubmit-ae6fd26f.js"
import{r as n}from"./replaceDoubleSpace-3d54502a.js"
import"./csvSplit-dcc6dfc9.js"
import{s as d}from"./shouldBeArray-ae49b53b.js"
import{g as l,a as f}from"./getIsOwnGuild-a5603360.js"
const c=[["self","fshGreen","guildSelfMessage"],["friendly","fshOliveDrab","guildFrndMessage"],["old","fshDarkCyan","guildPastMessage"],["enemy","fshRed","guildEnmyMessage"]],m=[["guildFrnd","friendly"],["guildPast","old"],["guildEnmy","enemy"]]
function p(e){const s=d(e)
return s?s.map(n).map(a):[]}function u(t){return f()?(e("guildSelf",s(t)),"self"):function(e){const s=m.map(([e,s])=>[p(e),s]),t=n(a(e)),o=s.find(([e])=>e.includes(t))
if(o)return o[1]}(s(t))}function g(e){const s=u(e)
s&&function(e,s){const[,a,i]=c.find(([e])=>e===s)
e.parentNode.classList.add(a)
const n=t(i)
n&&n.length>0&&o(e.parentNode,"<br>"+r(n))}(e,s)}function j(){const s=l()
s?g(s):i()&&e("guildSelf","")}export default j
//# sourceMappingURL=profileInjectGuildRel-0f3d62a2.js.map
