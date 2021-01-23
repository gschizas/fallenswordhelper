import{C as t,a3 as a,aA as s,R as i,L as e,ca as r,bN as o,bX as p,c as n,bY as c,bB as u,H as f,s as m,ak as l}from"./calfSystem-393ab895.js"
import{c as d}from"./currentGuildId-469c60c3.js"
import{a as b}from"./getIsOwnGuild-faeabd4e.js"
import{a as $}from"./profile-3e138563.js"
import{i as h}from"./insertHtmlAfterEnd-568576c8.js"
import"./colouredDots-feee957b.js"
import"./batch-28b89a64.js"
import"./onlineDot-9b46cf0c.js"
import"./doStatTotal-2c67bbbb.js"
import"./executeAll-86fbe671.js"
import"./playerName-03162bd7.js"
import"./intValue-e7ef611d.js"
import"./valueText-89c9d82f.js"
import"./interceptSubmit-193429ea.js"
import"./formToUrl-7683ac99.js"
function j(){const j=t('#profileLeftColumn img[src*="/avatars/"][width="200"]')
if(!j)return
const k=$(),B=a(i("player_id"),s()),T=b(),g=`<div align="center"><a class="fshQuickBuff quickButton tip-static" ${w=B,`href='javascript:window.openWindow("${e}&tid=${w}", "fsQuickBuff", 618, 1000, ",scrollbars")'`} data-tipped="Buff ${k}"></a>&nbsp;&nbsp;${function(){let t=p,a=""
return n.enableMaxGroupSizeToJoin&&(t=c,a=` < ${n.maxGroupSizeToJoin} Members`),`<a class="fshJoin quickButton tip-static" href="${t}" data-tipped="Join All Groups${a}"></a>&nbsp;&nbsp;`}()}<a class="fshGold quickButton tip-static" href="${r}&type=-3&tid=${B}" data-tipped="Go to ${k}'s auctions"></a>&nbsp;&nbsp;<a class="fshTempleTwo quickButton tip-static" href="${o}${k}" data-tipped="Create Secure Trade to ${k}"></a>&nbsp;&nbsp;${function(t,a){return t?`<a class="fshTempleThree quickButton tip-static" href="${u}${a}" data-tipped="Recall items from ${a}"></a>&nbsp;&nbsp;`:""}(T,k)}${function(t,a,s){return t&&f("showAdmin")?`<a class="quickButton tip-static" href="${m}members&subcmd2=changerank&member_id=${a}" data-tipped="Rank ${s}" style="background-image: url('${l}guilds/${d()}_mini.png');"></a>&nbsp;&nbsp;`:""}(T,B,k)}</div>`
var w
h(j,g)}export default j
//# sourceMappingURL=profileInjectQuickButton-522070f5.js.map
