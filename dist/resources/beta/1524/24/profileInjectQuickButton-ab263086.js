import{L as t,C as a,a2 as s,b2 as i,P as e,ca as r,bd as o,bY as n,H as p,bZ as c,bt as u,s as d,aD as f}from"./calfSystem-019a589c.js"
import"./playerName-6eb83d57.js"
import"./onlineDot-78d506d7.js"
import"./batch-e42a9cfa.js"
import"./colouredDots-43d784a6.js"
import{c as m}from"./currentGuildId-29e13ecc.js"
import"./intValue-44683b42.js"
import"./valueText-5851fcdc.js"
import"./doStatTotal-8e5283b8.js"
import{a as l}from"./profile-3a0c68d6.js"
import"./formToUrl-c83543e1.js"
import"./interceptSubmit-ae6fd26f.js"
import{i as b}from"./insertHtmlAfterEnd-74622885.js"
import{a as $}from"./getIsOwnGuild-a5603360.js"
function h(){const h=a('#profileLeftColumn img[src*="/avatars/"][width="200"]')
if(!h)return
const j=l(),k=s(e("player_id"),i()),T=$(),B=`<div align="center"><a class="fshQuickBuff quickButton tip-static" ${function(a,s){let i=""
return s&&(i="&blist="+s),`href='javascript:window.openWindow("${t}&tid=${a}${i}", "fsQuickBuff", 618, 1000, ",scrollbars")'`}(k)} data-tipped="Buff ${j}"></a>&nbsp;&nbsp;${function(){let t=n,a=""
return p("enableMaxGroupSizeToJoin")&&(t=c,a=` < ${p("maxGroupSizeToJoin")} Members`),`<a class="fshJoin quickButton tip-static" href="${t}" data-tipped="Join All Groups${a}"></a>&nbsp;&nbsp;`}()}<a class="fshGold quickButton tip-static" href="${r}&type=-3&tid=${k}" data-tipped="Go to ${j}'s auctions"></a>&nbsp;&nbsp;<a class="fshTempleTwo quickButton tip-static" href="${o}${j}" data-tipped="Create Secure Trade to ${j}"></a>&nbsp;&nbsp;${function(t,a){return t?`<a class="fshTempleThree quickButton tip-static" href="${u}${a}" data-tipped="Recall items from ${a}"></a>&nbsp;&nbsp;`:""}(T,j)}${function(t,a,s){return t&&p("showAdmin")?`<a class="quickButton tip-static" href="${d}members&subcmd2=changerank&member_id=${a}" data-tipped="Rank ${s}" style="background-image: url('${f}guilds/${m()}_mini.png');"></a>&nbsp;&nbsp;`:""}(T,k,j)}</div>`
b(h,B)}export default h
//# sourceMappingURL=profileInjectQuickButton-ab263086.js.map
