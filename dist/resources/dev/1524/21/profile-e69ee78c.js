import{B as t,b as i,p as o,y as e,bw as s,I as r,J as a,Z as n,H as f,G as c,bx as p,x as u,a as m}from"./calfSystem-9c7241dc.js"
import{p as l}from"./playerName-ddecc25a.js"
import{c as d}from"./colouredDots-d1da220f.js"
import{i as j}from"./intValue-4cb61c79.js"
import{v as b}from"./valueText-2c80175b.js"
import{d as h}from"./doStatTotal-db2c1a58.js"
import{i as k}from"./interceptSubmit-9fc997ac.js"
let B,y,v
function x(){return B||(B=t(i("h1",o)[0])),B}function g(){return y||(v=x()===l(),y=!0),v}function P(){const i=Number(t(e(s)))
!function(t){return j(b(r(a)))===t}(i)?n(f,i):n(f,"")}function S(){g()&&(!async function(){const t=c("fastDebuff"),i=c("disableDeactivatePrompts")
if(t||i){(await import("./debuff-d8ede992.js")).default(t,i)}}(),c("countAllyEnemy")&&p(import("./profileAllyEnemy-62b54365.js")),c("enableQuickDrink")&&p(import("./fastWear-4a913716.js")),c("fixFolderImages")&&p(import("./fixFolders-92f69bd0.js")),c("componentWidgets")&&p(import("./components-5249198a.js")),c("quickWearLink")&&p(import("./quickWearLink-76457b29.js")),c("selectAllLink")&&p(import("./selectAllLink-ff88b3ff.js")),P(),c("nekidButton")&&p(import("./nekidBtn-5ad0ff27.js")),c("ajaxifyProfileSections")&&p(import("./ajaxifyProfileSections-ad2bc56c.js")))}function L(){const t=g()
return function(t){return t&&c("renderSelfBio")}(t)||function(t){return!t&&c("renderOtherBios")}(t)}function w(){S(),c("showGuildRelationship")&&p(import("./profileInjectGuildRel-c6113510.js")),c("showQuickButtons")&&p(import("./profileInjectQuickButton-c6185d4c.js")),c("injectBuffGuide")&&p(import("./updateBuffs-8fda032f.js")),c("statisticsWrap")&&p(import("./updateStatistics-a1eee026.js")),c("highlightPvpProtection")&&p(import("./highlightPvpProtection-92949116.js")),L()&&p(import("./bio-3d4b8431.js")),c("enableBioCompressor")&&p(import("./compressBio-baaf4d29.js")),h(),c("showBuffLevel")&&p(import("./buffLevelDisplay-78dd1cec.js")),m(3,d)}var D=Object.freeze({__proto__:null,default:function(){u()||(w(),g()||k())}})
export{x as a,g,D as p}
//# sourceMappingURL=profile-e69ee78c.js.map
