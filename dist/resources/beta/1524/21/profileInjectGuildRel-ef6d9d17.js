import{Y as e,B as s,G as t,i as o,_ as r}from"./calfSystem-89b939c8.js"
import"./playerName-8ec11865.js"
import{t as i}from"./toLowerCase-5d1ed3f8.js"
import"./onlineDot-3ced5a13.js"
import"./batch-e839e453.js"
import"./colouredDots-b8776b25.js"
import"./currentGuildId-ae8f3699.js"
import"./intValue-cd93b930.js"
import"./valueText-bfc7b590.js"
import"./doStatTotal-a01a19ff.js"
import{g as a}from"./profile-ddee92c4.js"
import"./formToUrl-ae369bee.js"
import"./interceptSubmit-57a8cf95.js"
import{r as n}from"./replaceDoubleSpace-8f34944b.js"
import"./csvSplit-7b854e44.js"
import{s as f}from"./shouldBeArray-2ee951b5.js"
import{g as l,a as d}from"./getIsOwnGuild-c1cf9da7.js"
const m=[["self","fshGreen","guildSelfMessage"],["friendly","fshOliveDrab","guildFrndMessage"],["old","fshDarkCyan","guildPastMessage"],["enemy","fshRed","guildEnmyMessage"]],c=[["guildFrnd","friendly"],["guildPast","old"],["guildEnmy","enemy"]]
function p(e){const s=f(e)
return s?s.map(n).map(i):[]}function u(t){return d()?(e("guildSelf",s(t)),"self"):function(e){const s=c.map(([e,s])=>[p(e),s]),t=n(i(e)),o=s.find(([e])=>e.includes(t))
if(o)return o[1]}(s(t))}function g(e){const s=u(e)
s&&function(e,s){const[,i,a]=m.find(([e])=>e===s)
e.parentNode.classList.add(i)
const n=t(a)
n&&n.length>0&&o(e.parentNode,"<br>"+r(n))}(e,s)}export default function(){const s=l()
s?g(s):a()&&e("guildSelf","")}
//# sourceMappingURL=profileInjectGuildRel-ef6d9d17.js.map
