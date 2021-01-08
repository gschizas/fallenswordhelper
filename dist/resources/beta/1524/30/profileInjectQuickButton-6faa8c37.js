import{C as t,a2 as s,b1 as a,Q as i,L as e,c9 as r,bM as o,bW as p,c as n,bX as c,bq as u,H as f,s as m,aD as d}from"./calfSystem-ebf4b17d.js"
import"./playerName-1bc13590.js"
import"./onlineDot-08128370.js"
import"./batch-3642a7ff.js"
import"./colouredDots-89402236.js"
import{c as l}from"./currentGuildId-f7450bbe.js"
import"./intValue-e8157483.js"
import"./valueText-b6db7b96.js"
import"./doStatTotal-4d2c7207.js"
import"./executeAll-be2ac0ec.js"
import{a as b}from"./profile-5c2817c8.js"
import"./formToUrl-c9020722.js"
import"./interceptSubmit-3d708b68.js"
import{i as $}from"./insertHtmlAfterEnd-e822003d.js"
import{a as h}from"./getIsOwnGuild-71f83f16.js"
function j(){const j=t('#profileLeftColumn img[src*="/avatars/"][width="200"]')
if(!j)return
const k=b(),T=s(i("player_id"),a()),B=h(),g=`<div align="center"><a class="fshQuickBuff quickButton tip-static" ${q=T,`href='javascript:window.openWindow("${e}&tid=${q}", "fsQuickBuff", 618, 1000, ",scrollbars")'`} data-tipped="Buff ${k}"></a>&nbsp;&nbsp;${function(){let t=p,s=""
return n.enableMaxGroupSizeToJoin&&(t=c,s=` < ${n.maxGroupSizeToJoin} Members`),`<a class="fshJoin quickButton tip-static" href="${t}" data-tipped="Join All Groups${s}"></a>&nbsp;&nbsp;`}()}<a class="fshGold quickButton tip-static" href="${r}&type=-3&tid=${T}" data-tipped="Go to ${k}'s auctions"></a>&nbsp;&nbsp;<a class="fshTempleTwo quickButton tip-static" href="${o}${k}" data-tipped="Create Secure Trade to ${k}"></a>&nbsp;&nbsp;${function(t,s){return t?`<a class="fshTempleThree quickButton tip-static" href="${u}${s}" data-tipped="Recall items from ${s}"></a>&nbsp;&nbsp;`:""}(B,k)}${function(t,s,a){return t&&f("showAdmin")?`<a class="quickButton tip-static" href="${m}members&subcmd2=changerank&member_id=${s}" data-tipped="Rank ${a}" style="background-image: url('${d}guilds/${l()}_mini.png');"></a>&nbsp;&nbsp;`:""}(B,T,k)}</div>`
var q
$(j,g)}export default j
//# sourceMappingURL=profileInjectQuickButton-6faa8c37.js.map
