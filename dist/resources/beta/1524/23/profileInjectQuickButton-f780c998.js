import{L as t,C as a,a2 as s,b2 as i,P as e,ca as r,bd as o,bY as n,G as p,bZ as c,bt as f,s as d,aD as u}from"./calfSystem-34fcd691.js"
import"./playerName-d0ea3aa5.js"
import"./onlineDot-1dfc5004.js"
import"./batch-76cced14.js"
import"./colouredDots-84a9af5b.js"
import{c as m}from"./currentGuildId-fa7da475.js"
import"./intValue-0e84cdad.js"
import"./valueText-eb3ddde5.js"
import"./doStatTotal-73f2a0ea.js"
import{a as l}from"./profile-1f1ffc1f.js"
import"./formToUrl-41bbf6ea.js"
import"./interceptSubmit-492af249.js"
import{i as b}from"./insertHtmlAfterEnd-d9a9762d.js"
import{a as $}from"./getIsOwnGuild-1987fdfd.js"
export default function(){const h=a('#profileLeftColumn img[src*="/avatars/"][width="200"]')
if(!h)return
const j=l(),k=s(e("player_id"),i()),T=$(),B=`<div align="center"><a class="fshQuickBuff quickButton tip-static" ${function(a,s){let i=""
return s&&(i="&blist="+s),`href='javascript:window.openWindow("${t}&tid=${a}${i}", "fsQuickBuff", 618, 1000, ",scrollbars")'`}(k)} data-tipped="Buff ${j}"></a>&nbsp;&nbsp;${function(){let t=n,a=""
return p("enableMaxGroupSizeToJoin")&&(t=c,a=` < ${p("maxGroupSizeToJoin")} Members`),`<a class="fshJoin quickButton tip-static" href="${t}" data-tipped="Join All Groups${a}"></a>&nbsp;&nbsp;`}()}<a class="fshGold quickButton tip-static" href="${r}&type=-3&tid=${k}" data-tipped="Go to ${j}'s auctions"></a>&nbsp;&nbsp;<a class="fshTempleTwo quickButton tip-static" href="${o}${j}" data-tipped="Create Secure Trade to ${j}"></a>&nbsp;&nbsp;${function(t,a){return t?`<a class="fshTempleThree quickButton tip-static" href="${f}${a}" data-tipped="Recall items from ${a}"></a>&nbsp;&nbsp;`:""}(T,j)}${function(t,a,s){return t&&p("showAdmin")?`<a class="quickButton tip-static" href="${d}members&subcmd2=changerank&member_id=${a}" data-tipped="Rank ${s}" style="background-image: url('${u}guilds/${m()}_mini.png');"></a>&nbsp;&nbsp;`:""}(T,k,j)}</div>`
b(h,B)}
//# sourceMappingURL=profileInjectQuickButton-f780c998.js.map
