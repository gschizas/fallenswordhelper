import{B as t,b as i,p as e,y as o,bu as s,I as r,J as a,Y as n,H as f,G as c,bv as p,x as u,a as m}from"./calfSystem-34fcd691.js"
import{p as l}from"./playerName-d0ea3aa5.js"
import{c as j}from"./colouredDots-84a9af5b.js"
import{i as d}from"./intValue-0e84cdad.js"
import{v as b}from"./valueText-eb3ddde5.js"
import{d as h}from"./doStatTotal-73f2a0ea.js"
import{i as k}from"./interceptSubmit-492af249.js"
let B,y,v
function g(){return B||(B=t(i("h1",e)[0])),B}function x(){return y||(v=g()===l(),y=!0),v}function P(){const i=Number(t(o(s)))
!function(t){return d(b(r(a)))===t}(i)?n(f,i):n(f,"")}function S(){x()&&(!async function(){const t=c("fastDebuff"),i=c("disableDeactivatePrompts")
if(t||i){(await import("./debuff-fdb73c94.js")).default(t,i)}}(),c("countAllyEnemy")&&p(import("./profileAllyEnemy-72ac127f.js")),c("enableQuickDrink")&&p(import("./fastWear-14004db6.js")),c("fixFolderImages")&&p(import("./fixFolders-7160bbe4.js")),c("componentWidgets")&&p(import("./components-17411343.js")),c("quickWearLink")&&p(import("./quickWearLink-5b6cca1a.js")),c("selectAllLink")&&p(import("./selectAllLink-c205882c.js")),P(),c("nekidButton")&&p(import("./nekidBtn-4b503b20.js")),c("ajaxifyProfileSections")&&p(import("./ajaxifyProfileSections-51cc0e23.js")))}function L(){const t=x()
return function(t){return t&&c("renderSelfBio")}(t)||function(t){return!t&&c("renderOtherBios")}(t)}function D(){S(),c("showGuildRelationship")&&p(import("./profileInjectGuildRel-19614148.js")),c("showQuickButtons")&&p(import("./profileInjectQuickButton-f780c998.js")),c("injectBuffGuide")&&p(import("./updateBuffs-6537b953.js")),c("statisticsWrap")&&p(import("./updateStatistics-692f7f58.js")),c("highlightPvpProtection")&&p(import("./highlightPvpProtection-81054e86.js")),L()&&p(import("./bio-51146741.js")),c("enableBioCompressor")&&p(import("./compressBio-81bfa735.js")),h(),c("showBuffLevel")&&p(import("./buffLevelDisplay-75b6b47b.js")),m(3,j)}var W=Object.freeze({__proto__:null,default:function(){u()||(D(),x()||k())}})
export{g as a,x as g,W as p}
//# sourceMappingURL=profile-1f1ffc1f.js.map
