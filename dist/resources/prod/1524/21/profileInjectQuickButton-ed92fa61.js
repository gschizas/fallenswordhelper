import{L as t,C as a,a2 as s,b0 as i,P as e,c6 as o,bb as r,bT as n,G as p,bU as c,bo as u,s as f,aD as d}from"./calfSystem-2741d97b.js"
import"./playerName-5fbf0efe.js"
import"./onlineDot-f6177bb2.js"
import"./batch-835abad1.js"
import"./colouredDots-b06d7daf.js"
import{c as m}from"./currentGuildId-2c5ea0ad.js"
import"./intValue-1a593541.js"
import"./valueText-9aacf9d4.js"
import"./doStatTotal-70ec844a.js"
import{a as l}from"./profile-74acb2a5.js"
import"./formToUrl-d134536c.js"
import"./interceptSubmit-60aabec1.js"
import{i as b}from"./insertHtmlAfterEnd-65ae14da.js"
import{a as $}from"./getIsOwnGuild-938b333b.js"
export default function(){const h=a('#profileLeftColumn img[src*="/avatars/"][width="200"]')
if(!h)return
const j=l(),k=s(e("player_id"),i()),T=$(),B=`<div align="center"><a class="fshQuickBuff quickButton tip-static" ${function(a,s){let i=""
return s&&(i="&blist="+s),`href='javascript:window.openWindow("${t}&tid=${a}${i}", "fsQuickBuff", 618, 1000, ",scrollbars")'`}(k)} data-tipped="Buff ${j}"></a>&nbsp;&nbsp;${function(){let t=n,a=""
return p("enableMaxGroupSizeToJoin")&&(t=c,a=` < ${p("maxGroupSizeToJoin")} Members`),`<a class="fshJoin quickButton tip-static" href="${t}" data-tipped="Join All Groups${a}"></a>&nbsp;&nbsp;`}()}<a class="fshGold quickButton tip-static" href="${o}&type=-3&tid=${k}" data-tipped="Go to ${j}'s auctions"></a>&nbsp;&nbsp;<a class="fshTempleTwo quickButton tip-static" href="${r}${j}" data-tipped="Create Secure Trade to ${j}"></a>&nbsp;&nbsp;${function(t,a){return t?`<a class="fshTempleThree quickButton tip-static" href="${u}${a}" data-tipped="Recall items from ${a}"></a>&nbsp;&nbsp;`:""}(T,j)}${function(t,a,s){return t&&p("showAdmin")?`<a class="quickButton tip-static" href="${f}members&subcmd2=changerank&member_id=${a}" data-tipped="Rank ${s}" style="background-image: url('${d}guilds/${m()}_mini.png');"></a>&nbsp;&nbsp;`:""}(T,k,j)}</div>`
b(h,B)}
//# sourceMappingURL=profileInjectQuickButton-ed92fa61.js.map
