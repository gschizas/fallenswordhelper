import{L as t,C as a,a2 as s,b2 as i,P as e,ca as r,bd as o,bY as n,G as p,bZ as c,bt as f,s as u,aD as d}from"./calfSystem-89b939c8.js"
import"./playerName-8ec11865.js"
import"./onlineDot-3ced5a13.js"
import"./batch-e839e453.js"
import"./colouredDots-b8776b25.js"
import{c as m}from"./currentGuildId-ae8f3699.js"
import"./intValue-cd93b930.js"
import"./valueText-bfc7b590.js"
import"./doStatTotal-a01a19ff.js"
import{a as l}from"./profile-ddee92c4.js"
import"./formToUrl-ae369bee.js"
import"./interceptSubmit-57a8cf95.js"
import{i as b}from"./insertHtmlAfterEnd-c6efbdf8.js"
import{a as $}from"./getIsOwnGuild-c1cf9da7.js"
export default function(){const h=a('#profileLeftColumn img[src*="/avatars/"][width="200"]')
if(!h)return
const j=l(),k=s(e("player_id"),i()),T=$(),B=`<div align="center"><a class="fshQuickBuff quickButton tip-static" ${function(a,s){let i=""
return s&&(i="&blist="+s),`href='javascript:window.openWindow("${t}&tid=${a}${i}", "fsQuickBuff", 618, 1000, ",scrollbars")'`}(k)} data-tipped="Buff ${j}"></a>&nbsp;&nbsp;${function(){let t=n,a=""
return p("enableMaxGroupSizeToJoin")&&(t=c,a=` < ${p("maxGroupSizeToJoin")} Members`),`<a class="fshJoin quickButton tip-static" href="${t}" data-tipped="Join All Groups${a}"></a>&nbsp;&nbsp;`}()}<a class="fshGold quickButton tip-static" href="${r}&type=-3&tid=${k}" data-tipped="Go to ${j}'s auctions"></a>&nbsp;&nbsp;<a class="fshTempleTwo quickButton tip-static" href="${o}${j}" data-tipped="Create Secure Trade to ${j}"></a>&nbsp;&nbsp;${function(t,a){return t?`<a class="fshTempleThree quickButton tip-static" href="${f}${a}" data-tipped="Recall items from ${a}"></a>&nbsp;&nbsp;`:""}(T,j)}${function(t,a,s){return t&&p("showAdmin")?`<a class="quickButton tip-static" href="${u}members&subcmd2=changerank&member_id=${a}" data-tipped="Rank ${s}" style="background-image: url('${d}guilds/${m()}_mini.png');"></a>&nbsp;&nbsp;`:""}(T,k,j)}</div>`
b(h,B)}
//# sourceMappingURL=profileInjectQuickButton-efb809ed.js.map
