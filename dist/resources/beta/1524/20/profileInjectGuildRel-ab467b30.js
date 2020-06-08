import{Y as e,B as s,G as t,i as o,_ as r}from"./calfSystem-05554bae.js"
import"./playerName-0e65dbb6.js"
import{t as a}from"./toLowerCase-4d1a2136.js"
import"./onlineDot-2dc99915.js"
import"./batch-62c1054e.js"
import"./colouredDots-bcbb39d3.js"
import"./currentGuildId-03628998.js"
import"./intValue-f723fc88.js"
import"./valueText-d9bb024d.js"
import"./doStatTotal-b24fc6c4.js"
import{g as i}from"./profile-a3a9990e.js"
import"./formToUrl-21fa7da6.js"
import"./interceptSubmit-399cf9b1.js"
import{r as n}from"./replaceDoubleSpace-7dc19566.js"
import"./csvSplit-d1d5e8a8.js"
import{s as d}from"./shouldBeArray-28316d52.js"
import{g as l,a as f}from"./getIsOwnGuild-afdeee21.js"
const m=[["self","fshGreen","guildSelfMessage"],["friendly","fshOliveDrab","guildFrndMessage"],["old","fshDarkCyan","guildPastMessage"],["enemy","fshRed","guildEnmyMessage"]],c=[["guildFrnd","friendly"],["guildPast","old"],["guildEnmy","enemy"]]
function p(e){const s=d(e)
return s?s.map(n).map(a):[]}function u(t){return f()?(e("guildSelf",s(t)),"self"):function(e){const s=c.map(([e,s])=>[p(e),s]),t=n(a(e)),o=s.find(([e])=>e.includes(t))
if(o)return o[1]}(s(t))}function g(e){const s=u(e)
s&&function(e,s){const[,a,i]=m.find(([e])=>e===s)
e.parentNode.classList.add(a)
const n=t(i)
n&&n.length>0&&o(e.parentNode,"<br>"+r(n))}(e,s)}export default function(){const s=l()
s?g(s):i()&&e("guildSelf","")}
//# sourceMappingURL=profileInjectGuildRel-ab467b30.js.map
