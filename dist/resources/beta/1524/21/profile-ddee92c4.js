import{B as t,b as i,p as e,y as o,bu as s,I as r,J as a,Y as n,H as f,G as c,bv as p,x as u,a as m}from"./calfSystem-89b939c8.js"
import{p as l}from"./playerName-8ec11865.js"
import{c as d}from"./colouredDots-b8776b25.js"
import{i as j}from"./intValue-cd93b930.js"
import{v as b}from"./valueText-bfc7b590.js"
import{d as h}from"./doStatTotal-a01a19ff.js"
import{i as k}from"./interceptSubmit-57a8cf95.js"
let B,y,v
function g(){return B||(B=t(i("h1",e)[0])),B}function x(){return y||(v=g()===l(),y=!0),v}function P(){const i=Number(t(o(s)))
!function(t){return j(b(r(a)))===t}(i)?n(f,i):n(f,"")}function S(){x()&&(!async function(){const t=c("fastDebuff"),i=c("disableDeactivatePrompts")
if(t||i){(await import("./debuff-1f7cbf22.js")).default(t,i)}}(),c("countAllyEnemy")&&p(import("./profileAllyEnemy-a82756d2.js")),c("enableQuickDrink")&&p(import("./fastWear-202dc1d7.js")),c("fixFolderImages")&&p(import("./fixFolders-0c455efc.js")),c("componentWidgets")&&p(import("./components-cad97429.js")),c("quickWearLink")&&p(import("./quickWearLink-6e94ffe1.js")),c("selectAllLink")&&p(import("./selectAllLink-9945e821.js")),P(),c("nekidButton")&&p(import("./nekidBtn-4f5c12ab.js")),c("ajaxifyProfileSections")&&p(import("./ajaxifyProfileSections-98e31d2e.js")))}function L(){const t=x()
return function(t){return t&&c("renderSelfBio")}(t)||function(t){return!t&&c("renderOtherBios")}(t)}function D(){S(),c("showGuildRelationship")&&p(import("./profileInjectGuildRel-ef6d9d17.js")),c("showQuickButtons")&&p(import("./profileInjectQuickButton-efb809ed.js")),c("injectBuffGuide")&&p(import("./updateBuffs-d69b4db1.js")),c("statisticsWrap")&&p(import("./updateStatistics-d5bb0d7c.js")),c("highlightPvpProtection")&&p(import("./highlightPvpProtection-050f53c9.js")),L()&&p(import("./bio-7a6090f7.js")),c("enableBioCompressor")&&p(import("./compressBio-11d049d1.js")),h(),c("showBuffLevel")&&p(import("./buffLevelDisplay-537d969a.js")),m(3,d)}var W=Object.freeze({__proto__:null,default:function(){u()||(D(),x()||k())}})
export{g as a,x as g,W as p}
//# sourceMappingURL=profile-ddee92c4.js.map
