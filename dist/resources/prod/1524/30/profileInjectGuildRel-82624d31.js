import{Y as e,B as s,H as t,i as o,_ as r}from"./calfSystem-6459f18a.js"
import"./playerName-d1c3e398.js"
import{t as a}from"./toLowerCase-5e186769.js"
import"./onlineDot-6aa5ba99.js"
import"./batch-68f3579a.js"
import"./colouredDots-08b6011a.js"
import"./currentGuildId-da0b8fda.js"
import"./intValue-e8157483.js"
import"./valueText-29c7adc9.js"
import"./doStatTotal-7438349b.js"
import"./executeAll-be2ac0ec.js"
import{g as i}from"./profile-aec766fc.js"
import"./formToUrl-33859dc7.js"
import"./interceptSubmit-2837655b.js"
import{r as n}from"./replaceDoubleSpace-85926b11.js"
import"./csvSplit-1d6bbc93.js"
import{s as l}from"./shouldBeArray-e186ab2c.js"
import{g as d,a as c}from"./getIsOwnGuild-9b05c4d3.js"
const m=[["self","fshGreen","guildSelfMessage"],["friendly","fshOliveDrab","guildFrndMessage"],["old","fshDarkCyan","guildPastMessage"],["enemy","fshRed","guildEnmyMessage"]],f=[["guildFrnd","friendly"],["guildPast","old"],["guildEnmy","enemy"]]
function p(e){const s=l(e)
return s?s.map(n).map(a):[]}function u(t){return c()?(e("guildSelf",s(t)),"self"):function(e){const s=f.map(([e,s])=>[p(e),s]),t=n(a(e)),o=s.find(([e])=>e.includes(t))
if(o)return o[1]}(s(t))}function j(e){const s=u(e)
s&&function(e,s){const[,a,i]=m.find(([e])=>e===s)
e.parentNode.classList.add(a)
const n=t(i)
n&&n.length>0&&o(e.parentNode,"<br>"+r(n))}(e,s)}function g(){const s=d()
s?j(s):i()&&e("guildSelf","")}export default g
//# sourceMappingURL=profileInjectGuildRel-82624d31.js.map
