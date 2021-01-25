import{_ as e,B as s,H as t,i as a,a0 as o}from"./calfSystem-19a5d332.js"
import{g as r,a as i}from"./getIsOwnGuild-292e0ced.js"
import{g as n}from"./profile-2583cb22.js"
import{r as l}from"./replaceDoubleSpace-856176a4.js"
import{s as d}from"./shouldBeArray-63bb1c4a.js"
import{t as c}from"./toLowerCase-ace931b6.js"
import"./currentGuildId-daa4c793.js"
import"./colouredDots-797c1a21.js"
import"./batch-2bc71ae7.js"
import"./onlineDot-f2638c3d.js"
import"./doStatTotal-6503c402.js"
import"./executeAll-f8eab1e4.js"
import"./playerName-09521e4e.js"
import"./intValue-da5ad0eb.js"
import"./valueText-c9c4edc1.js"
import"./interceptSubmit-6d528c47.js"
import"./formToUrl-8a3e8d2a.js"
import"./csvSplit-a4e91aa0.js"
const m=[["self","fshGreen","guildSelfMessage"],["friendly","fshOliveDrab","guildFrndMessage"],["old","fshDarkCyan","guildPastMessage"],["enemy","fshRed","guildEnmyMessage"]],f=[["guildFrnd","friendly"],["guildPast","old"],["guildEnmy","enemy"]]
function p(e){const s=d(e)
return s?s.map(l).map(c):[]}function u(t){return i()?(e("guildSelf",s(t)),"self"):function(e){const s=f.map((([e,s])=>[p(e),s])),t=l(c(e)),a=s.find((([e])=>e.includes(t)))
if(a)return a[1]}(s(t))}function j(e){const s=u(e)
s&&function(e,s){const[,r,i]=m.find((([e])=>e===s))
e.parentNode.classList.add(r)
const n=t(i)
n&&n.length>0&&a(e.parentNode,`<br>${o(n)}`)}(e,s)}function g(){const s=r()
s?j(s):n()&&e("guildSelf","")}export default g
//# sourceMappingURL=profileInjectGuildRel-7c9e4af6.js.map
