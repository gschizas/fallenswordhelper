import{C as t,a2 as a,b0 as s,Q as i,L as e,c6 as o,bb as r,bT as n,H as p,bU as c,bo as f,s as d,aD as u}from"./calfSystem-71b9378d.js"
import"./playerName-17bbea9d.js"
import"./onlineDot-4f9ab5c3.js"
import"./batch-151895c0.js"
import"./colouredDots-10fbd2da.js"
import{c as m}from"./currentGuildId-58e8f97e.js"
import"./intValue-65d3c36c.js"
import"./valueText-4f638fd7.js"
import"./doStatTotal-f1c3cd46.js"
import{a as l}from"./profile-678af0d6.js"
import"./formToUrl-203c6ff2.js"
import"./interceptSubmit-c92da7b4.js"
import{i as b}from"./insertHtmlAfterEnd-8f485add.js"
import{a as $}from"./getIsOwnGuild-46322b8e.js"
function h(){const h=t('#profileLeftColumn img[src*="/avatars/"][width="200"]')
if(!h)return
const j=l(),k=a(i("player_id"),s()),T=$(),B=`<div align="center"><a class="fshQuickBuff quickButton tip-static" ${g=k,`href='javascript:window.openWindow("${e}&tid=${g}", "fsQuickBuff", 618, 1000, ",scrollbars")'`} data-tipped="Buff ${j}"></a>&nbsp;&nbsp;${function(){let t=n,a=""
return p("enableMaxGroupSizeToJoin")&&(t=c,a=` < ${p("maxGroupSizeToJoin")} Members`),`<a class="fshJoin quickButton tip-static" href="${t}" data-tipped="Join All Groups${a}"></a>&nbsp;&nbsp;`}()}<a class="fshGold quickButton tip-static" href="${o}&type=-3&tid=${k}" data-tipped="Go to ${j}'s auctions"></a>&nbsp;&nbsp;<a class="fshTempleTwo quickButton tip-static" href="${r}${j}" data-tipped="Create Secure Trade to ${j}"></a>&nbsp;&nbsp;${function(t,a){return t?`<a class="fshTempleThree quickButton tip-static" href="${f}${a}" data-tipped="Recall items from ${a}"></a>&nbsp;&nbsp;`:""}(T,j)}${function(t,a,s){return t&&p("showAdmin")?`<a class="quickButton tip-static" href="${d}members&subcmd2=changerank&member_id=${a}" data-tipped="Rank ${s}" style="background-image: url('${u}guilds/${m()}_mini.png');"></a>&nbsp;&nbsp;`:""}(T,k,j)}</div>`
var g
b(h,B)}export default h
//# sourceMappingURL=profileInjectQuickButton-895f991e.js.map
