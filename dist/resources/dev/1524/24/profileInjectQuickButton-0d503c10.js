import{L as t,C as s,a3 as a,b7 as i,Q as e,cc as r,bi as o,b_ as n,H as p,b$ as c,bv as f,s as u,aH as d}from"./calfSystem-38898f3e.js"
import"./playerName-b488fc7a.js"
import"./onlineDot-e1f61292.js"
import"./batch-21cc76f7.js"
import"./colouredDots-968ed19c.js"
import{c as m}from"./currentGuildId-7855dbba.js"
import"./intValue-44683b42.js"
import"./valueText-df2d502e.js"
import"./doStatTotal-19a42dfd.js"
import{a as l}from"./profile-d93f313c.js"
import"./formToUrl-3fe1dedb.js"
import"./interceptSubmit-7919653e.js"
import{i as b}from"./insertHtmlAfterEnd-8b82fe39.js"
import{a as $}from"./getIsOwnGuild-925780e2.js"
function h(){const h=s('#profileLeftColumn img[src*="/avatars/"][width="200"]')
if(!h)return
const j=l(),k=a(e("player_id"),i()),T=$(),B=`<div align="center"><a class="fshQuickBuff quickButton tip-static" ${function(s,a){let i=""
return a&&(i="&blist="+a),`href='javascript:window.openWindow("${t}&tid=${s}${i}", "fsQuickBuff", 618, 1000, ",scrollbars")'`}(k)} data-tipped="Buff ${j}"></a>&nbsp;&nbsp;${function(){let t=n,s=""
return p("enableMaxGroupSizeToJoin")&&(t=c,s=` < ${p("maxGroupSizeToJoin")} Members`),`<a class="fshJoin quickButton tip-static" href="${t}" data-tipped="Join All Groups${s}"></a>&nbsp;&nbsp;`}()}<a class="fshGold quickButton tip-static" href="${r}&type=-3&tid=${k}" data-tipped="Go to ${j}'s auctions"></a>&nbsp;&nbsp;<a class="fshTempleTwo quickButton tip-static" href="${o}${j}" data-tipped="Create Secure Trade to ${j}"></a>&nbsp;&nbsp;${function(t,s){return t?`<a class="fshTempleThree quickButton tip-static" href="${f}${s}" data-tipped="Recall items from ${s}"></a>&nbsp;&nbsp;`:""}(T,j)}${function(t,s,a){return t&&p("showAdmin")?`<a class="quickButton tip-static" href="${u}members&subcmd2=changerank&member_id=${s}" data-tipped="Rank ${a}" style="background-image: url('${d}guilds/${m()}_mini.png');"></a>&nbsp;&nbsp;`:""}(T,k,j)}</div>`
b(h,B)}export default h
//# sourceMappingURL=profileInjectQuickButton-0d503c10.js.map
