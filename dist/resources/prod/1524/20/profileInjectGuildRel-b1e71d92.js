import{Y as e,B as s,G as t,i as o,_ as r}from"./calfSystem-03970067.js"
import"./playerName-e0979c8e.js"
import{t as i}from"./toLowerCase-5a7ad345.js"
import"./onlineDot-e09bcdeb.js"
import"./batch-dfc92608.js"
import"./colouredDots-d1b69d53.js"
import"./currentGuildId-cce6862b.js"
import"./intValue-0d844fc4.js"
import"./valueText-49d1445b.js"
import"./doStatTotal-85eb4928.js"
import{g as a}from"./profile-31bb0967.js"
import"./formToUrl-906ab550.js"
import"./interceptSubmit-e3519b7d.js"
import{r as n}from"./replaceDoubleSpace-2c9eaf9b.js"
import"./csvSplit-a1c5f5ec.js"
import{s as d}from"./shouldBeArray-a3c24456.js"
import{g as l,a as f}from"./getIsOwnGuild-22a187f1.js"
const m=[["self","fshGreen","guildSelfMessage"],["friendly","fshOliveDrab","guildFrndMessage"],["old","fshDarkCyan","guildPastMessage"],["enemy","fshRed","guildEnmyMessage"]],c=[["guildFrnd","friendly"],["guildPast","old"],["guildEnmy","enemy"]]
function p(e){const s=d(e)
return s?s.map(n).map(i):[]}function u(t){return f()?(e("guildSelf",s(t)),"self"):function(e){const s=c.map(([e,s])=>[p(e),s]),t=n(i(e)),o=s.find(([e])=>e.includes(t))
if(o)return o[1]}(s(t))}function g(e){const s=u(e)
s&&function(e,s){const[,i,a]=m.find(([e])=>e===s)
e.parentNode.classList.add(i)
const n=t(a)
n&&n.length>0&&o(e.parentNode,"<br>"+r(n))}(e,s)}export default function(){const s=l()
s?g(s):a()&&e("guildSelf","")}
//# sourceMappingURL=profileInjectGuildRel-b1e71d92.js.map
