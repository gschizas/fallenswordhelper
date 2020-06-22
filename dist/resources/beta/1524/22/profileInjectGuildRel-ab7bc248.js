import{Y as s,B as e,G as t,i as o,_ as r}from"./calfSystem-1b876afa.js"
import"./playerName-14ec00f6.js"
import{t as i}from"./toLowerCase-128bd9cb.js"
import"./onlineDot-810a0302.js"
import"./batch-df466c20.js"
import"./colouredDots-dcd3ecc5.js"
import"./currentGuildId-000cb2c0.js"
import"./intValue-4dd66c70.js"
import"./valueText-266fd211.js"
import"./doStatTotal-d1242778.js"
import{g as a}from"./profile-314ff588.js"
import"./formToUrl-cdc17fa4.js"
import"./interceptSubmit-8946388b.js"
import{r as n}from"./replaceDoubleSpace-8ecc2825.js"
import"./csvSplit-e0564c5b.js"
import{s as f}from"./shouldBeArray-c3bb627f.js"
import{g as d,a as c}from"./getIsOwnGuild-f4f2e7ff.js"
const l=[["self","fshGreen","guildSelfMessage"],["friendly","fshOliveDrab","guildFrndMessage"],["old","fshDarkCyan","guildPastMessage"],["enemy","fshRed","guildEnmyMessage"]],m=[["guildFrnd","friendly"],["guildPast","old"],["guildEnmy","enemy"]]
function p(s){const e=f(s)
return e?e.map(n).map(i):[]}function u(t){return c()?(s("guildSelf",e(t)),"self"):function(s){const e=m.map(([s,e])=>[p(s),e]),t=n(i(s)),o=e.find(([s])=>s.includes(t))
if(o)return o[1]}(e(t))}function g(s){const e=u(s)
e&&function(s,e){const[,i,a]=l.find(([s])=>s===e)
s.parentNode.classList.add(i)
const n=t(a)
n&&n.length>0&&o(s.parentNode,"<br>"+r(n))}(s,e)}export default function(){const e=d()
e?g(e):a()&&s("guildSelf","")}
//# sourceMappingURL=profileInjectGuildRel-ab7bc248.js.map
