import{B as t,b as i,p as e,y as o,bw as s,I as a,J as r,Z as n,H as c,G as f,bx as p,x as u,a as m}from"./calfSystem-a2862afc.js"
import{p as l}from"./playerName-72c7301a.js"
import{c as b}from"./colouredDots-0f189e6b.js"
import{i as j}from"./intValue-8b673ab3.js"
import{v as d}from"./valueText-0b6b2a96.js"
import{d as k}from"./doStatTotal-c038ec00.js"
import{i as h}from"./interceptSubmit-e6a64c8e.js"
let B,y,x
function g(){return B||(B=t(i("h1",e)[0])),B}function P(){return y||(x=g()===l(),y=!0),x}function S(){const i=Number(t(o(s)))
!function(t){return j(d(a(r)))===t}(i)?n(c,i):n(c,"")}function v(){P()&&(!async function(){const t=f("fastDebuff"),i=f("disableDeactivatePrompts")
if(t||i){(await import("./debuff-cad68427.js")).default(t,i)}}(),f("countAllyEnemy")&&p(import("./profileAllyEnemy-1c4b73c3.js")),f("enableQuickDrink")&&p(import("./fastWear-9a2a95d6.js")),f("fixFolderImages")&&p(import("./fixFolders-06f5f6f3.js")),f("componentWidgets")&&p(import("./components-40fa7543.js")),f("quickWearLink")&&p(import("./quickWearLink-4c323ecf.js")),f("selectAllLink")&&p(import("./selectAllLink-b409edb1.js")),S(),f("nekidButton")&&p(import("./nekidBtn-f8744852.js")),f("ajaxifyProfileSections")&&p(import("./ajaxifyProfileSections-68b6fecb.js")))}function W(){const t=P()
return function(t){return t&&f("renderSelfBio")}(t)||function(t){return!t&&f("renderOtherBios")}(t)}function w(){v(),f("showGuildRelationship")&&p(import("./profileInjectGuildRel-85c5d511.js")),f("showQuickButtons")&&p(import("./profileInjectQuickButton-6cbb9142.js")),f("injectBuffGuide")&&p(import("./updateBuffs-5a0b6d7e.js")),f("statisticsWrap")&&p(import("./updateStatistics-b34e4a3b.js")),f("highlightPvpProtection")&&p(import("./highlightPvpProtection-cae3d64b.js")),W()&&p(import("./bio-52bcfdad.js")),f("enableBioCompressor")&&p(import("./compressBio-368a3474.js")),k(),m(3,b)}var A=Object.freeze({__proto__:null,default:function(){u()||(w(),P()||h())}})
export{g as a,P as g,A as p}
//# sourceMappingURL=profile-bfe1c384.js.map
