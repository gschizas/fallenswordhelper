import{Z as e,B as s,H as t,i as o,$ as r}from"./calfSystem-02c48ff5.js"
import"./playerName-5ca71009.js"
import{t as i}from"./toLowerCase-0a22477f.js"
import"./onlineDot-a1876042.js"
import"./batch-a00528f6.js"
import"./colouredDots-11b94259.js"
import"./currentGuildId-cefcefd6.js"
import"./intValue-f94761c7.js"
import"./valueText-65f55d5b.js"
import"./doStatTotal-0f1280ea.js"
import"./executeAll-18adff71.js"
import{g as a}from"./profile-0715d6b1.js"
import"./formToUrl-b49ee3b5.js"
import"./interceptSubmit-43d7e549.js"
import{r as f}from"./replaceDoubleSpace-89ffec51.js"
import"./csvSplit-b214d56b.js"
import{s as n}from"./shouldBeArray-d5fbec0d.js"
import{g as d,a as l}from"./getIsOwnGuild-f5b69dd0.js"
const m=[["self","fshGreen","guildSelfMessage"],["friendly","fshOliveDrab","guildFrndMessage"],["old","fshDarkCyan","guildPastMessage"],["enemy","fshRed","guildEnmyMessage"]],c=[["guildFrnd","friendly"],["guildPast","old"],["guildEnmy","enemy"]]
function p(e){const s=n(e)
return s?s.map(f).map(i):[]}function u(t){return l()?(e("guildSelf",s(t)),"self"):function(e){const s=c.map(([e,s])=>[p(e),s]),t=f(i(e)),o=s.find(([e])=>e.includes(t))
if(o)return o[1]}(s(t))}function j(e){const s=u(e)
s&&function(e,s){const[,i,a]=m.find(([e])=>e===s)
e.parentNode.classList.add(i)
const f=t(a)
f&&f.length>0&&o(e.parentNode,"<br>"+r(f))}(e,s)}function g(){const s=d()
s?j(s):a()&&e("guildSelf","")}export default g
//# sourceMappingURL=profileInjectGuildRel-0f1646c2.js.map
