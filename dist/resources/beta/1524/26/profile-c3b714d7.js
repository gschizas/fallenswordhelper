import{B as t,b as i,p as e,y as o,bs as s,J as a,K as r,Y as n,I as f,H as c,bt as p,x as u,a as m}from"./calfSystem-cf4d22a7.js"
import{p as l}from"./playerName-b9ef36e6.js"
import{c as d}from"./colouredDots-aab2f633.js"
import{i as j}from"./intValue-e4cdd281.js"
import{v as b}from"./valueText-5ba89d31.js"
import{d as h}from"./doStatTotal-d19b95c3.js"
import{i as k}from"./interceptSubmit-228afb85.js"
let B,y,v
function g(){return B||(B=t(i("h1",e)[0])),B}function x(){return y||(v=g()===l(),y=!0),v}function P(){const i=Number(t(o(s)))
!function(t){return j(b(a(r)))===t}(i)?n(f,i):n(f,"")}function S(){x()&&(!async function(){const t=c("fastDebuff"),i=c("disableDeactivatePrompts");(t||i)&&(await import("./debuff-59c7347b.js")).default(t,i)}(),c("countAllyEnemy")&&p(import("./profileAllyEnemy-8e305a77.js")),c("enableQuickDrink")&&p(import("./fastWear-3f3ad85a.js")),c("fixFolderImages")&&p(import("./fixFolders-164e7da2.js")),c("componentWidgets")&&p(import("./components-526812f4.js")),c("quickWearLink")&&p(import("./quickWearLink-cd9c92fc.js")),c("selectAllLink")&&p(import("./selectAllLink-8e89502d.js")),P(),c("nekidButton")&&p(import("./nekidBtn-76982f0a.js")),c("ajaxifyProfileSections")&&p(import("./ajaxifyProfileSections-8c4c7e61.js")))}function L(){const t=x()
return function(t){return t&&c("renderSelfBio")}(t)||function(t){return!t&&c("renderOtherBios")}(t)}function D(){S(),c("showGuildRelationship")&&p(import("./profileInjectGuildRel-f57424fa.js")),c("showQuickButtons")&&p(import("./profileInjectQuickButton-d73d2174.js")),c("injectBuffGuide")&&p(import("./updateBuffs-9296ed62.js")),c("statisticsWrap")&&p(import("./updateStatistics-1df1f9da.js")),c("highlightPvpProtection")&&p(import("./highlightPvpProtection-c968d44a.js")),L()&&p(import("./bio-1fe18f3d.js")),c("enableBioCompressor")&&p(import("./compressBio-4513c610.js")),h(),c("showBuffLevel")&&p(import("./buffLevelDisplay-aa26ff21.js")),m(3,d)}var W=Object.freeze({__proto__:null,default:function(){u()||(D(),x()||k())}})
export{g as a,x as g,W as p}
//# sourceMappingURL=profile-c3b714d7.js.map
