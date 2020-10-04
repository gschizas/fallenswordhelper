import{C as t,a3 as a,b2 as s,Q as i,L as e,ca as r,bN as o,bX as n,c as p,bY as c,br as d,H as u,s as m,aE as f}from"./calfSystem-70c7a660.js"
import"./playerName-d7dd0a91.js"
import"./onlineDot-0c0af287.js"
import"./batch-e1df795d.js"
import"./colouredDots-e8d00daa.js"
import{c as l}from"./currentGuildId-b3e9b6a5.js"
import"./intValue-ef353ded.js"
import"./valueText-6c1d3d77.js"
import"./doStatTotal-73e4ca4c.js"
import{a as b}from"./profile-6e38dc04.js"
import"./formToUrl-05384153.js"
import"./interceptSubmit-96d20d60.js"
import{i as $}from"./insertHtmlAfterEnd-005493b2.js"
import{a as h}from"./getIsOwnGuild-64cac18b.js"
function j(){const j=t('#profileLeftColumn img[src*="/avatars/"][width="200"]')
if(!j)return
const k=b(),T=a(i("player_id"),s()),B=h(),g=`<div align="center"><a class="fshQuickBuff quickButton tip-static" ${w=T,`href='javascript:window.openWindow("${e}&tid=${w}", "fsQuickBuff", 618, 1000, ",scrollbars")'`} data-tipped="Buff ${k}"></a>&nbsp;&nbsp;${function(){let t=n,a=""
return p.enableMaxGroupSizeToJoin&&(t=c,a=` < ${p.maxGroupSizeToJoin} Members`),`<a class="fshJoin quickButton tip-static" href="${t}" data-tipped="Join All Groups${a}"></a>&nbsp;&nbsp;`}()}<a class="fshGold quickButton tip-static" href="${r}&type=-3&tid=${T}" data-tipped="Go to ${k}'s auctions"></a>&nbsp;&nbsp;<a class="fshTempleTwo quickButton tip-static" href="${o}${k}" data-tipped="Create Secure Trade to ${k}"></a>&nbsp;&nbsp;${function(t,a){return t?`<a class="fshTempleThree quickButton tip-static" href="${d}${a}" data-tipped="Recall items from ${a}"></a>&nbsp;&nbsp;`:""}(B,k)}${function(t,a,s){return t&&u("showAdmin")?`<a class="quickButton tip-static" href="${m}members&subcmd2=changerank&member_id=${a}" data-tipped="Rank ${s}" style="background-image: url('${f}guilds/${l()}_mini.png');"></a>&nbsp;&nbsp;`:""}(B,T,k)}</div>`
var w
$(j,g)}export default j
//# sourceMappingURL=profileInjectQuickButton-38ea1611.js.map
