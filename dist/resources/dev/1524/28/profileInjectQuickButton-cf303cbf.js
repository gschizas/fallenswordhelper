import{C as t,a3 as a,b6 as s,R as i,L as e,cb as r,bO as o,bY as p,c as n,bZ as c,bs as d,H as u,s as f,aH as m}from"./calfSystem-b136673a.js"
import"./playerName-f933c87f.js"
import"./onlineDot-3f2bf154.js"
import"./batch-277d0ee9.js"
import"./colouredDots-e672a8e8.js"
import{c as l}from"./currentGuildId-4405d1bb.js"
import"./intValue-f4d85578.js"
import"./valueText-90e91fab.js"
import"./doStatTotal-82bf23eb.js"
import"./executeAll-3d4e4221.js"
import{a as b}from"./profile-e092da47.js"
import"./formToUrl-1d96bdd4.js"
import"./interceptSubmit-957549ab.js"
import{i as $}from"./insertHtmlAfterEnd-a4a64d97.js"
import{a as h}from"./getIsOwnGuild-d7aae9c9.js"
function j(){const j=t('#profileLeftColumn img[src*="/avatars/"][width="200"]')
if(!j)return
const k=b(),T=a(i("player_id"),s()),B=h(),g=`<div align="center"><a class="fshQuickBuff quickButton tip-static" ${w=T,`href='javascript:window.openWindow("${e}&tid=${w}", "fsQuickBuff", 618, 1000, ",scrollbars")'`} data-tipped="Buff ${k}"></a>&nbsp;&nbsp;${function(){let t=p,a=""
return n.enableMaxGroupSizeToJoin&&(t=c,a=` < ${n.maxGroupSizeToJoin} Members`),`<a class="fshJoin quickButton tip-static" href="${t}" data-tipped="Join All Groups${a}"></a>&nbsp;&nbsp;`}()}<a class="fshGold quickButton tip-static" href="${r}&type=-3&tid=${T}" data-tipped="Go to ${k}'s auctions"></a>&nbsp;&nbsp;<a class="fshTempleTwo quickButton tip-static" href="${o}${k}" data-tipped="Create Secure Trade to ${k}"></a>&nbsp;&nbsp;${function(t,a){return t?`<a class="fshTempleThree quickButton tip-static" href="${d}${a}" data-tipped="Recall items from ${a}"></a>&nbsp;&nbsp;`:""}(B,k)}${function(t,a,s){return t&&u("showAdmin")?`<a class="quickButton tip-static" href="${f}members&subcmd2=changerank&member_id=${a}" data-tipped="Rank ${s}" style="background-image: url('${m}guilds/${l()}_mini.png');"></a>&nbsp;&nbsp;`:""}(B,T,k)}</div>`
var w
$(j,g)}export default j
//# sourceMappingURL=profileInjectQuickButton-cf303cbf.js.map
