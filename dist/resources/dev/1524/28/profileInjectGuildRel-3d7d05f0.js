import{Z as e,B as s,H as t,i as o,$ as r}from"./calfSystem-b136673a.js"
import"./playerName-f933c87f.js"
import{t as a}from"./toLowerCase-27ea448e.js"
import"./onlineDot-3f2bf154.js"
import"./batch-277d0ee9.js"
import"./colouredDots-e672a8e8.js"
import"./currentGuildId-4405d1bb.js"
import"./intValue-f4d85578.js"
import"./valueText-90e91fab.js"
import"./doStatTotal-82bf23eb.js"
import"./executeAll-3d4e4221.js"
import{g as i}from"./profile-e092da47.js"
import"./formToUrl-1d96bdd4.js"
import"./interceptSubmit-957549ab.js"
import{r as n}from"./replaceDoubleSpace-bdb86519.js"
import"./csvSplit-ab694daa.js"
import{s as d}from"./shouldBeArray-f0a179d2.js"
import{g as l,a as f}from"./getIsOwnGuild-d7aae9c9.js"
const m=[["self","fshGreen","guildSelfMessage"],["friendly","fshOliveDrab","guildFrndMessage"],["old","fshDarkCyan","guildPastMessage"],["enemy","fshRed","guildEnmyMessage"]],p=[["guildFrnd","friendly"],["guildPast","old"],["guildEnmy","enemy"]]
function u(e){const s=d(e)
return s?s.map(n).map(a):[]}function c(t){return f()?(e("guildSelf",s(t)),"self"):function(e){const s=p.map(([e,s])=>[u(e),s]),t=n(a(e)),o=s.find(([e])=>e.includes(t))
if(o)return o[1]}(s(t))}function j(e){const s=c(e)
s&&function(e,s){const[,a,i]=m.find(([e])=>e===s)
e.parentNode.classList.add(a)
const n=t(i)
n&&n.length>0&&o(e.parentNode,"<br>"+r(n))}(e,s)}function b(){const s=l()
s?j(s):i()&&e("guildSelf","")}export default b
//# sourceMappingURL=profileInjectGuildRel-3d7d05f0.js.map
