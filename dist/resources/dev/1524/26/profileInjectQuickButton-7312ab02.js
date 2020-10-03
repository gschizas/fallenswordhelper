import{C as t,a3 as a,b7 as s,R as i,L as e,cc as r,bP as o,bZ as n,H as p,b_ as c,bt as u,s as d,aH as f}from"./calfSystem-4991bf5b.js"
import"./playerName-69861ead.js"
import"./onlineDot-7a595667.js"
import"./batch-4fce760b.js"
import"./colouredDots-4bc29b70.js"
import{c as m}from"./currentGuildId-56c2c861.js"
import"./intValue-e4cdd281.js"
import"./valueText-4b5d9d8a.js"
import"./doStatTotal-5899a68b.js"
import{a as l}from"./profile-90866045.js"
import"./formToUrl-66bca9f7.js"
import"./interceptSubmit-c0a2dd00.js"
import{i as b}from"./insertHtmlAfterEnd-93fb4549.js"
import{a as $}from"./getIsOwnGuild-808945ae.js"
function h(){const h=t('#profileLeftColumn img[src*="/avatars/"][width="200"]')
if(!h)return
const j=l(),k=a(i("player_id"),s()),T=$(),B=`<div align="center"><a class="fshQuickBuff quickButton tip-static" ${g=k,`href='javascript:window.openWindow("${e}&tid=${g}", "fsQuickBuff", 618, 1000, ",scrollbars")'`} data-tipped="Buff ${j}"></a>&nbsp;&nbsp;${function(){let t=n,a=""
return p("enableMaxGroupSizeToJoin")&&(t=c,a=` < ${p("maxGroupSizeToJoin")} Members`),`<a class="fshJoin quickButton tip-static" href="${t}" data-tipped="Join All Groups${a}"></a>&nbsp;&nbsp;`}()}<a class="fshGold quickButton tip-static" href="${r}&type=-3&tid=${k}" data-tipped="Go to ${j}'s auctions"></a>&nbsp;&nbsp;<a class="fshTempleTwo quickButton tip-static" href="${o}${j}" data-tipped="Create Secure Trade to ${j}"></a>&nbsp;&nbsp;${function(t,a){return t?`<a class="fshTempleThree quickButton tip-static" href="${u}${a}" data-tipped="Recall items from ${a}"></a>&nbsp;&nbsp;`:""}(T,j)}${function(t,a,s){return t&&p("showAdmin")?`<a class="quickButton tip-static" href="${d}members&subcmd2=changerank&member_id=${a}" data-tipped="Rank ${s}" style="background-image: url('${f}guilds/${m()}_mini.png');"></a>&nbsp;&nbsp;`:""}(T,k,j)}</div>`
var g
b(h,B)}export default h
//# sourceMappingURL=profileInjectQuickButton-7312ab02.js.map
