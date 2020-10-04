import{Z as e,B as s,H as t,i as o,$ as r}from"./calfSystem-70c7a660.js"
import"./playerName-d7dd0a91.js"
import{t as a}from"./toLowerCase-33399b5a.js"
import"./onlineDot-0c0af287.js"
import"./batch-e1df795d.js"
import"./colouredDots-e8d00daa.js"
import"./currentGuildId-b3e9b6a5.js"
import"./intValue-ef353ded.js"
import"./valueText-6c1d3d77.js"
import"./doStatTotal-73e4ca4c.js"
import{g as i}from"./profile-6e38dc04.js"
import"./formToUrl-05384153.js"
import"./interceptSubmit-96d20d60.js"
import{r as d}from"./replaceDoubleSpace-c42a8c25.js"
import"./csvSplit-c9226810.js"
import{s as n}from"./shouldBeArray-e5283ce6.js"
import{g as l,a as c}from"./getIsOwnGuild-64cac18b.js"
const m=[["self","fshGreen","guildSelfMessage"],["friendly","fshOliveDrab","guildFrndMessage"],["old","fshDarkCyan","guildPastMessage"],["enemy","fshRed","guildEnmyMessage"]],f=[["guildFrnd","friendly"],["guildPast","old"],["guildEnmy","enemy"]]
function p(e){const s=n(e)
return s?s.map(d).map(a):[]}function u(t){return c()?(e("guildSelf",s(t)),"self"):function(e){const s=f.map(([e,s])=>[p(e),s]),t=d(a(e)),o=s.find(([e])=>e.includes(t))
if(o)return o[1]}(s(t))}function g(e){const s=u(e)
s&&function(e,s){const[,a,i]=m.find(([e])=>e===s)
e.parentNode.classList.add(a)
const d=t(i)
d&&d.length>0&&o(e.parentNode,"<br>"+r(d))}(e,s)}function j(){const s=l()
s?g(s):i()&&e("guildSelf","")}export default j
//# sourceMappingURL=profileInjectGuildRel-fbf431aa.js.map
