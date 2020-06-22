import{B as t,b as i,p as e,y as o,bu as s,I as r,J as a,Y as n,H as f,G as c,bv as p,x as u,a as m}from"./calfSystem-1b876afa.js"
import{p as l}from"./playerName-14ec00f6.js"
import{c as d}from"./colouredDots-dcd3ecc5.js"
import{i as j}from"./intValue-4dd66c70.js"
import{v as b}from"./valueText-266fd211.js"
import{d as h}from"./doStatTotal-d1242778.js"
import{i as k}from"./interceptSubmit-8946388b.js"
let B,y,v
function g(){return B||(B=t(i("h1",e)[0])),B}function x(){return y||(v=g()===l(),y=!0),v}function P(){const i=Number(t(o(s)))
!function(t){return j(b(r(a)))===t}(i)?n(f,i):n(f,"")}function S(){x()&&(!async function(){const t=c("fastDebuff"),i=c("disableDeactivatePrompts")
if(t||i){(await import("./debuff-7eb8f5f6.js")).default(t,i)}}(),c("countAllyEnemy")&&p(import("./profileAllyEnemy-aa6f3f45.js")),c("enableQuickDrink")&&p(import("./fastWear-12df8487.js")),c("fixFolderImages")&&p(import("./fixFolders-450519df.js")),c("componentWidgets")&&p(import("./components-d97ef3d2.js")),c("quickWearLink")&&p(import("./quickWearLink-e3b85012.js")),c("selectAllLink")&&p(import("./selectAllLink-01236d49.js")),P(),c("nekidButton")&&p(import("./nekidBtn-b9bd2682.js")),c("ajaxifyProfileSections")&&p(import("./ajaxifyProfileSections-a94838e1.js")))}function L(){const t=x()
return function(t){return t&&c("renderSelfBio")}(t)||function(t){return!t&&c("renderOtherBios")}(t)}function D(){S(),c("showGuildRelationship")&&p(import("./profileInjectGuildRel-ab7bc248.js")),c("showQuickButtons")&&p(import("./profileInjectQuickButton-36d5433d.js")),c("injectBuffGuide")&&p(import("./updateBuffs-dbff5e6c.js")),c("statisticsWrap")&&p(import("./updateStatistics-11e5a31f.js")),c("highlightPvpProtection")&&p(import("./highlightPvpProtection-73585231.js")),L()&&p(import("./bio-b1e887f7.js")),c("enableBioCompressor")&&p(import("./compressBio-859c42d9.js")),h(),c("showBuffLevel")&&p(import("./buffLevelDisplay-984f6616.js")),m(3,d)}var W=Object.freeze({__proto__:null,default:function(){u()||(D(),x()||k())}})
export{g as a,x as g,W as p}
//# sourceMappingURL=profile-314ff588.js.map
