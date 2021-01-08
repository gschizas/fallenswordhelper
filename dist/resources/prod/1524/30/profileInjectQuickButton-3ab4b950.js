import{C as t,a2 as a,a$ as s,Q as i,L as e,c5 as r,bH as o,bR as p,c as n,bS as c,bl as u,H as d,s as f,aD as m}from"./calfSystem-6459f18a.js"
import"./playerName-d1c3e398.js"
import"./onlineDot-6aa5ba99.js"
import"./batch-68f3579a.js"
import"./colouredDots-08b6011a.js"
import{c as l}from"./currentGuildId-da0b8fda.js"
import"./intValue-e8157483.js"
import"./valueText-29c7adc9.js"
import"./doStatTotal-7438349b.js"
import"./executeAll-be2ac0ec.js"
import{a as b}from"./profile-aec766fc.js"
import"./formToUrl-33859dc7.js"
import"./interceptSubmit-2837655b.js"
import{i as $}from"./insertHtmlAfterEnd-deef01ad.js"
import{a as h}from"./getIsOwnGuild-9b05c4d3.js"
function j(){const j=t('#profileLeftColumn img[src*="/avatars/"][width="200"]')
if(!j)return
const k=b(),T=a(i("player_id"),s()),B=h(),g=`<div align="center"><a class="fshQuickBuff quickButton tip-static" ${w=T,`href='javascript:window.openWindow("${e}&tid=${w}", "fsQuickBuff", 618, 1000, ",scrollbars")'`} data-tipped="Buff ${k}"></a>&nbsp;&nbsp;${function(){let t=p,a=""
return n.enableMaxGroupSizeToJoin&&(t=c,a=` < ${n.maxGroupSizeToJoin} Members`),`<a class="fshJoin quickButton tip-static" href="${t}" data-tipped="Join All Groups${a}"></a>&nbsp;&nbsp;`}()}<a class="fshGold quickButton tip-static" href="${r}&type=-3&tid=${T}" data-tipped="Go to ${k}'s auctions"></a>&nbsp;&nbsp;<a class="fshTempleTwo quickButton tip-static" href="${o}${k}" data-tipped="Create Secure Trade to ${k}"></a>&nbsp;&nbsp;${function(t,a){return t?`<a class="fshTempleThree quickButton tip-static" href="${u}${a}" data-tipped="Recall items from ${a}"></a>&nbsp;&nbsp;`:""}(B,k)}${function(t,a,s){return t&&d("showAdmin")?`<a class="quickButton tip-static" href="${f}members&subcmd2=changerank&member_id=${a}" data-tipped="Rank ${s}" style="background-image: url('${m}guilds/${l()}_mini.png');"></a>&nbsp;&nbsp;`:""}(B,T,k)}</div>`
var w
$(j,g)}export default j
//# sourceMappingURL=profileInjectQuickButton-3ab4b950.js.map
