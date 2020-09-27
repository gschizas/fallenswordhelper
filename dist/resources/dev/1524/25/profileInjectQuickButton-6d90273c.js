import{C as t,a3 as a,b7 as s,R as i,L as e,cc as r,bi as o,b_ as n,H as p,b$ as c,bv as d,s as u,aH as f}from"./calfSystem-69dd5601.js"
import"./playerName-688c2cbc.js"
import"./onlineDot-0fddc3bd.js"
import"./batch-9d8c3bf7.js"
import"./colouredDots-84d91696.js"
import{c as m}from"./currentGuildId-a0138513.js"
import"./intValue-65d3c36c.js"
import"./valueText-1de8e1c5.js"
import"./doStatTotal-5575a7a5.js"
import{a as l}from"./profile-811bd14e.js"
import"./formToUrl-543a6364.js"
import"./interceptSubmit-9f6267e0.js"
import{i as b}from"./insertHtmlAfterEnd-df8843e7.js"
import{a as $}from"./getIsOwnGuild-12592983.js"
function h(){const h=t('#profileLeftColumn img[src*="/avatars/"][width="200"]')
if(!h)return
const j=l(),k=a(i("player_id"),s()),T=$(),B=`<div align="center"><a class="fshQuickBuff quickButton tip-static" ${g=k,`href='javascript:window.openWindow("${e}&tid=${g}", "fsQuickBuff", 618, 1000, ",scrollbars")'`} data-tipped="Buff ${j}"></a>&nbsp;&nbsp;${function(){let t=n,a=""
return p("enableMaxGroupSizeToJoin")&&(t=c,a=` < ${p("maxGroupSizeToJoin")} Members`),`<a class="fshJoin quickButton tip-static" href="${t}" data-tipped="Join All Groups${a}"></a>&nbsp;&nbsp;`}()}<a class="fshGold quickButton tip-static" href="${r}&type=-3&tid=${k}" data-tipped="Go to ${j}'s auctions"></a>&nbsp;&nbsp;<a class="fshTempleTwo quickButton tip-static" href="${o}${j}" data-tipped="Create Secure Trade to ${j}"></a>&nbsp;&nbsp;${function(t,a){return t?`<a class="fshTempleThree quickButton tip-static" href="${d}${a}" data-tipped="Recall items from ${a}"></a>&nbsp;&nbsp;`:""}(T,j)}${function(t,a,s){return t&&p("showAdmin")?`<a class="quickButton tip-static" href="${u}members&subcmd2=changerank&member_id=${a}" data-tipped="Rank ${s}" style="background-image: url('${f}guilds/${m()}_mini.png');"></a>&nbsp;&nbsp;`:""}(T,k,j)}</div>`
var g
b(h,B)}export default h
//# sourceMappingURL=profileInjectQuickButton-6d90273c.js.map
