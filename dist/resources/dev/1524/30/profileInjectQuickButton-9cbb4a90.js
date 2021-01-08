import{C as t,a3 as a,b6 as s,R as e,L as i,cb as r,bO as o,bY as p,c as n,bZ as c,bs as f,H as u,s as m,aH as l}from"./calfSystem-54df10e3.js"
import"./playerName-8f1e4e48.js"
import"./onlineDot-78a7c8a3.js"
import"./batch-08f429bb.js"
import"./colouredDots-f56c0daa.js"
import{c as d}from"./currentGuildId-7eae4191.js"
import"./intValue-e8157483.js"
import"./valueText-90531bb6.js"
import"./doStatTotal-e15e6025.js"
import"./executeAll-be2ac0ec.js"
import{a as b}from"./profile-2af3ee20.js"
import"./formToUrl-54567b6c.js"
import"./interceptSubmit-d6a9b28d.js"
import{i as $}from"./insertHtmlAfterEnd-a9fec142.js"
import{a as h}from"./getIsOwnGuild-a8f0f4ea.js"
function j(){const j=t('#profileLeftColumn img[src*="/avatars/"][width="200"]')
if(!j)return
const k=b(),T=a(e("player_id"),s()),B=h(),g=`<div align="center"><a class="fshQuickBuff quickButton tip-static" ${w=T,`href='javascript:window.openWindow("${i}&tid=${w}", "fsQuickBuff", 618, 1000, ",scrollbars")'`} data-tipped="Buff ${k}"></a>&nbsp;&nbsp;${function(){let t=p,a=""
return n.enableMaxGroupSizeToJoin&&(t=c,a=` < ${n.maxGroupSizeToJoin} Members`),`<a class="fshJoin quickButton tip-static" href="${t}" data-tipped="Join All Groups${a}"></a>&nbsp;&nbsp;`}()}<a class="fshGold quickButton tip-static" href="${r}&type=-3&tid=${T}" data-tipped="Go to ${k}'s auctions"></a>&nbsp;&nbsp;<a class="fshTempleTwo quickButton tip-static" href="${o}${k}" data-tipped="Create Secure Trade to ${k}"></a>&nbsp;&nbsp;${function(t,a){return t?`<a class="fshTempleThree quickButton tip-static" href="${f}${a}" data-tipped="Recall items from ${a}"></a>&nbsp;&nbsp;`:""}(B,k)}${function(t,a,s){return t&&u("showAdmin")?`<a class="quickButton tip-static" href="${m}members&subcmd2=changerank&member_id=${a}" data-tipped="Rank ${s}" style="background-image: url('${l}guilds/${d()}_mini.png');"></a>&nbsp;&nbsp;`:""}(B,T,k)}</div>`
var w
$(j,g)}export default j
//# sourceMappingURL=profileInjectQuickButton-9cbb4a90.js.map
