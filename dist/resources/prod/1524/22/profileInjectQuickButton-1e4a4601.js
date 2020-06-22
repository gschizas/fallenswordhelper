import{L as t,C as a,a2 as s,b0 as i,P as e,c6 as o,bb as r,bT as n,G as p,bU as c,bo as u,s as d,aD as f}from"./calfSystem-d04e4be4.js"
import"./playerName-a036237e.js"
import"./onlineDot-b6dabd61.js"
import"./batch-d4516178.js"
import"./colouredDots-5fffd6a1.js"
import{c as m}from"./currentGuildId-9ae9b1fe.js"
import"./intValue-ec94378e.js"
import"./valueText-bd7566e4.js"
import"./doStatTotal-a4b51cbd.js"
import{a as l}from"./profile-f62099cd.js"
import"./formToUrl-3c899008.js"
import"./interceptSubmit-24b16034.js"
import{i as b}from"./insertHtmlAfterEnd-8f464ed1.js"
import{a as $}from"./getIsOwnGuild-7c85e920.js"
export default function(){const h=a('#profileLeftColumn img[src*="/avatars/"][width="200"]')
if(!h)return
const j=l(),k=s(e("player_id"),i()),T=$(),B=`<div align="center"><a class="fshQuickBuff quickButton tip-static" ${function(a,s){let i=""
return s&&(i="&blist="+s),`href='javascript:window.openWindow("${t}&tid=${a}${i}", "fsQuickBuff", 618, 1000, ",scrollbars")'`}(k)} data-tipped="Buff ${j}"></a>&nbsp;&nbsp;${function(){let t=n,a=""
return p("enableMaxGroupSizeToJoin")&&(t=c,a=` < ${p("maxGroupSizeToJoin")} Members`),`<a class="fshJoin quickButton tip-static" href="${t}" data-tipped="Join All Groups${a}"></a>&nbsp;&nbsp;`}()}<a class="fshGold quickButton tip-static" href="${o}&type=-3&tid=${k}" data-tipped="Go to ${j}'s auctions"></a>&nbsp;&nbsp;<a class="fshTempleTwo quickButton tip-static" href="${r}${j}" data-tipped="Create Secure Trade to ${j}"></a>&nbsp;&nbsp;${function(t,a){return t?`<a class="fshTempleThree quickButton tip-static" href="${u}${a}" data-tipped="Recall items from ${a}"></a>&nbsp;&nbsp;`:""}(T,j)}${function(t,a,s){return t&&p("showAdmin")?`<a class="quickButton tip-static" href="${d}members&subcmd2=changerank&member_id=${a}" data-tipped="Rank ${s}" style="background-image: url('${f}guilds/${m()}_mini.png');"></a>&nbsp;&nbsp;`:""}(T,k,j)}</div>`
b(h,B)}
//# sourceMappingURL=profileInjectQuickButton-1e4a4601.js.map
