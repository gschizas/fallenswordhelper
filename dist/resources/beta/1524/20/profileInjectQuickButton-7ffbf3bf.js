import{L as t,C as a,a2 as s,b2 as i,P as e,c9 as r,bd as o,bX as n,G as p,bY as c,bt as u,s as f,aD as d}from"./calfSystem-05554bae.js"
import"./playerName-0e65dbb6.js"
import"./onlineDot-2dc99915.js"
import"./batch-62c1054e.js"
import"./colouredDots-bcbb39d3.js"
import{c as m}from"./currentGuildId-03628998.js"
import"./intValue-f723fc88.js"
import"./valueText-d9bb024d.js"
import"./doStatTotal-b24fc6c4.js"
import{a as l}from"./profile-a3a9990e.js"
import"./formToUrl-21fa7da6.js"
import"./interceptSubmit-399cf9b1.js"
import{i as b}from"./insertHtmlAfterEnd-1461aee3.js"
import{a as $}from"./getIsOwnGuild-afdeee21.js"
export default function(){const h=a('#profileLeftColumn img[src*="/avatars/"][width="200"]')
if(!h)return
const j=l(),k=s(e("player_id"),i()),T=$(),B=`<div align="center"><a class="fshQuickBuff quickButton tip-static" ${function(a,s){let i=""
return s&&(i="&blist="+s),`href='javascript:window.openWindow("${t}&tid=${a}${i}", "fsQuickBuff", 618, 1000, ",scrollbars")'`}(k)} data-tipped="Buff ${j}"></a>&nbsp;&nbsp;${function(){let t=n,a=""
return p("enableMaxGroupSizeToJoin")&&(t=c,a=` < ${p("maxGroupSizeToJoin")} Members`),`<a class="fshJoin quickButton tip-static" href="${t}" data-tipped="Join All Groups${a}"></a>&nbsp;&nbsp;`}()}<a class="fshGold quickButton tip-static" href="${r}&type=-3&tid=${k}" data-tipped="Go to ${j}'s auctions"></a>&nbsp;&nbsp;<a class="fshTempleTwo quickButton tip-static" href="${o}${j}" data-tipped="Create Secure Trade to ${j}"></a>&nbsp;&nbsp;${function(t,a){return t?`<a class="fshTempleThree quickButton tip-static" href="${u}${a}" data-tipped="Recall items from ${a}"></a>&nbsp;&nbsp;`:""}(T,j)}${function(t,a,s){return t&&p("showAdmin")?`<a class="quickButton tip-static" href="${f}members&subcmd2=changerank&member_id=${a}" data-tipped="Rank ${s}" style="background-image: url('${d}guilds/${m()}_mini.png');"></a>&nbsp;&nbsp;`:""}(T,k,j)}</div>`
b(h,B)}
//# sourceMappingURL=profileInjectQuickButton-7ffbf3bf.js.map
