import{y as a,aa as n,o as e,t as i,h as t,U as s,V as o,bZ as r,b_ as l,b$ as c,c0 as f,D as d,c1 as u,a0 as v,bw as g,ao as h,H as m,c2 as p,W as L,X as k,c3 as y,bU as b,a6 as $}from"./calfSystem-6459f18a.js"
import"./insertElementBefore-1b96a575.js"
import{c as j}from"./currentGuildId-da0b8fda.js"
import{c as N}from"./createLi-d700bab9.js"
import{c as B}from"./createAnchor-ed24ed1a.js"
import{i as G}from"./insertHtmlAfterEnd-deef01ad.js"
import{i as w}from"./insertElementAfter-3e96f910.js"
import{i as M}from"./insertHtmlBeforeBegin-88cc42a4.js"
function x(e,i,t){const s=a(e)
if(s instanceof Node){i(s.parentNode,t)}else n(`#${e} is not a Node`,!1)}function A(a,n){s("accordion",a),o(n)}function H(a,n){w(n,a)}function I(a,n,s,o){const r=N({className:"nav-level-"+a}),l=B({className:"nav-link fshPoint",textContent:n})
e(l,i(A,n,s)),t(r,l),x(o,H,r)}function P(a){!function(a){a.recipeManagerLink&&I("1","Recipe Manager",u,"nav-character-log")}(a),function(a){a.inventoryManagerLink&&x("nav-character-log",G,`<li class="nav-level-1"><a class="nav-link" id="nav-character-invmanager" href="${v}invmanagernew">Inventory Manager</a></li>`)}(a),function(a){a.medalGuideLink&&x("nav-character-log",G,`<li class="nav-level-1"><a class="nav-link" id="nav-character-medalguide" href="${g}${h}medalguide">Medal Guide</a></li>`)}(a),function(a){a.buffLogLink&&m("keepBuffLog")&&I("1","Buff Log",p,"nav-character-log")}(a),function(a){a.combatLogLink&&m("keepLogs")&&I("1","Combat Logs",L,"nav-character-notepad")}(a),function(a){a.creatureLogLink&&m("showMonsterLog")&&I("1","Creature Logs",k,"nav-character-notepad")}(a),function(a){a.quickLinksLink&&I("1","Quick Links",y,"nav-character-notepad")}(a)}function C(a,n,e){P(e),function(a){a.auctionSearchLink&&I("2","AH Quick Search",r,"nav-actions-trade-auctionhouse"),a.onlinePlayersLink&&I("2","Online Players",l,"nav-actions-interaction-findplayer"),a.findOtherLink&&I("2","Find Other",c,"nav-actions-interaction-findplayer"),a.findBuffsLink&&I("2","Find Buffs",f,"nav-actions-interaction-findplayer")}(e),function(a){a.guildInventoryLink&&j()&&x("nav-guild-storehouse-inventory",G,`<li class="nav-level-2"><a class="nav-link" id="nav-guild-guildinvmanager" href="${v}guildinvmgr">Guild Inventory</a></li>`)}(e),function(a){a.newGuildLogLink&&j()&&!m("useNewGuildLog")&&x("nav-guild-ledger-guildlog",M,`<li class="nav-level-2"><a class="nav-link" href="${b}">New Guild Log</a></li>`)}(e),function(a){a.topRatedLink&&x("nav-toprated-players-level",G,`<li class="nav-level-2"><a class="nav-link" id="nav-toprated-top250" href="${$}toprated${h}xp">Top 250 Players</a></li>`)}(e),function(a,n){n.heights=d("#nav > li").map(a=>22*d("li",a).length||null),-1!==Number(n.state)&&(a.children[n.state].children[1].style.height=n.heights[n.state]+"px")}(a,n)}export default C
//# sourceMappingURL=injectItems-7e111d29.js.map