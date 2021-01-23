import{C as t,a2 as s,as as a,Q as e,L as i,c5 as r,bH as o,bR as p,c as n,bS as c,bv as u,H as d,s as f,ah as m}from"./calfSystem-7aee5245.js"
import{c as l}from"./currentGuildId-2e15c82d.js"
import{a as b}from"./getIsOwnGuild-e40ed67c.js"
import{a as $}from"./profile-18b82bb9.js"
import{i as h}from"./insertHtmlAfterEnd-ac29d90e.js"
import"./colouredDots-57f9735c.js"
import"./batch-bd79b969.js"
import"./onlineDot-d2b3e93d.js"
import"./doStatTotal-0f89c931.js"
import"./executeAll-86fbe671.js"
import"./playerName-87d03488.js"
import"./intValue-e7ef611d.js"
import"./valueText-281cbf4b.js"
import"./interceptSubmit-e2017f31.js"
import"./formToUrl-c1b61cd0.js"
function j(){const j=t('#profileLeftColumn img[src*="/avatars/"][width="200"]')
if(!j)return
const k=$(),T=s(e("player_id"),a()),B=b(),g=`<div align="center"><a class="fshQuickBuff quickButton tip-static" ${v=T,`href='javascript:window.openWindow("${i}&tid=${v}", "fsQuickBuff", 618, 1000, ",scrollbars")'`} data-tipped="Buff ${k}"></a>&nbsp;&nbsp;${function(){let t=p,s=""
return n.enableMaxGroupSizeToJoin&&(t=c,s=` < ${n.maxGroupSizeToJoin} Members`),`<a class="fshJoin quickButton tip-static" href="${t}" data-tipped="Join All Groups${s}"></a>&nbsp;&nbsp;`}()}<a class="fshGold quickButton tip-static" href="${r}&type=-3&tid=${T}" data-tipped="Go to ${k}'s auctions"></a>&nbsp;&nbsp;<a class="fshTempleTwo quickButton tip-static" href="${o}${k}" data-tipped="Create Secure Trade to ${k}"></a>&nbsp;&nbsp;${function(t,s){return t?`<a class="fshTempleThree quickButton tip-static" href="${u}${s}" data-tipped="Recall items from ${s}"></a>&nbsp;&nbsp;`:""}(B,k)}${function(t,s,a){return t&&d("showAdmin")?`<a class="quickButton tip-static" href="${f}members&subcmd2=changerank&member_id=${s}" data-tipped="Rank ${a}" style="background-image: url('${m}guilds/${l()}_mini.png');"></a>&nbsp;&nbsp;`:""}(B,T,k)}</div>`
var v
h(j,g)}export default j
//# sourceMappingURL=profileInjectQuickButton-3202ea4a.js.map
