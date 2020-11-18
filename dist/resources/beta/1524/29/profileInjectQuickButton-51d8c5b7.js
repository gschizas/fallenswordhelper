import{C as t,a2 as a,b1 as s,Q as i,L as e,c9 as r,bM as o,bW as p,c as n,bX as c,bq as f,H as u,s as d,aD as m}from"./calfSystem-f9a27018.js"
import"./playerName-6c5f1f5b.js"
import"./onlineDot-cd4bee30.js"
import"./batch-78c008bf.js"
import"./colouredDots-1d7367db.js"
import{c as l}from"./currentGuildId-a542fdb9.js"
import"./intValue-f94761c7.js"
import"./valueText-d637a521.js"
import"./doStatTotal-1e076944.js"
import"./executeAll-18adff71.js"
import{a as b}from"./profile-42726f68.js"
import"./formToUrl-b3369df3.js"
import"./interceptSubmit-039f8ca3.js"
import{i as $}from"./insertHtmlAfterEnd-18e893ae.js"
import{a as h}from"./getIsOwnGuild-bd28ca0b.js"
function j(){const j=t('#profileLeftColumn img[src*="/avatars/"][width="200"]')
if(!j)return
const k=b(),T=a(i("player_id"),s()),B=h(),g=`<div align="center"><a class="fshQuickBuff quickButton tip-static" ${q=T,`href='javascript:window.openWindow("${e}&tid=${q}", "fsQuickBuff", 618, 1000, ",scrollbars")'`} data-tipped="Buff ${k}"></a>&nbsp;&nbsp;${function(){let t=p,a=""
return n.enableMaxGroupSizeToJoin&&(t=c,a=` < ${n.maxGroupSizeToJoin} Members`),`<a class="fshJoin quickButton tip-static" href="${t}" data-tipped="Join All Groups${a}"></a>&nbsp;&nbsp;`}()}<a class="fshGold quickButton tip-static" href="${r}&type=-3&tid=${T}" data-tipped="Go to ${k}'s auctions"></a>&nbsp;&nbsp;<a class="fshTempleTwo quickButton tip-static" href="${o}${k}" data-tipped="Create Secure Trade to ${k}"></a>&nbsp;&nbsp;${function(t,a){return t?`<a class="fshTempleThree quickButton tip-static" href="${f}${a}" data-tipped="Recall items from ${a}"></a>&nbsp;&nbsp;`:""}(B,k)}${function(t,a,s){return t&&u("showAdmin")?`<a class="quickButton tip-static" href="${d}members&subcmd2=changerank&member_id=${a}" data-tipped="Rank ${s}" style="background-image: url('${m}guilds/${l()}_mini.png');"></a>&nbsp;&nbsp;`:""}(B,T,k)}</div>`
var q
$(j,g)}export default j
//# sourceMappingURL=profileInjectQuickButton-51d8c5b7.js.map
