import{y as a,aa as n,o as e,t as i,h as t,U as s,V as r,b_ as o,b$ as c,c0 as l,c1 as u,a9 as f,c2 as d,a0 as v,bA as g,ao as h,G as m,c3 as p,W as L,X as k,c4 as y,bW as b,a6 as $}from"./calfSystem-d04e4be4.js"
import"./insertElementBefore-cc030078.js"
import{c as j}from"./currentGuildId-9ae9b1fe.js"
import{c as G}from"./createLi-392dacb2.js"
import{c as N}from"./createAnchor-650d9fc8.js"
import{i as B}from"./insertHtmlAfterEnd-8f464ed1.js"
import{i as M}from"./insertElementAfter-a8f78905.js"
import{i as w}from"./insertHtmlBeforeBegin-9b8e554c.js"
function x(e,i,t){const s=a(e)
if(s instanceof Node){i(s.parentNode,t)}else n(`#${e} is not a Node`,!1)}function A(a,n){s("accordion",a),r(n)}function E(a,n){M(n,a)}function I(a,n,s,r){const o=G({className:"nav-level-"+a}),c=N({className:"nav-link fshPoint",textContent:n})
e(c,i(A,n,s)),t(o,c),x(r,E,o)}const P=a=>22*a.length,S=n=>P(a("nav-"+n).nextElementSibling.children),C=a=>P(f(`#nav-${a} > ul li`))
function H(a){!function(a){a.recipeManagerLink&&I("1","Recipe Manager",d,"nav-character-log")}(a),function(a){a.inventoryManagerLink&&x("nav-character-log",B,`<li class="nav-level-1"><a class="nav-link" id="nav-character-invmanager" href="${v}invmanagernew">Inventory Manager</a></li>`)}(a),function(a){a.medalGuideLink&&x("nav-character-log",B,`<li class="nav-level-1"><a class="nav-link" id="nav-character-medalguide" href="${g}${h}medalguide">Medal Guide</a></li>`)}(a),function(a){a.buffLogLink&&m("keepBuffLog")&&I("1","Buff Log",p,"nav-character-log")}(a),function(a){a.combatLogLink&&m("keepLogs")&&I("1","Combat Logs",L,"nav-character-notepad")}(a),function(a){a.creatureLogLink&&m("showMonsterLog")&&I("1","Creature Logs",k,"nav-character-notepad")}(a),function(a){a.quickLinksLink&&I("1","Quick Links",y,"nav-character-notepad")}(a)}export default function(a,n,e){H(e),function(a){a.auctionSearchLink&&I("2","AH Quick Search",o,"nav-actions-trade-auctionhouse"),a.onlinePlayersLink&&I("2","Online Players",c,"nav-actions-interaction-findplayer"),a.findOtherLink&&I("2","Find Other",l,"nav-actions-interaction-findplayer"),a.findBuffsLink&&I("2","Find Buffs",u,"nav-actions-interaction-findplayer")}(e),function(a){a.guildInventoryLink&&j()&&x("nav-guild-storehouse-inventory",B,`<li class="nav-level-2"><a class="nav-link" id="nav-guild-guildinvmanager" href="${v}guildinvmgr">Guild Inventory</a></li>`)}(e),function(a){a.newGuildLogLink&&j()&&!m("useNewGuildLog")&&x("nav-guild-ledger-guildlog",w,`<li class="nav-level-2"><a class="nav-link" href="${b}">New Guild Log</a></li>`)}(e),function(a){a.topRatedLink&&x("nav-toprated-players-level",B,`<li class="nav-level-2"><a class="nav-link" id="nav-toprated-top250" href="${$}toprated${h}xp">Top 250 Players</a></li>`)}(e),function(a,n){n.heights=[null,null,S("character"),C("actions"),C("guild"),C("toprated"),C("upgrades"),S("resources"),null],-1!==Number(n.state)&&(a.children[n.state].children[1].style.height=n.heights[n.state]+"px")}(a,n)}
//# sourceMappingURL=injectItems-27b92dbb.js.map
