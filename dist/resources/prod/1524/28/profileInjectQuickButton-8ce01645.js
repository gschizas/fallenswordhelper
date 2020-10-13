import{C as t,a2 as a,a$ as s,Q as i,L as e,c5 as r,bH as o,bR as p,c as n,bS as c,bl as u,H as f,s as d,aD as m}from"./calfSystem-a5da5210.js"
import"./playerName-22f2b3f0.js"
import"./onlineDot-ae5ba72d.js"
import"./batch-948dbb93.js"
import"./colouredDots-376a183f.js"
import{c as l}from"./currentGuildId-87288eec.js"
import"./intValue-f4d85578.js"
import"./valueText-92f43a8d.js"
import"./doStatTotal-2508e931.js"
import"./executeAll-3d4e4221.js"
import{a as b}from"./profile-6b07ab1a.js"
import"./formToUrl-6151060b.js"
import"./interceptSubmit-9e7a42eb.js"
import{i as $}from"./insertHtmlAfterEnd-60f61894.js"
import{a as h}from"./getIsOwnGuild-6ec2868d.js"
function j(){const j=t('#profileLeftColumn img[src*="/avatars/"][width="200"]')
if(!j)return
const k=b(),T=a(i("player_id"),s()),B=h(),g=`<div align="center"><a class="fshQuickBuff quickButton tip-static" ${w=T,`href='javascript:window.openWindow("${e}&tid=${w}", "fsQuickBuff", 618, 1000, ",scrollbars")'`} data-tipped="Buff ${k}"></a>&nbsp;&nbsp;${function(){let t=p,a=""
return n.enableMaxGroupSizeToJoin&&(t=c,a=` < ${n.maxGroupSizeToJoin} Members`),`<a class="fshJoin quickButton tip-static" href="${t}" data-tipped="Join All Groups${a}"></a>&nbsp;&nbsp;`}()}<a class="fshGold quickButton tip-static" href="${r}&type=-3&tid=${T}" data-tipped="Go to ${k}'s auctions"></a>&nbsp;&nbsp;<a class="fshTempleTwo quickButton tip-static" href="${o}${k}" data-tipped="Create Secure Trade to ${k}"></a>&nbsp;&nbsp;${function(t,a){return t?`<a class="fshTempleThree quickButton tip-static" href="${u}${a}" data-tipped="Recall items from ${a}"></a>&nbsp;&nbsp;`:""}(B,k)}${function(t,a,s){return t&&f("showAdmin")?`<a class="quickButton tip-static" href="${d}members&subcmd2=changerank&member_id=${a}" data-tipped="Rank ${s}" style="background-image: url('${m}guilds/${l()}_mini.png');"></a>&nbsp;&nbsp;`:""}(B,T,k)}</div>`
var w
$(j,g)}export default j
//# sourceMappingURL=profileInjectQuickButton-8ce01645.js.map
