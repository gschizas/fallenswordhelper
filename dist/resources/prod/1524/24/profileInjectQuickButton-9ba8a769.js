import{L as t,C as s,a2 as a,b0 as i,P as e,c6 as o,bb as r,bT as n,H as p,bU as c,bo as u,s as f,aD as d}from"./calfSystem-ec854151.js"
import"./playerName-f06eed80.js"
import"./onlineDot-8d331eb0.js"
import"./batch-2b06347e.js"
import"./colouredDots-069c8fd6.js"
import{c as m}from"./currentGuildId-1299fc05.js"
import"./intValue-44683b42.js"
import"./valueText-0f3877db.js"
import"./doStatTotal-5c96ff36.js"
import{a as l}from"./profile-812bb681.js"
import"./formToUrl-48dc238d.js"
import"./interceptSubmit-99d78c5d.js"
import{i as b}from"./insertHtmlAfterEnd-29e289c9.js"
import{a as $}from"./getIsOwnGuild-df46ec89.js"
function h(){const h=s('#profileLeftColumn img[src*="/avatars/"][width="200"]')
if(!h)return
const j=l(),k=a(e("player_id"),i()),T=$(),B=`<div align="center"><a class="fshQuickBuff quickButton tip-static" ${function(s,a){let i=""
return a&&(i="&blist="+a),`href='javascript:window.openWindow("${t}&tid=${s}${i}", "fsQuickBuff", 618, 1000, ",scrollbars")'`}(k)} data-tipped="Buff ${j}"></a>&nbsp;&nbsp;${function(){let t=n,s=""
return p("enableMaxGroupSizeToJoin")&&(t=c,s=` < ${p("maxGroupSizeToJoin")} Members`),`<a class="fshJoin quickButton tip-static" href="${t}" data-tipped="Join All Groups${s}"></a>&nbsp;&nbsp;`}()}<a class="fshGold quickButton tip-static" href="${o}&type=-3&tid=${k}" data-tipped="Go to ${j}'s auctions"></a>&nbsp;&nbsp;<a class="fshTempleTwo quickButton tip-static" href="${r}${j}" data-tipped="Create Secure Trade to ${j}"></a>&nbsp;&nbsp;${function(t,s){return t?`<a class="fshTempleThree quickButton tip-static" href="${u}${s}" data-tipped="Recall items from ${s}"></a>&nbsp;&nbsp;`:""}(T,j)}${function(t,s,a){return t&&p("showAdmin")?`<a class="quickButton tip-static" href="${f}members&subcmd2=changerank&member_id=${s}" data-tipped="Rank ${a}" style="background-image: url('${d}guilds/${m()}_mini.png');"></a>&nbsp;&nbsp;`:""}(T,k,j)}</div>`
b(h,B)}export default h
//# sourceMappingURL=profileInjectQuickButton-9ba8a769.js.map
