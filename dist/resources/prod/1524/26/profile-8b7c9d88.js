import{B as t,b as e,p as i,y as o,bn as s,J as a,K as r,Y as n,I as f,H as c,bo as p,x as u,a as m}from"./calfSystem-a5fc99d4.js"
import{p as l}from"./playerName-f44ad46e.js"
import{c as d}from"./colouredDots-b5256428.js"
import{i as j}from"./intValue-e4cdd281.js"
import{v as b}from"./valueText-4ea8a5e7.js"
import{d as h}from"./doStatTotal-a4838f62.js"
import{i as k}from"./interceptSubmit-1ba9df73.js"
let B,y,v
function g(){return B||(B=t(e("h1",i)[0])),B}function x(){return y||(v=g()===l(),y=!0),v}function P(){const e=Number(t(o(s)))
!function(t){return j(b(a(r)))===t}(e)?n(f,e):n(f,"")}function S(){x()&&(!async function(){const t=c("fastDebuff"),e=c("disableDeactivatePrompts");(t||e)&&(await import("./debuff-2da422b1.js")).default(t,e)}(),c("countAllyEnemy")&&p(import("./profileAllyEnemy-721e9244.js")),c("enableQuickDrink")&&p(import("./fastWear-988dae0c.js")),c("fixFolderImages")&&p(import("./fixFolders-f0ce8f2d.js")),c("componentWidgets")&&p(import("./components-441007c8.js")),c("quickWearLink")&&p(import("./quickWearLink-db36e2e3.js")),c("selectAllLink")&&p(import("./selectAllLink-82a76073.js")),P(),c("nekidButton")&&p(import("./nekidBtn-4deead13.js")),c("ajaxifyProfileSections")&&p(import("./ajaxifyProfileSections-9f11f376.js")))}function L(){const t=x()
return function(t){return t&&c("renderSelfBio")}(t)||function(t){return!t&&c("renderOtherBios")}(t)}function D(){S(),c("showGuildRelationship")&&p(import("./profileInjectGuildRel-fa2f54ff.js")),c("showQuickButtons")&&p(import("./profileInjectQuickButton-63fd2f0c.js")),c("injectBuffGuide")&&p(import("./updateBuffs-a7bb26ee.js")),c("statisticsWrap")&&p(import("./updateStatistics-06db6d79.js")),c("highlightPvpProtection")&&p(import("./highlightPvpProtection-c34a4f32.js")),L()&&p(import("./bio-36278951.js")),c("enableBioCompressor")&&p(import("./compressBio-fdfa40ab.js")),h(),c("showBuffLevel")&&p(import("./buffLevelDisplay-c6133a69.js")),m(3,d)}var W=Object.freeze({__proto__:null,default:function(){u()||(D(),x()||k())}})
export{g as a,x as g,W as p}
//# sourceMappingURL=profile-8b7c9d88.js.map
