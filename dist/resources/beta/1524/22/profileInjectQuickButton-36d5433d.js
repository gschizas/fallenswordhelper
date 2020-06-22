import{L as t,C as a,a2 as s,b2 as i,P as e,ca as r,bd as o,bY as n,G as p,bZ as c,bt as f,s as d,aD as u}from"./calfSystem-1b876afa.js"
import"./playerName-14ec00f6.js"
import"./onlineDot-810a0302.js"
import"./batch-df466c20.js"
import"./colouredDots-dcd3ecc5.js"
import{c as m}from"./currentGuildId-000cb2c0.js"
import"./intValue-4dd66c70.js"
import"./valueText-266fd211.js"
import"./doStatTotal-d1242778.js"
import{a as l}from"./profile-314ff588.js"
import"./formToUrl-cdc17fa4.js"
import"./interceptSubmit-8946388b.js"
import{i as b}from"./insertHtmlAfterEnd-dd9b917d.js"
import{a as $}from"./getIsOwnGuild-f4f2e7ff.js"
export default function(){const h=a('#profileLeftColumn img[src*="/avatars/"][width="200"]')
if(!h)return
const j=l(),k=s(e("player_id"),i()),T=$(),B=`<div align="center"><a class="fshQuickBuff quickButton tip-static" ${function(a,s){let i=""
return s&&(i="&blist="+s),`href='javascript:window.openWindow("${t}&tid=${a}${i}", "fsQuickBuff", 618, 1000, ",scrollbars")'`}(k)} data-tipped="Buff ${j}"></a>&nbsp;&nbsp;${function(){let t=n,a=""
return p("enableMaxGroupSizeToJoin")&&(t=c,a=` < ${p("maxGroupSizeToJoin")} Members`),`<a class="fshJoin quickButton tip-static" href="${t}" data-tipped="Join All Groups${a}"></a>&nbsp;&nbsp;`}()}<a class="fshGold quickButton tip-static" href="${r}&type=-3&tid=${k}" data-tipped="Go to ${j}'s auctions"></a>&nbsp;&nbsp;<a class="fshTempleTwo quickButton tip-static" href="${o}${j}" data-tipped="Create Secure Trade to ${j}"></a>&nbsp;&nbsp;${function(t,a){return t?`<a class="fshTempleThree quickButton tip-static" href="${f}${a}" data-tipped="Recall items from ${a}"></a>&nbsp;&nbsp;`:""}(T,j)}${function(t,a,s){return t&&p("showAdmin")?`<a class="quickButton tip-static" href="${d}members&subcmd2=changerank&member_id=${a}" data-tipped="Rank ${s}" style="background-image: url('${u}guilds/${m()}_mini.png');"></a>&nbsp;&nbsp;`:""}(T,k,j)}</div>`
b(h,B)}
//# sourceMappingURL=profileInjectQuickButton-36d5433d.js.map
