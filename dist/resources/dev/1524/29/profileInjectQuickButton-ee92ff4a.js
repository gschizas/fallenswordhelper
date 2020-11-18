import{C as t,a3 as a,b6 as s,R as i,L as e,cb as r,bO as o,bY as p,c as n,bZ as c,bs as f,H as u,s as d,aH as m}from"./calfSystem-02c48ff5.js"
import"./playerName-5ca71009.js"
import"./onlineDot-a1876042.js"
import"./batch-a00528f6.js"
import"./colouredDots-11b94259.js"
import{c as l}from"./currentGuildId-cefcefd6.js"
import"./intValue-f94761c7.js"
import"./valueText-65f55d5b.js"
import"./doStatTotal-0f1280ea.js"
import"./executeAll-18adff71.js"
import{a as b}from"./profile-0715d6b1.js"
import"./formToUrl-b49ee3b5.js"
import"./interceptSubmit-43d7e549.js"
import{i as $}from"./insertHtmlAfterEnd-b7d6a20f.js"
import{a as h}from"./getIsOwnGuild-f5b69dd0.js"
function j(){const j=t('#profileLeftColumn img[src*="/avatars/"][width="200"]')
if(!j)return
const k=b(),T=a(i("player_id"),s()),B=h(),g=`<div align="center"><a class="fshQuickBuff quickButton tip-static" ${w=T,`href='javascript:window.openWindow("${e}&tid=${w}", "fsQuickBuff", 618, 1000, ",scrollbars")'`} data-tipped="Buff ${k}"></a>&nbsp;&nbsp;${function(){let t=p,a=""
return n.enableMaxGroupSizeToJoin&&(t=c,a=` < ${n.maxGroupSizeToJoin} Members`),`<a class="fshJoin quickButton tip-static" href="${t}" data-tipped="Join All Groups${a}"></a>&nbsp;&nbsp;`}()}<a class="fshGold quickButton tip-static" href="${r}&type=-3&tid=${T}" data-tipped="Go to ${k}'s auctions"></a>&nbsp;&nbsp;<a class="fshTempleTwo quickButton tip-static" href="${o}${k}" data-tipped="Create Secure Trade to ${k}"></a>&nbsp;&nbsp;${function(t,a){return t?`<a class="fshTempleThree quickButton tip-static" href="${f}${a}" data-tipped="Recall items from ${a}"></a>&nbsp;&nbsp;`:""}(B,k)}${function(t,a,s){return t&&u("showAdmin")?`<a class="quickButton tip-static" href="${d}members&subcmd2=changerank&member_id=${a}" data-tipped="Rank ${s}" style="background-image: url('${m}guilds/${l()}_mini.png');"></a>&nbsp;&nbsp;`:""}(B,T,k)}</div>`
var w
$(j,g)}export default j
//# sourceMappingURL=profileInjectQuickButton-ee92ff4a.js.map
