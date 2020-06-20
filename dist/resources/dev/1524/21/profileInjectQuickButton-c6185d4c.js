import{L as t,C as a,a3 as s,b7 as i,Q as e,cc as r,bi as o,b_ as n,G as p,b$ as c,bv as u,s as d,aH as f}from"./calfSystem-9c7241dc.js"
import"./playerName-ddecc25a.js"
import"./onlineDot-4bf0b1ba.js"
import"./batch-2ee31e9e.js"
import"./colouredDots-d1da220f.js"
import{c as m}from"./currentGuildId-00053b50.js"
import"./intValue-4cb61c79.js"
import"./valueText-2c80175b.js"
import"./doStatTotal-db2c1a58.js"
import{a as l}from"./profile-e69ee78c.js"
import"./formToUrl-39ed921f.js"
import"./interceptSubmit-9fc997ac.js"
import{i as b}from"./insertHtmlAfterEnd-1e4cd611.js"
import{a as $}from"./getIsOwnGuild-21fdd726.js"
export default function(){const h=a('#profileLeftColumn img[src*="/avatars/"][width="200"]')
if(!h)return
const j=l(),k=s(e("player_id"),i()),T=$(),B=`<div align="center"><a class="fshQuickBuff quickButton tip-static" ${function(a,s){let i=""
return s&&(i="&blist="+s),`href='javascript:window.openWindow("${t}&tid=${a}${i}", "fsQuickBuff", 618, 1000, ",scrollbars")'`}(k)} data-tipped="Buff ${j}"></a>&nbsp;&nbsp;${function(){let t=n,a=""
return p("enableMaxGroupSizeToJoin")&&(t=c,a=` < ${p("maxGroupSizeToJoin")} Members`),`<a class="fshJoin quickButton tip-static" href="${t}" data-tipped="Join All Groups${a}"></a>&nbsp;&nbsp;`}()}<a class="fshGold quickButton tip-static" href="${r}&type=-3&tid=${k}" data-tipped="Go to ${j}'s auctions"></a>&nbsp;&nbsp;<a class="fshTempleTwo quickButton tip-static" href="${o}${j}" data-tipped="Create Secure Trade to ${j}"></a>&nbsp;&nbsp;${function(t,a){return t?`<a class="fshTempleThree quickButton tip-static" href="${u}${a}" data-tipped="Recall items from ${a}"></a>&nbsp;&nbsp;`:""}(T,j)}${function(t,a,s){return t&&p("showAdmin")?`<a class="quickButton tip-static" href="${d}members&subcmd2=changerank&member_id=${a}" data-tipped="Rank ${s}" style="background-image: url('${f}guilds/${m()}_mini.png');"></a>&nbsp;&nbsp;`:""}(T,k,j)}</div>`
b(h,B)}
//# sourceMappingURL=profileInjectQuickButton-c6185d4c.js.map
