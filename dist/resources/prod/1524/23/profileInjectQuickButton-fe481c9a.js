import{L as t,C as a,a2 as s,b0 as e,P as i,c6 as o,bb as r,bT as n,G as p,bU as c,bo as u,s as d,aD as f}from"./calfSystem-019de1cf.js"
import"./playerName-569fc693.js"
import"./onlineDot-b729ce9d.js"
import"./batch-7b1ea568.js"
import"./colouredDots-f42e5f7f.js"
import{c as m}from"./currentGuildId-a399e8da.js"
import"./intValue-0e84cdad.js"
import"./valueText-4e1cfc2e.js"
import"./doStatTotal-928129d1.js"
import{a as l}from"./profile-57565e2d.js"
import"./formToUrl-91be1404.js"
import"./interceptSubmit-7b40d68d.js"
import{i as b}from"./insertHtmlAfterEnd-4e8e25bc.js"
import{a as $}from"./getIsOwnGuild-5922e7d8.js"
export default function(){const h=a('#profileLeftColumn img[src*="/avatars/"][width="200"]')
if(!h)return
const j=l(),k=s(i("player_id"),e()),T=$(),B=`<div align="center"><a class="fshQuickBuff quickButton tip-static" ${function(a,s){let e=""
return s&&(e="&blist="+s),`href='javascript:window.openWindow("${t}&tid=${a}${e}", "fsQuickBuff", 618, 1000, ",scrollbars")'`}(k)} data-tipped="Buff ${j}"></a>&nbsp;&nbsp;${function(){let t=n,a=""
return p("enableMaxGroupSizeToJoin")&&(t=c,a=` < ${p("maxGroupSizeToJoin")} Members`),`<a class="fshJoin quickButton tip-static" href="${t}" data-tipped="Join All Groups${a}"></a>&nbsp;&nbsp;`}()}<a class="fshGold quickButton tip-static" href="${o}&type=-3&tid=${k}" data-tipped="Go to ${j}'s auctions"></a>&nbsp;&nbsp;<a class="fshTempleTwo quickButton tip-static" href="${r}${j}" data-tipped="Create Secure Trade to ${j}"></a>&nbsp;&nbsp;${function(t,a){return t?`<a class="fshTempleThree quickButton tip-static" href="${u}${a}" data-tipped="Recall items from ${a}"></a>&nbsp;&nbsp;`:""}(T,j)}${function(t,a,s){return t&&p("showAdmin")?`<a class="quickButton tip-static" href="${d}members&subcmd2=changerank&member_id=${a}" data-tipped="Rank ${s}" style="background-image: url('${f}guilds/${m()}_mini.png');"></a>&nbsp;&nbsp;`:""}(T,k,j)}</div>`
b(h,B)}
//# sourceMappingURL=profileInjectQuickButton-fe481c9a.js.map
