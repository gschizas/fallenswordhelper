import{Z as e,B as s,H as t,i as o,$ as r}from"./calfSystem-3bdf319e.js"
import"./playerName-26a1f7d9.js"
import{t as a}from"./toLowerCase-33399b5a.js"
import"./onlineDot-d9e2b3a9.js"
import"./batch-06380bde.js"
import"./colouredDots-1ad7dddc.js"
import"./currentGuildId-e8170186.js"
import"./intValue-ef353ded.js"
import"./valueText-0f01a014.js"
import"./doStatTotal-ad5f150e.js"
import{g as i}from"./profile-056a3cb4.js"
import"./formToUrl-6c242df5.js"
import"./interceptSubmit-5104e4a5.js"
import{r as n}from"./replaceDoubleSpace-c42a8c25.js"
import"./csvSplit-c9226810.js"
import{s as d}from"./shouldBeArray-4ca937db.js"
import{g as l,a as f}from"./getIsOwnGuild-6e0fb866.js"
const m=[["self","fshGreen","guildSelfMessage"],["friendly","fshOliveDrab","guildFrndMessage"],["old","fshDarkCyan","guildPastMessage"],["enemy","fshRed","guildEnmyMessage"]],c=[["guildFrnd","friendly"],["guildPast","old"],["guildEnmy","enemy"]]
function p(e){const s=d(e)
return s?s.map(n).map(a):[]}function u(t){return f()?(e("guildSelf",s(t)),"self"):function(e){const s=c.map(([e,s])=>[p(e),s]),t=n(a(e)),o=s.find(([e])=>e.includes(t))
if(o)return o[1]}(s(t))}function g(e){const s=u(e)
s&&function(e,s){const[,a,i]=m.find(([e])=>e===s)
e.parentNode.classList.add(a)
const n=t(i)
n&&n.length>0&&o(e.parentNode,"<br>"+r(n))}(e,s)}function j(){const s=l()
s?g(s):i()&&e("guildSelf","")}export default j
//# sourceMappingURL=profileInjectGuildRel-eba7b033.js.map
