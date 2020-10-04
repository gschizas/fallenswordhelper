import{_ as e,B as s,H as t,i as o,a0 as r}from"./calfSystem-ec5e5725.js"
import"./playerName-6b140f29.js"
import{t as a}from"./toLowerCase-33399b5a.js"
import"./onlineDot-e6873f1e.js"
import"./batch-da424537.js"
import"./colouredDots-f4434fa4.js"
import"./currentGuildId-4732beaa.js"
import"./intValue-ef353ded.js"
import"./valueText-f1c6f878.js"
import"./doStatTotal-089574b8.js"
import{g as i}from"./profile-9ad1b078.js"
import"./formToUrl-9589262c.js"
import"./interceptSubmit-540c8b15.js"
import{r as n}from"./replaceDoubleSpace-c42a8c25.js"
import"./csvSplit-c9226810.js"
import{s as f}from"./shouldBeArray-b27cd0e8.js"
import{g as l,a as d}from"./getIsOwnGuild-161f8289.js"
const m=[["self","fshGreen","guildSelfMessage"],["friendly","fshOliveDrab","guildFrndMessage"],["old","fshDarkCyan","guildPastMessage"],["enemy","fshRed","guildEnmyMessage"]],c=[["guildFrnd","friendly"],["guildPast","old"],["guildEnmy","enemy"]]
function p(e){const s=f(e)
return s?s.map(n).map(a):[]}function u(t){return d()?(e("guildSelf",s(t)),"self"):function(e){const s=c.map(([e,s])=>[p(e),s]),t=n(a(e)),o=s.find(([e])=>e.includes(t))
if(o)return o[1]}(s(t))}function g(e){const s=u(e)
s&&function(e,s){const[,a,i]=m.find(([e])=>e===s)
e.parentNode.classList.add(a)
const n=t(i)
n&&n.length>0&&o(e.parentNode,"<br>"+r(n))}(e,s)}function j(){const s=l()
s?g(s):i()&&e("guildSelf","")}export default j
//# sourceMappingURL=profileInjectGuildRel-4e82c748.js.map
