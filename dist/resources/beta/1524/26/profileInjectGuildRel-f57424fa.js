import{Y as s,B as e,H as t,i as o,_ as r}from"./calfSystem-cf4d22a7.js"
import"./playerName-b9ef36e6.js"
import{t as a}from"./toLowerCase-b21b7cc8.js"
import"./onlineDot-d0dbf176.js"
import"./batch-952c9055.js"
import"./colouredDots-aab2f633.js"
import"./currentGuildId-5763962b.js"
import"./intValue-e4cdd281.js"
import"./valueText-5ba89d31.js"
import"./doStatTotal-d19b95c3.js"
import{g as i}from"./profile-c3b714d7.js"
import"./formToUrl-31554e27.js"
import"./interceptSubmit-228afb85.js"
import{r as n}from"./replaceDoubleSpace-3242d7f7.js"
import"./csvSplit-653f6227.js"
import{s as d}from"./shouldBeArray-139ba05c.js"
import{g as l,a as f}from"./getIsOwnGuild-a7b1091a.js"
const m=[["self","fshGreen","guildSelfMessage"],["friendly","fshOliveDrab","guildFrndMessage"],["old","fshDarkCyan","guildPastMessage"],["enemy","fshRed","guildEnmyMessage"]],c=[["guildFrnd","friendly"],["guildPast","old"],["guildEnmy","enemy"]]
function p(s){const e=d(s)
return e?e.map(n).map(a):[]}function u(t){return f()?(s("guildSelf",e(t)),"self"):function(s){const e=c.map(([s,e])=>[p(s),e]),t=n(a(s)),o=e.find(([s])=>s.includes(t))
if(o)return o[1]}(e(t))}function b(s){const e=u(s)
e&&function(s,e){const[,a,i]=m.find(([s])=>s===e)
s.parentNode.classList.add(a)
const n=t(i)
n&&n.length>0&&o(s.parentNode,"<br>"+r(n))}(s,e)}function g(){const e=l()
e?b(e):i()&&s("guildSelf","")}export default g
//# sourceMappingURL=profileInjectGuildRel-f57424fa.js.map
