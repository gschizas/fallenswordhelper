import{C as t,a3 as a,b0 as s,Q as i,L as e,c6 as r,bI as o,bS as n,c as p,bT as c,bm as d,H as f,s as u,aE as m}from"./calfSystem-3bdf319e.js"
import"./playerName-26a1f7d9.js"
import"./onlineDot-d9e2b3a9.js"
import"./batch-06380bde.js"
import"./colouredDots-1ad7dddc.js"
import{c as l}from"./currentGuildId-e8170186.js"
import"./intValue-ef353ded.js"
import"./valueText-0f01a014.js"
import"./doStatTotal-ad5f150e.js"
import{a as b}from"./profile-056a3cb4.js"
import"./formToUrl-6c242df5.js"
import"./interceptSubmit-5104e4a5.js"
import{i as $}from"./insertHtmlAfterEnd-56f50dfb.js"
import{a as h}from"./getIsOwnGuild-6e0fb866.js"
function j(){const j=t('#profileLeftColumn img[src*="/avatars/"][width="200"]')
if(!j)return
const k=b(),T=a(i("player_id"),s()),B=h(),g=`<div align="center"><a class="fshQuickBuff quickButton tip-static" ${w=T,`href='javascript:window.openWindow("${e}&tid=${w}", "fsQuickBuff", 618, 1000, ",scrollbars")'`} data-tipped="Buff ${k}"></a>&nbsp;&nbsp;${function(){let t=n,a=""
return p.enableMaxGroupSizeToJoin&&(t=c,a=` < ${p.maxGroupSizeToJoin} Members`),`<a class="fshJoin quickButton tip-static" href="${t}" data-tipped="Join All Groups${a}"></a>&nbsp;&nbsp;`}()}<a class="fshGold quickButton tip-static" href="${r}&type=-3&tid=${T}" data-tipped="Go to ${k}'s auctions"></a>&nbsp;&nbsp;<a class="fshTempleTwo quickButton tip-static" href="${o}${k}" data-tipped="Create Secure Trade to ${k}"></a>&nbsp;&nbsp;${function(t,a){return t?`<a class="fshTempleThree quickButton tip-static" href="${d}${a}" data-tipped="Recall items from ${a}"></a>&nbsp;&nbsp;`:""}(B,k)}${function(t,a,s){return t&&f("showAdmin")?`<a class="quickButton tip-static" href="${u}members&subcmd2=changerank&member_id=${a}" data-tipped="Rank ${s}" style="background-image: url('${m}guilds/${l()}_mini.png');"></a>&nbsp;&nbsp;`:""}(B,T,k)}</div>`
var w
$(j,g)}export default j
//# sourceMappingURL=profileInjectQuickButton-984cf439.js.map
