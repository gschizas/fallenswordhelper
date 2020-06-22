import{B as t,b as i,p as o,y as e,bw as s,I as r,J as a,Z as f,H as n,G as c,bx as p,x as u,a as m}from"./calfSystem-4cc738f8.js"
import{p as l}from"./playerName-2fd84b2a.js"
import{c as d}from"./colouredDots-3c0d5727.js"
import{i as j}from"./intValue-209ea1ab.js"
import{v as b}from"./valueText-29e97f89.js"
import{d as h}from"./doStatTotal-1b23cdfd.js"
import{i as k}from"./interceptSubmit-c1f9070f.js"
let B,y,v
function x(){return B||(B=t(i("h1",o)[0])),B}function g(){return y||(v=x()===l(),y=!0),v}function P(){const i=Number(t(e(s)))
!function(t){return j(b(r(a)))===t}(i)?f(n,i):f(n,"")}function S(){g()&&(!async function(){const t=c("fastDebuff"),i=c("disableDeactivatePrompts")
if(t||i){(await import("./debuff-ff364d43.js")).default(t,i)}}(),c("countAllyEnemy")&&p(import("./profileAllyEnemy-77bec939.js")),c("enableQuickDrink")&&p(import("./fastWear-a6fd0010.js")),c("fixFolderImages")&&p(import("./fixFolders-4a25dea1.js")),c("componentWidgets")&&p(import("./components-9f5f4b4d.js")),c("quickWearLink")&&p(import("./quickWearLink-dd42aa7c.js")),c("selectAllLink")&&p(import("./selectAllLink-38c389f9.js")),P(),c("nekidButton")&&p(import("./nekidBtn-21b8fb57.js")),c("ajaxifyProfileSections")&&p(import("./ajaxifyProfileSections-80879af2.js")))}function L(){const t=g()
return function(t){return t&&c("renderSelfBio")}(t)||function(t){return!t&&c("renderOtherBios")}(t)}function w(){S(),c("showGuildRelationship")&&p(import("./profileInjectGuildRel-ebb139b9.js")),c("showQuickButtons")&&p(import("./profileInjectQuickButton-93124ffb.js")),c("injectBuffGuide")&&p(import("./updateBuffs-2130093b.js")),c("statisticsWrap")&&p(import("./updateStatistics-ac104e5b.js")),c("highlightPvpProtection")&&p(import("./highlightPvpProtection-baa704f1.js")),L()&&p(import("./bio-9fc1b5d3.js")),c("enableBioCompressor")&&p(import("./compressBio-1785ad07.js")),h(),c("showBuffLevel")&&p(import("./buffLevelDisplay-24b5645f.js")),m(3,d)}var D=Object.freeze({__proto__:null,default:function(){u()||(w(),g()||k())}})
export{x as a,g,D as p}
//# sourceMappingURL=profile-d042f7a7.js.map
