import{C as t,a2 as a,au as s,Q as i,L as e,c7 as r,bK as o,bU as p,c as n,bV as c,by as f,H as u,s as d,aj as m}from"./calfSystem-47fc08ae.js"
import{c as l}from"./currentGuildId-72bd2a1a.js"
import{a as b}from"./getIsOwnGuild-8c6cc963.js"
import{a as $}from"./profile-0e55bc83.js"
import{i as j}from"./insertHtmlAfterEnd-5cf43170.js"
import"./colouredDots-06e12c69.js"
import"./batch-cd69b94b.js"
import"./onlineDot-b5276d0b.js"
import"./doStatTotal-f1ff3773.js"
import"./executeAll-86fbe671.js"
import"./playerName-118d0325.js"
import"./intValue-e7ef611d.js"
import"./valueText-d53d9568.js"
import"./interceptSubmit-3f0967f1.js"
import"./formToUrl-e4e5b8f2.js"
function h(){const h=t('#profileLeftColumn img[src*="/avatars/"][width="200"]')
if(!h)return
const k=$(),T=a(i("player_id"),s()),B=b(),g=`<div align="center"><a class="fshQuickBuff quickButton tip-static" ${w=T,`href='javascript:window.openWindow("${e}&tid=${w}", "fsQuickBuff", 618, 1000, ",scrollbars")'`} data-tipped="Buff ${k}"></a>&nbsp;&nbsp;${function(){let t=p,a=""
return n.enableMaxGroupSizeToJoin&&(t=c,a=` < ${n.maxGroupSizeToJoin} Members`),`<a class="fshJoin quickButton tip-static" href="${t}" data-tipped="Join All Groups${a}"></a>&nbsp;&nbsp;`}()}<a class="fshGold quickButton tip-static" href="${r}&type=-3&tid=${T}" data-tipped="Go to ${k}'s auctions"></a>&nbsp;&nbsp;<a class="fshTempleTwo quickButton tip-static" href="${o}${k}" data-tipped="Create Secure Trade to ${k}"></a>&nbsp;&nbsp;${function(t,a){return t?`<a class="fshTempleThree quickButton tip-static" href="${f}${a}" data-tipped="Recall items from ${a}"></a>&nbsp;&nbsp;`:""}(B,k)}${function(t,a,s){return t&&u("showAdmin")?`<a class="quickButton tip-static" href="${d}members&subcmd2=changerank&member_id=${a}" data-tipped="Rank ${s}" style="background-image: url('${m}guilds/${l()}_mini.png');"></a>&nbsp;&nbsp;`:""}(B,T,k)}</div>`
var w
j(h,g)}export default h
//# sourceMappingURL=profileInjectQuickButton-f5298838.js.map
