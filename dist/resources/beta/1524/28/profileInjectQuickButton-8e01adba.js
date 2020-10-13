import{C as t,a2 as a,b1 as s,Q as i,L as e,c9 as r,bM as o,bW as p,c as n,bX as c,bq as u,H as d,s as f,aD as m}from"./calfSystem-964f4fc9.js"
import"./playerName-19c0b1a7.js"
import"./onlineDot-8bb6540e.js"
import"./batch-e3296e27.js"
import"./colouredDots-78a9b63d.js"
import{c as l}from"./currentGuildId-26c6bca8.js"
import"./intValue-f4d85578.js"
import"./valueText-9fa15adc.js"
import"./doStatTotal-8d3692eb.js"
import"./executeAll-3d4e4221.js"
import{a as b}from"./profile-2414b3be.js"
import"./formToUrl-d1b2482f.js"
import"./interceptSubmit-ddb18ec3.js"
import{i as $}from"./insertHtmlAfterEnd-17c23200.js"
import{a as h}from"./getIsOwnGuild-49882224.js"
function j(){const j=t('#profileLeftColumn img[src*="/avatars/"][width="200"]')
if(!j)return
const k=b(),T=a(i("player_id"),s()),B=h(),g=`<div align="center"><a class="fshQuickBuff quickButton tip-static" ${q=T,`href='javascript:window.openWindow("${e}&tid=${q}", "fsQuickBuff", 618, 1000, ",scrollbars")'`} data-tipped="Buff ${k}"></a>&nbsp;&nbsp;${function(){let t=p,a=""
return n.enableMaxGroupSizeToJoin&&(t=c,a=` < ${n.maxGroupSizeToJoin} Members`),`<a class="fshJoin quickButton tip-static" href="${t}" data-tipped="Join All Groups${a}"></a>&nbsp;&nbsp;`}()}<a class="fshGold quickButton tip-static" href="${r}&type=-3&tid=${T}" data-tipped="Go to ${k}'s auctions"></a>&nbsp;&nbsp;<a class="fshTempleTwo quickButton tip-static" href="${o}${k}" data-tipped="Create Secure Trade to ${k}"></a>&nbsp;&nbsp;${function(t,a){return t?`<a class="fshTempleThree quickButton tip-static" href="${u}${a}" data-tipped="Recall items from ${a}"></a>&nbsp;&nbsp;`:""}(B,k)}${function(t,a,s){return t&&d("showAdmin")?`<a class="quickButton tip-static" href="${f}members&subcmd2=changerank&member_id=${a}" data-tipped="Rank ${s}" style="background-image: url('${m}guilds/${l()}_mini.png');"></a>&nbsp;&nbsp;`:""}(B,T,k)}</div>`
var q
$(j,g)}export default j
//# sourceMappingURL=profileInjectQuickButton-8e01adba.js.map
