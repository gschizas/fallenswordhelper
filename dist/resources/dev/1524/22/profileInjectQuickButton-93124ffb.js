import{L as t,C as a,a3 as s,b7 as i,Q as e,cc as r,bi as o,b_ as n,G as p,b$ as c,bv as f,s as u,aH as d}from"./calfSystem-4cc738f8.js"
import"./playerName-2fd84b2a.js"
import"./onlineDot-7fc3dfe9.js"
import"./batch-b1efab68.js"
import"./colouredDots-3c0d5727.js"
import{c as m}from"./currentGuildId-53b525a7.js"
import"./intValue-209ea1ab.js"
import"./valueText-29e97f89.js"
import"./doStatTotal-1b23cdfd.js"
import{a as l}from"./profile-d042f7a7.js"
import"./formToUrl-84dfad91.js"
import"./interceptSubmit-c1f9070f.js"
import{i as b}from"./insertHtmlAfterEnd-3b4dcf73.js"
import{a as $}from"./getIsOwnGuild-22d0008c.js"
export default function(){const h=a('#profileLeftColumn img[src*="/avatars/"][width="200"]')
if(!h)return
const j=l(),k=s(e("player_id"),i()),T=$(),B=`<div align="center"><a class="fshQuickBuff quickButton tip-static" ${function(a,s){let i=""
return s&&(i="&blist="+s),`href='javascript:window.openWindow("${t}&tid=${a}${i}", "fsQuickBuff", 618, 1000, ",scrollbars")'`}(k)} data-tipped="Buff ${j}"></a>&nbsp;&nbsp;${function(){let t=n,a=""
return p("enableMaxGroupSizeToJoin")&&(t=c,a=` < ${p("maxGroupSizeToJoin")} Members`),`<a class="fshJoin quickButton tip-static" href="${t}" data-tipped="Join All Groups${a}"></a>&nbsp;&nbsp;`}()}<a class="fshGold quickButton tip-static" href="${r}&type=-3&tid=${k}" data-tipped="Go to ${j}'s auctions"></a>&nbsp;&nbsp;<a class="fshTempleTwo quickButton tip-static" href="${o}${j}" data-tipped="Create Secure Trade to ${j}"></a>&nbsp;&nbsp;${function(t,a){return t?`<a class="fshTempleThree quickButton tip-static" href="${f}${a}" data-tipped="Recall items from ${a}"></a>&nbsp;&nbsp;`:""}(T,j)}${function(t,a,s){return t&&p("showAdmin")?`<a class="quickButton tip-static" href="${u}members&subcmd2=changerank&member_id=${a}" data-tipped="Rank ${s}" style="background-image: url('${d}guilds/${m()}_mini.png');"></a>&nbsp;&nbsp;`:""}(T,k,j)}</div>`
b(h,B)}
//# sourceMappingURL=profileInjectQuickButton-93124ffb.js.map
