import{Z as e,B as s,H as t,i as a,$ as o}from"./calfSystem-26bcf570.js"
import{g as r,a as i}from"./getIsOwnGuild-b5417a67.js"
import{g as n}from"./profile-5c2922ec.js"
import{r as l}from"./replaceDoubleSpace-856176a4.js"
import{s as d}from"./shouldBeArray-74b2ac10.js"
import{t as c}from"./toLowerCase-ace931b6.js"
import"./currentGuildId-b9dbffa6.js"
import"./colouredDots-d47c6742.js"
import"./batch-ad31c053.js"
import"./onlineDot-018fc1c9.js"
import"./doStatTotal-e2c231bd.js"
import"./executeAll-f8eab1e4.js"
import"./playerName-7d235e41.js"
import"./intValue-da5ad0eb.js"
import"./valueText-60aa9d22.js"
import"./interceptSubmit-ac75d95b.js"
import"./formToUrl-ea3e8186.js"
import"./csvSplit-a4e91aa0.js"
const f=[["self","fshGreen","guildSelfMessage"],["friendly","fshOliveDrab","guildFrndMessage"],["old","fshDarkCyan","guildPastMessage"],["enemy","fshRed","guildEnmyMessage"]],m=[["guildFrnd","friendly"],["guildPast","old"],["guildEnmy","enemy"]]
function p(e){const s=d(e)
return s?s.map(l).map(c):[]}function u(t){return i()?(e("guildSelf",s(t)),"self"):function(e){const s=m.map((([e,s])=>[p(e),s])),t=l(c(e)),a=s.find((([e])=>e.includes(t)))
if(a)return a[1]}(s(t))}function j(e){const s=u(e)
s&&function(e,s){const[,r,i]=f.find((([e])=>e===s))
e.parentNode.classList.add(r)
const n=t(i)
n&&n.length>0&&a(e.parentNode,`<br>${o(n)}`)}(e,s)}function g(){const s=r()
s?j(s):n()&&e("guildSelf","")}export default g
//# sourceMappingURL=profileInjectGuildRel-6036ad1a.js.map
