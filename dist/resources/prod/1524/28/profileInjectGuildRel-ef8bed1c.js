import{Y as e,B as s,H as t,i as o,_ as a}from"./calfSystem-a5da5210.js"
import"./playerName-22f2b3f0.js"
import{t as r}from"./toLowerCase-27ea448e.js"
import"./onlineDot-ae5ba72d.js"
import"./batch-948dbb93.js"
import"./colouredDots-376a183f.js"
import"./currentGuildId-87288eec.js"
import"./intValue-f4d85578.js"
import"./valueText-92f43a8d.js"
import"./doStatTotal-2508e931.js"
import"./executeAll-3d4e4221.js"
import{g as i}from"./profile-6b07ab1a.js"
import"./formToUrl-6151060b.js"
import"./interceptSubmit-9e7a42eb.js"
import{r as n}from"./replaceDoubleSpace-bdb86519.js"
import"./csvSplit-ab694daa.js"
import{s as l}from"./shouldBeArray-ce366392.js"
import{g as d,a as f}from"./getIsOwnGuild-6ec2868d.js"
const m=[["self","fshGreen","guildSelfMessage"],["friendly","fshOliveDrab","guildFrndMessage"],["old","fshDarkCyan","guildPastMessage"],["enemy","fshRed","guildEnmyMessage"]],p=[["guildFrnd","friendly"],["guildPast","old"],["guildEnmy","enemy"]]
function u(e){const s=l(e)
return s?s.map(n).map(r):[]}function c(t){return f()?(e("guildSelf",s(t)),"self"):function(e){const s=p.map(([e,s])=>[u(e),s]),t=n(r(e)),o=s.find(([e])=>e.includes(t))
if(o)return o[1]}(s(t))}function j(e){const s=c(e)
s&&function(e,s){const[,r,i]=m.find(([e])=>e===s)
e.parentNode.classList.add(r)
const n=t(i)
n&&n.length>0&&o(e.parentNode,"<br>"+a(n))}(e,s)}function g(){const s=d()
s?j(s):i()&&e("guildSelf","")}export default g
//# sourceMappingURL=profileInjectGuildRel-ef8bed1c.js.map
