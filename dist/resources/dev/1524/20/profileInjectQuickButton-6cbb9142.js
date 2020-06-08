import{L as t,C as a,a3 as s,b7 as i,Q as e,cb as r,bi as o,bZ as n,G as p,b_ as c,bv as u,s as f,aH as m}from"./calfSystem-a2862afc.js"
import"./playerName-72c7301a.js"
import"./onlineDot-003f5d07.js"
import"./batch-1aa805d3.js"
import"./colouredDots-0f189e6b.js"
import{c as l}from"./currentGuildId-e84c528e.js"
import"./intValue-8b673ab3.js"
import"./valueText-0b6b2a96.js"
import"./doStatTotal-c038ec00.js"
import{a as b}from"./profile-bfe1c384.js"
import"./formToUrl-3b57fbeb.js"
import"./interceptSubmit-e6a64c8e.js"
import{i as d}from"./insertHtmlAfterEnd-dd2b68c5.js"
import{a as $}from"./getIsOwnGuild-f1633f48.js"
export default function(){const h=a('#profileLeftColumn img[src*="/avatars/"][width="200"]')
if(!h)return
const j=b(),k=s(e("player_id"),i()),T=$(),B=`<div align="center"><a class="fshQuickBuff quickButton tip-static" ${function(a,s){let i=""
return s&&(i="&blist="+s),`href='javascript:window.openWindow("${t}&tid=${a}${i}", "fsQuickBuff", 618, 1000, ",scrollbars")'`}(k)} data-tipped="Buff ${j}"></a>&nbsp;&nbsp;${function(){let t=n,a=""
return p("enableMaxGroupSizeToJoin")&&(t=c,a=` < ${p("maxGroupSizeToJoin")} Members`),`<a class="fshJoin quickButton tip-static" href="${t}" data-tipped="Join All Groups${a}"></a>&nbsp;&nbsp;`}()}<a class="fshGold quickButton tip-static" href="${r}&type=-3&tid=${k}" data-tipped="Go to ${j}'s auctions"></a>&nbsp;&nbsp;<a class="fshTempleTwo quickButton tip-static" href="${o}${j}" data-tipped="Create Secure Trade to ${j}"></a>&nbsp;&nbsp;${function(t,a){return t?`<a class="fshTempleThree quickButton tip-static" href="${u}${a}" data-tipped="Recall items from ${a}"></a>&nbsp;&nbsp;`:""}(T,j)}${function(t,a,s){return t&&p("showAdmin")?`<a class="quickButton tip-static" href="${f}members&subcmd2=changerank&member_id=${a}" data-tipped="Rank ${s}" style="background-image: url('${m}guilds/${l()}_mini.png');"></a>&nbsp;&nbsp;`:""}(T,k,j)}</div>`
d(h,B)}
//# sourceMappingURL=profileInjectQuickButton-6cbb9142.js.map
