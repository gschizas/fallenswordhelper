import{L as t,C as a,a3 as s,b7 as i,Q as e,cc as r,bi as o,b_ as n,G as p,b$ as c,bv as u,s as d,aH as f}from"./calfSystem-9901ad27.js"
import"./playerName-a0f4217f.js"
import"./onlineDot-b29de868.js"
import"./batch-e74a5e93.js"
import"./colouredDots-e6de8d7d.js"
import{c as m}from"./currentGuildId-86da8be9.js"
import"./intValue-0e84cdad.js"
import"./valueText-3f53d458.js"
import"./doStatTotal-226a98f1.js"
import{a as l}from"./profile-f87e4397.js"
import"./formToUrl-4cebc28a.js"
import"./interceptSubmit-ce974a7c.js"
import{i as b}from"./insertHtmlAfterEnd-74bf7056.js"
import{a as $}from"./getIsOwnGuild-94fa006d.js"
export default function(){const h=a('#profileLeftColumn img[src*="/avatars/"][width="200"]')
if(!h)return
const j=l(),k=s(e("player_id"),i()),T=$(),B=`<div align="center"><a class="fshQuickBuff quickButton tip-static" ${function(a,s){let i=""
return s&&(i="&blist="+s),`href='javascript:window.openWindow("${t}&tid=${a}${i}", "fsQuickBuff", 618, 1000, ",scrollbars")'`}(k)} data-tipped="Buff ${j}"></a>&nbsp;&nbsp;${function(){let t=n,a=""
return p("enableMaxGroupSizeToJoin")&&(t=c,a=` < ${p("maxGroupSizeToJoin")} Members`),`<a class="fshJoin quickButton tip-static" href="${t}" data-tipped="Join All Groups${a}"></a>&nbsp;&nbsp;`}()}<a class="fshGold quickButton tip-static" href="${r}&type=-3&tid=${k}" data-tipped="Go to ${j}'s auctions"></a>&nbsp;&nbsp;<a class="fshTempleTwo quickButton tip-static" href="${o}${j}" data-tipped="Create Secure Trade to ${j}"></a>&nbsp;&nbsp;${function(t,a){return t?`<a class="fshTempleThree quickButton tip-static" href="${u}${a}" data-tipped="Recall items from ${a}"></a>&nbsp;&nbsp;`:""}(T,j)}${function(t,a,s){return t&&p("showAdmin")?`<a class="quickButton tip-static" href="${d}members&subcmd2=changerank&member_id=${a}" data-tipped="Rank ${s}" style="background-image: url('${f}guilds/${m()}_mini.png');"></a>&nbsp;&nbsp;`:""}(T,k,j)}</div>`
b(h,B)}
//# sourceMappingURL=profileInjectQuickButton-018ef511.js.map
