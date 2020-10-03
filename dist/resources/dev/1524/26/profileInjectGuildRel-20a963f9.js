import{Z as s,B as e,H as t,i as o,$ as r}from"./calfSystem-4991bf5b.js"
import"./playerName-69861ead.js"
import{t as a}from"./toLowerCase-b21b7cc8.js"
import"./onlineDot-7a595667.js"
import"./batch-4fce760b.js"
import"./colouredDots-4bc29b70.js"
import"./currentGuildId-56c2c861.js"
import"./intValue-e4cdd281.js"
import"./valueText-4b5d9d8a.js"
import"./doStatTotal-5899a68b.js"
import{g as i}from"./profile-90866045.js"
import"./formToUrl-66bca9f7.js"
import"./interceptSubmit-c0a2dd00.js"
import{r as n}from"./replaceDoubleSpace-3242d7f7.js"
import"./csvSplit-653f6227.js"
import{s as d}from"./shouldBeArray-9d10ad66.js"
import{g as l,a as f}from"./getIsOwnGuild-808945ae.js"
const m=[["self","fshGreen","guildSelfMessage"],["friendly","fshOliveDrab","guildFrndMessage"],["old","fshDarkCyan","guildPastMessage"],["enemy","fshRed","guildEnmyMessage"]],c=[["guildFrnd","friendly"],["guildPast","old"],["guildEnmy","enemy"]]
function p(s){const e=d(s)
return e?e.map(n).map(a):[]}function u(t){return f()?(s("guildSelf",e(t)),"self"):function(s){const e=c.map(([s,e])=>[p(s),e]),t=n(a(s)),o=e.find(([s])=>s.includes(t))
if(o)return o[1]}(e(t))}function g(s){const e=u(s)
e&&function(s,e){const[,a,i]=m.find(([s])=>s===e)
s.parentNode.classList.add(a)
const n=t(i)
n&&n.length>0&&o(s.parentNode,"<br>"+r(n))}(s,e)}function j(){const e=l()
e?g(e):i()&&s("guildSelf","")}export default j
//# sourceMappingURL=profileInjectGuildRel-20a963f9.js.map
