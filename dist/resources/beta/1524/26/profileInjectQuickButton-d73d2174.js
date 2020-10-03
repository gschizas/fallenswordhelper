import{C as t,a2 as a,b2 as s,Q as i,L as e,ca as r,bN as o,bX as n,H as p,bY as c,br as u,s as d,aD as f}from"./calfSystem-cf4d22a7.js"
import"./playerName-b9ef36e6.js"
import"./onlineDot-d0dbf176.js"
import"./batch-952c9055.js"
import"./colouredDots-aab2f633.js"
import{c as m}from"./currentGuildId-5763962b.js"
import"./intValue-e4cdd281.js"
import"./valueText-5ba89d31.js"
import"./doStatTotal-d19b95c3.js"
import{a as l}from"./profile-c3b714d7.js"
import"./formToUrl-31554e27.js"
import"./interceptSubmit-228afb85.js"
import{i as b}from"./insertHtmlAfterEnd-a7b25c39.js"
import{a as $}from"./getIsOwnGuild-a7b1091a.js"
function h(){const h=t('#profileLeftColumn img[src*="/avatars/"][width="200"]')
if(!h)return
const j=l(),k=a(i("player_id"),s()),T=$(),B=`<div align="center"><a class="fshQuickBuff quickButton tip-static" ${g=k,`href='javascript:window.openWindow("${e}&tid=${g}", "fsQuickBuff", 618, 1000, ",scrollbars")'`} data-tipped="Buff ${j}"></a>&nbsp;&nbsp;${function(){let t=n,a=""
return p("enableMaxGroupSizeToJoin")&&(t=c,a=` < ${p("maxGroupSizeToJoin")} Members`),`<a class="fshJoin quickButton tip-static" href="${t}" data-tipped="Join All Groups${a}"></a>&nbsp;&nbsp;`}()}<a class="fshGold quickButton tip-static" href="${r}&type=-3&tid=${k}" data-tipped="Go to ${j}'s auctions"></a>&nbsp;&nbsp;<a class="fshTempleTwo quickButton tip-static" href="${o}${j}" data-tipped="Create Secure Trade to ${j}"></a>&nbsp;&nbsp;${function(t,a){return t?`<a class="fshTempleThree quickButton tip-static" href="${u}${a}" data-tipped="Recall items from ${a}"></a>&nbsp;&nbsp;`:""}(T,j)}${function(t,a,s){return t&&p("showAdmin")?`<a class="quickButton tip-static" href="${d}members&subcmd2=changerank&member_id=${a}" data-tipped="Rank ${s}" style="background-image: url('${f}guilds/${m()}_mini.png');"></a>&nbsp;&nbsp;`:""}(T,k,j)}</div>`
var g
b(h,B)}export default h
//# sourceMappingURL=profileInjectQuickButton-d73d2174.js.map
