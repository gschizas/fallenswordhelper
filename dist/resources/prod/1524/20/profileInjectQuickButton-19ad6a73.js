import{L as t,C as s,a2 as a,b0 as i,P as e,c5 as o,bb as r,bS as n,G as p,bT as c,bo as u,s as d,aD as f}from"./calfSystem-03970067.js"
import"./playerName-e0979c8e.js"
import"./onlineDot-e09bcdeb.js"
import"./batch-dfc92608.js"
import"./colouredDots-d1b69d53.js"
import{c as m}from"./currentGuildId-cce6862b.js"
import"./intValue-0d844fc4.js"
import"./valueText-49d1445b.js"
import"./doStatTotal-85eb4928.js"
import{a as l}from"./profile-31bb0967.js"
import"./formToUrl-906ab550.js"
import"./interceptSubmit-e3519b7d.js"
import{i as b}from"./insertHtmlAfterEnd-d9794923.js"
import{a as $}from"./getIsOwnGuild-22a187f1.js"
export default function(){const h=s('#profileLeftColumn img[src*="/avatars/"][width="200"]')
if(!h)return
const j=l(),k=a(e("player_id"),i()),T=$(),B=`<div align="center"><a class="fshQuickBuff quickButton tip-static" ${function(s,a){let i=""
return a&&(i="&blist="+a),`href='javascript:window.openWindow("${t}&tid=${s}${i}", "fsQuickBuff", 618, 1000, ",scrollbars")'`}(k)} data-tipped="Buff ${j}"></a>&nbsp;&nbsp;${function(){let t=n,s=""
return p("enableMaxGroupSizeToJoin")&&(t=c,s=` < ${p("maxGroupSizeToJoin")} Members`),`<a class="fshJoin quickButton tip-static" href="${t}" data-tipped="Join All Groups${s}"></a>&nbsp;&nbsp;`}()}<a class="fshGold quickButton tip-static" href="${o}&type=-3&tid=${k}" data-tipped="Go to ${j}'s auctions"></a>&nbsp;&nbsp;<a class="fshTempleTwo quickButton tip-static" href="${r}${j}" data-tipped="Create Secure Trade to ${j}"></a>&nbsp;&nbsp;${function(t,s){return t?`<a class="fshTempleThree quickButton tip-static" href="${u}${s}" data-tipped="Recall items from ${s}"></a>&nbsp;&nbsp;`:""}(T,j)}${function(t,s,a){return t&&p("showAdmin")?`<a class="quickButton tip-static" href="${d}members&subcmd2=changerank&member_id=${s}" data-tipped="Rank ${a}" style="background-image: url('${f}guilds/${m()}_mini.png');"></a>&nbsp;&nbsp;`:""}(T,k,j)}</div>`
b(h,B)}
//# sourceMappingURL=profileInjectQuickButton-19ad6a73.js.map
