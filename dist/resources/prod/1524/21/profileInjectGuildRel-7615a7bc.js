import{Y as s,B as e,G as t,i as a,_ as o}from"./calfSystem-2741d97b.js"
import"./playerName-5fbf0efe.js"
import{t as r}from"./toLowerCase-a2d79d4b.js"
import"./onlineDot-f6177bb2.js"
import"./batch-835abad1.js"
import"./colouredDots-b06d7daf.js"
import"./currentGuildId-2c5ea0ad.js"
import"./intValue-1a593541.js"
import"./valueText-9aacf9d4.js"
import"./doStatTotal-70ec844a.js"
import{g as i}from"./profile-74acb2a5.js"
import"./formToUrl-d134536c.js"
import"./interceptSubmit-60aabec1.js"
import{r as n}from"./replaceDoubleSpace-060109a0.js"
import"./csvSplit-566a136d.js"
import{s as d}from"./shouldBeArray-f8476c4b.js"
import{g as l,a as f}from"./getIsOwnGuild-938b333b.js"
const m=[["self","fshGreen","guildSelfMessage"],["friendly","fshOliveDrab","guildFrndMessage"],["old","fshDarkCyan","guildPastMessage"],["enemy","fshRed","guildEnmyMessage"]],c=[["guildFrnd","friendly"],["guildPast","old"],["guildEnmy","enemy"]]
function p(s){const e=d(s)
return e?e.map(n).map(r):[]}function u(t){return f()?(s("guildSelf",e(t)),"self"):function(s){const e=c.map(([s,e])=>[p(s),e]),t=n(r(s)),a=e.find(([s])=>s.includes(t))
if(a)return a[1]}(e(t))}function b(s){const e=u(s)
e&&function(s,e){const[,r,i]=m.find(([s])=>s===e)
s.parentNode.classList.add(r)
const n=t(i)
n&&n.length>0&&a(s.parentNode,"<br>"+o(n))}(s,e)}export default function(){const e=l()
e?b(e):i()&&s("guildSelf","")}
//# sourceMappingURL=profileInjectGuildRel-7615a7bc.js.map
