import{C as t,a2 as a,a$ as s,Q as i,L as e,c5 as r,bH as o,bR as p,c as n,bS as c,bl as d,H as f,s as u,aD as m}from"./calfSystem-57628ebe.js"
import"./playerName-d617838d.js"
import"./onlineDot-aa286806.js"
import"./batch-b6de9fa7.js"
import"./colouredDots-964dd7e9.js"
import{c as l}from"./currentGuildId-909a3fed.js"
import"./intValue-f94761c7.js"
import"./valueText-a430d398.js"
import"./doStatTotal-59cd65f6.js"
import"./executeAll-18adff71.js"
import{a as b}from"./profile-339631b9.js"
import"./formToUrl-ed8f6bd0.js"
import"./interceptSubmit-42e92144.js"
import{i as $}from"./insertHtmlAfterEnd-5ac4fa8d.js"
import{a as h}from"./getIsOwnGuild-64030e21.js"
function j(){const j=t('#profileLeftColumn img[src*="/avatars/"][width="200"]')
if(!j)return
const k=b(),T=a(i("player_id"),s()),B=h(),g=`<div align="center"><a class="fshQuickBuff quickButton tip-static" ${w=T,`href='javascript:window.openWindow("${e}&tid=${w}", "fsQuickBuff", 618, 1000, ",scrollbars")'`} data-tipped="Buff ${k}"></a>&nbsp;&nbsp;${function(){let t=p,a=""
return n.enableMaxGroupSizeToJoin&&(t=c,a=` < ${n.maxGroupSizeToJoin} Members`),`<a class="fshJoin quickButton tip-static" href="${t}" data-tipped="Join All Groups${a}"></a>&nbsp;&nbsp;`}()}<a class="fshGold quickButton tip-static" href="${r}&type=-3&tid=${T}" data-tipped="Go to ${k}'s auctions"></a>&nbsp;&nbsp;<a class="fshTempleTwo quickButton tip-static" href="${o}${k}" data-tipped="Create Secure Trade to ${k}"></a>&nbsp;&nbsp;${function(t,a){return t?`<a class="fshTempleThree quickButton tip-static" href="${d}${a}" data-tipped="Recall items from ${a}"></a>&nbsp;&nbsp;`:""}(B,k)}${function(t,a,s){return t&&f("showAdmin")?`<a class="quickButton tip-static" href="${u}members&subcmd2=changerank&member_id=${a}" data-tipped="Rank ${s}" style="background-image: url('${m}guilds/${l()}_mini.png');"></a>&nbsp;&nbsp;`:""}(B,T,k)}</div>`
var w
$(j,g)}export default j
//# sourceMappingURL=profileInjectQuickButton-3d77dc84.js.map
