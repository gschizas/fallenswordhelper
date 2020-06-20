import{Z as e,B as s,G as t,i as o,$ as r}from"./calfSystem-9c7241dc.js"
import"./playerName-ddecc25a.js"
import{t as i}from"./toLowerCase-9b533dae.js"
import"./onlineDot-4bf0b1ba.js"
import"./batch-2ee31e9e.js"
import"./colouredDots-d1da220f.js"
import"./currentGuildId-00053b50.js"
import"./intValue-4cb61c79.js"
import"./valueText-2c80175b.js"
import"./doStatTotal-db2c1a58.js"
import{g as a}from"./profile-e69ee78c.js"
import"./formToUrl-39ed921f.js"
import"./interceptSubmit-9fc997ac.js"
import{r as n}from"./replaceDoubleSpace-0814c7b3.js"
import"./csvSplit-bf63d03b.js"
import{s as d}from"./shouldBeArray-0b1ce3ca.js"
import{g as l,a as c}from"./getIsOwnGuild-21fdd726.js"
const f=[["self","fshGreen","guildSelfMessage"],["friendly","fshOliveDrab","guildFrndMessage"],["old","fshDarkCyan","guildPastMessage"],["enemy","fshRed","guildEnmyMessage"]],m=[["guildFrnd","friendly"],["guildPast","old"],["guildEnmy","enemy"]]
function p(e){const s=d(e)
return s?s.map(n).map(i):[]}function u(t){return c()?(e("guildSelf",s(t)),"self"):function(e){const s=m.map(([e,s])=>[p(e),s]),t=n(i(e)),o=s.find(([e])=>e.includes(t))
if(o)return o[1]}(s(t))}function b(e){const s=u(e)
s&&function(e,s){const[,i,a]=f.find(([e])=>e===s)
e.parentNode.classList.add(i)
const n=t(a)
n&&n.length>0&&o(e.parentNode,"<br>"+r(n))}(e,s)}export default function(){const s=l()
s?b(s):a()&&e("guildSelf","")}
//# sourceMappingURL=profileInjectGuildRel-c6113510.js.map
