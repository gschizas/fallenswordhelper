import{Y as e,B as s,H as t,i as o,_ as r}from"./calfSystem-964f4fc9.js"
import"./playerName-19c0b1a7.js"
import{t as a}from"./toLowerCase-27ea448e.js"
import"./onlineDot-8bb6540e.js"
import"./batch-e3296e27.js"
import"./colouredDots-78a9b63d.js"
import"./currentGuildId-26c6bca8.js"
import"./intValue-f4d85578.js"
import"./valueText-9fa15adc.js"
import"./doStatTotal-8d3692eb.js"
import"./executeAll-3d4e4221.js"
import{g as i}from"./profile-2414b3be.js"
import"./formToUrl-d1b2482f.js"
import"./interceptSubmit-ddb18ec3.js"
import{r as n}from"./replaceDoubleSpace-bdb86519.js"
import"./csvSplit-ab694daa.js"
import{s as d}from"./shouldBeArray-3d674ae6.js"
import{g as l,a as f}from"./getIsOwnGuild-49882224.js"
const m=[["self","fshGreen","guildSelfMessage"],["friendly","fshOliveDrab","guildFrndMessage"],["old","fshDarkCyan","guildPastMessage"],["enemy","fshRed","guildEnmyMessage"]],c=[["guildFrnd","friendly"],["guildPast","old"],["guildEnmy","enemy"]]
function p(e){const s=d(e)
return s?s.map(n).map(a):[]}function u(t){return f()?(e("guildSelf",s(t)),"self"):function(e){const s=c.map(([e,s])=>[p(e),s]),t=n(a(e)),o=s.find(([e])=>e.includes(t))
if(o)return o[1]}(s(t))}function b(e){const s=u(e)
s&&function(e,s){const[,a,i]=m.find(([e])=>e===s)
e.parentNode.classList.add(a)
const n=t(i)
n&&n.length>0&&o(e.parentNode,"<br>"+r(n))}(e,s)}function j(){const s=l()
s?b(s):i()&&e("guildSelf","")}export default j
//# sourceMappingURL=profileInjectGuildRel-3e646dbc.js.map
