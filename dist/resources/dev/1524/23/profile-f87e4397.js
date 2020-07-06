import{B as t,b as e,p as i,y as o,bw as s,I as a,J as r,Z as n,H as f,G as c,bx as p,x as u,a as m}from"./calfSystem-9901ad27.js"
import{p as l}from"./playerName-a0f4217f.js"
import{c as d}from"./colouredDots-e6de8d7d.js"
import{i as j}from"./intValue-0e84cdad.js"
import{v as b}from"./valueText-3f53d458.js"
import{d as h}from"./doStatTotal-226a98f1.js"
import{i as k}from"./interceptSubmit-ce974a7c.js"
let B,y,v
function x(){return B||(B=t(e("h1",i)[0])),B}function g(){return y||(v=x()===l(),y=!0),v}function P(){const e=Number(t(o(s)))
!function(t){return j(b(a(r)))===t}(e)?n(f,e):n(f,"")}function S(){g()&&(!async function(){const t=c("fastDebuff"),e=c("disableDeactivatePrompts")
if(t||e){(await import("./debuff-ad313ff6.js")).default(t,e)}}(),c("countAllyEnemy")&&p(import("./profileAllyEnemy-6ba11d0a.js")),c("enableQuickDrink")&&p(import("./fastWear-b8469a41.js")),c("fixFolderImages")&&p(import("./fixFolders-b792451f.js")),c("componentWidgets")&&p(import("./components-9d560deb.js")),c("quickWearLink")&&p(import("./quickWearLink-0c0d3aae.js")),c("selectAllLink")&&p(import("./selectAllLink-84a6e52d.js")),P(),c("nekidButton")&&p(import("./nekidBtn-26e6c8aa.js")),c("ajaxifyProfileSections")&&p(import("./ajaxifyProfileSections-9771e3ed.js")))}function L(){const t=g()
return function(t){return t&&c("renderSelfBio")}(t)||function(t){return!t&&c("renderOtherBios")}(t)}function w(){S(),c("showGuildRelationship")&&p(import("./profileInjectGuildRel-2422351d.js")),c("showQuickButtons")&&p(import("./profileInjectQuickButton-018ef511.js")),c("injectBuffGuide")&&p(import("./updateBuffs-f6e1cfae.js")),c("statisticsWrap")&&p(import("./updateStatistics-fb66ece9.js")),c("highlightPvpProtection")&&p(import("./highlightPvpProtection-30c0bbe4.js")),L()&&p(import("./bio-dacd0321.js")),c("enableBioCompressor")&&p(import("./compressBio-a29f2a2d.js")),h(),c("showBuffLevel")&&p(import("./buffLevelDisplay-4c3f3871.js")),m(3,d)}var D=Object.freeze({__proto__:null,default:function(){u()||(w(),g()||k())}})
export{x as a,g,D as p}
//# sourceMappingURL=profile-f87e4397.js.map
