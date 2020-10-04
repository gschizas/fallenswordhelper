import{C as t,a4 as a,b7 as s,R as i,L as e,cc as r,bP as o,bZ as n,c as p,b_ as c,bt as f,H as u,s as m,aI as d}from"./calfSystem-ec5e5725.js"
import"./playerName-6b140f29.js"
import"./onlineDot-e6873f1e.js"
import"./batch-da424537.js"
import"./colouredDots-f4434fa4.js"
import{c as l}from"./currentGuildId-4732beaa.js"
import"./intValue-ef353ded.js"
import"./valueText-f1c6f878.js"
import"./doStatTotal-089574b8.js"
import{a as b}from"./profile-9ad1b078.js"
import"./formToUrl-9589262c.js"
import"./interceptSubmit-540c8b15.js"
import{i as $}from"./insertHtmlAfterEnd-01ce7acd.js"
import{a as h}from"./getIsOwnGuild-161f8289.js"
function j(){const j=t('#profileLeftColumn img[src*="/avatars/"][width="200"]')
if(!j)return
const k=b(),T=a(i("player_id"),s()),B=h(),g=`<div align="center"><a class="fshQuickBuff quickButton tip-static" ${w=T,`href='javascript:window.openWindow("${e}&tid=${w}", "fsQuickBuff", 618, 1000, ",scrollbars")'`} data-tipped="Buff ${k}"></a>&nbsp;&nbsp;${function(){let t=n,a=""
return p.enableMaxGroupSizeToJoin&&(t=c,a=` < ${p.maxGroupSizeToJoin} Members`),`<a class="fshJoin quickButton tip-static" href="${t}" data-tipped="Join All Groups${a}"></a>&nbsp;&nbsp;`}()}<a class="fshGold quickButton tip-static" href="${r}&type=-3&tid=${T}" data-tipped="Go to ${k}'s auctions"></a>&nbsp;&nbsp;<a class="fshTempleTwo quickButton tip-static" href="${o}${k}" data-tipped="Create Secure Trade to ${k}"></a>&nbsp;&nbsp;${function(t,a){return t?`<a class="fshTempleThree quickButton tip-static" href="${f}${a}" data-tipped="Recall items from ${a}"></a>&nbsp;&nbsp;`:""}(B,k)}${function(t,a,s){return t&&u("showAdmin")?`<a class="quickButton tip-static" href="${m}members&subcmd2=changerank&member_id=${a}" data-tipped="Rank ${s}" style="background-image: url('${d}guilds/${l()}_mini.png');"></a>&nbsp;&nbsp;`:""}(B,T,k)}</div>`
var w
$(j,g)}export default j
//# sourceMappingURL=profileInjectQuickButton-0ea3f4ae.js.map
