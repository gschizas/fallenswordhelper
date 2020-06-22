import{Y as e,B as s,G as t,i as o,_ as r}from"./calfSystem-d04e4be4.js"
import"./playerName-a036237e.js"
import{t as i}from"./toLowerCase-17c594e8.js"
import"./onlineDot-b6dabd61.js"
import"./batch-d4516178.js"
import"./colouredDots-5fffd6a1.js"
import"./currentGuildId-9ae9b1fe.js"
import"./intValue-ec94378e.js"
import"./valueText-bd7566e4.js"
import"./doStatTotal-a4b51cbd.js"
import{g as a}from"./profile-f62099cd.js"
import"./formToUrl-3c899008.js"
import"./interceptSubmit-24b16034.js"
import{r as n}from"./replaceDoubleSpace-7cb11956.js"
import"./csvSplit-ebdb220a.js"
import{s as d}from"./shouldBeArray-591bfac9.js"
import{g as l,a as f}from"./getIsOwnGuild-7c85e920.js"
const m=[["self","fshGreen","guildSelfMessage"],["friendly","fshOliveDrab","guildFrndMessage"],["old","fshDarkCyan","guildPastMessage"],["enemy","fshRed","guildEnmyMessage"]],c=[["guildFrnd","friendly"],["guildPast","old"],["guildEnmy","enemy"]]
function p(e){const s=d(e)
return s?s.map(n).map(i):[]}function u(t){return f()?(e("guildSelf",s(t)),"self"):function(e){const s=c.map(([e,s])=>[p(e),s]),t=n(i(e)),o=s.find(([e])=>e.includes(t))
if(o)return o[1]}(s(t))}function b(e){const s=u(e)
s&&function(e,s){const[,i,a]=m.find(([e])=>e===s)
e.parentNode.classList.add(i)
const n=t(a)
n&&n.length>0&&o(e.parentNode,"<br>"+r(n))}(e,s)}export default function(){const s=l()
s?b(s):a()&&e("guildSelf","")}
//# sourceMappingURL=profileInjectGuildRel-6b5dbfa7.js.map
