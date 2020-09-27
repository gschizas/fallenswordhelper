import{C as t,a2 as a,b2 as s,Q as i,L as e,ca as r,bd as o,bY as n,H as p,bZ as c,bt as u,s as d,aD as m}from"./calfSystem-d3aab5a8.js"
import"./playerName-6a2b4679.js"
import"./onlineDot-f41c7d87.js"
import"./batch-8971e6ac.js"
import"./colouredDots-eecfe1a5.js"
import{c as f}from"./currentGuildId-b5159547.js"
import"./intValue-65d3c36c.js"
import"./valueText-00c55739.js"
import"./doStatTotal-5defe8e4.js"
import{a as l}from"./profile-60d69902.js"
import"./formToUrl-19959c48.js"
import"./interceptSubmit-07270cc9.js"
import{i as b}from"./insertHtmlAfterEnd-d031a1ae.js"
import{a as $}from"./getIsOwnGuild-92ab65a1.js"
function h(){const h=t('#profileLeftColumn img[src*="/avatars/"][width="200"]')
if(!h)return
const j=l(),k=a(i("player_id"),s()),T=$(),B=`<div align="center"><a class="fshQuickBuff quickButton tip-static" ${g=k,`href='javascript:window.openWindow("${e}&tid=${g}", "fsQuickBuff", 618, 1000, ",scrollbars")'`} data-tipped="Buff ${j}"></a>&nbsp;&nbsp;${function(){let t=n,a=""
return p("enableMaxGroupSizeToJoin")&&(t=c,a=` < ${p("maxGroupSizeToJoin")} Members`),`<a class="fshJoin quickButton tip-static" href="${t}" data-tipped="Join All Groups${a}"></a>&nbsp;&nbsp;`}()}<a class="fshGold quickButton tip-static" href="${r}&type=-3&tid=${k}" data-tipped="Go to ${j}'s auctions"></a>&nbsp;&nbsp;<a class="fshTempleTwo quickButton tip-static" href="${o}${j}" data-tipped="Create Secure Trade to ${j}"></a>&nbsp;&nbsp;${function(t,a){return t?`<a class="fshTempleThree quickButton tip-static" href="${u}${a}" data-tipped="Recall items from ${a}"></a>&nbsp;&nbsp;`:""}(T,j)}${function(t,a,s){return t&&p("showAdmin")?`<a class="quickButton tip-static" href="${d}members&subcmd2=changerank&member_id=${a}" data-tipped="Rank ${s}" style="background-image: url('${m}guilds/${f()}_mini.png');"></a>&nbsp;&nbsp;`:""}(T,k,j)}</div>`
var g
b(h,B)}export default h
//# sourceMappingURL=profileInjectQuickButton-f1134624.js.map
