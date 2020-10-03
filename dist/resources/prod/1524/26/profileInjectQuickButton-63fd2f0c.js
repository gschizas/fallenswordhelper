import{C as t,a2 as a,b0 as s,Q as i,L as e,c6 as r,bI as o,bS as n,H as p,bT as c,bm as d,s as f,aD as u}from"./calfSystem-a5fc99d4.js"
import"./playerName-f44ad46e.js"
import"./onlineDot-0c100c3d.js"
import"./batch-69aa6624.js"
import"./colouredDots-b5256428.js"
import{c as m}from"./currentGuildId-c73fd152.js"
import"./intValue-e4cdd281.js"
import"./valueText-4ea8a5e7.js"
import"./doStatTotal-a4838f62.js"
import{a as l}from"./profile-8b7c9d88.js"
import"./formToUrl-287ebfb7.js"
import"./interceptSubmit-1ba9df73.js"
import{i as b}from"./insertHtmlAfterEnd-4d0857c1.js"
import{a as $}from"./getIsOwnGuild-a65361f5.js"
function h(){const h=t('#profileLeftColumn img[src*="/avatars/"][width="200"]')
if(!h)return
const j=l(),k=a(i("player_id"),s()),T=$(),B=`<div align="center"><a class="fshQuickBuff quickButton tip-static" ${g=k,`href='javascript:window.openWindow("${e}&tid=${g}", "fsQuickBuff", 618, 1000, ",scrollbars")'`} data-tipped="Buff ${j}"></a>&nbsp;&nbsp;${function(){let t=n,a=""
return p("enableMaxGroupSizeToJoin")&&(t=c,a=` < ${p("maxGroupSizeToJoin")} Members`),`<a class="fshJoin quickButton tip-static" href="${t}" data-tipped="Join All Groups${a}"></a>&nbsp;&nbsp;`}()}<a class="fshGold quickButton tip-static" href="${r}&type=-3&tid=${k}" data-tipped="Go to ${j}'s auctions"></a>&nbsp;&nbsp;<a class="fshTempleTwo quickButton tip-static" href="${o}${j}" data-tipped="Create Secure Trade to ${j}"></a>&nbsp;&nbsp;${function(t,a){return t?`<a class="fshTempleThree quickButton tip-static" href="${d}${a}" data-tipped="Recall items from ${a}"></a>&nbsp;&nbsp;`:""}(T,j)}${function(t,a,s){return t&&p("showAdmin")?`<a class="quickButton tip-static" href="${f}members&subcmd2=changerank&member_id=${a}" data-tipped="Rank ${s}" style="background-image: url('${u}guilds/${m()}_mini.png');"></a>&nbsp;&nbsp;`:""}(T,k,j)}</div>`
var g
b(h,B)}export default h
//# sourceMappingURL=profileInjectQuickButton-63fd2f0c.js.map
