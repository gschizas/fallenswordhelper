import{B as t,b as e,p as i,y as o,bp as s,J as r,K as a,Y as n,I as f,H as c,bq as p,x as u,a as m}from"./calfSystem-71b9378d.js"
import{p as l}from"./playerName-17bbea9d.js"
import{c as d}from"./colouredDots-10fbd2da.js"
import{i as j}from"./intValue-65d3c36c.js"
import{v as b}from"./valueText-4f638fd7.js"
import{d as h}from"./doStatTotal-f1c3cd46.js"
import{i as k}from"./interceptSubmit-c92da7b4.js"
let B,y,v
function g(){return B||(B=t(e("h1",i)[0])),B}function x(){return y||(v=g()===l(),y=!0),v}function P(){const e=Number(t(o(s)))
!function(t){return j(b(r(a)))===t}(e)?n(f,e):n(f,"")}function S(){x()&&(!async function(){const t=c("fastDebuff"),e=c("disableDeactivatePrompts");(t||e)&&(await import("./debuff-a60e76bb.js")).default(t,e)}(),c("countAllyEnemy")&&p(import("./profileAllyEnemy-25e2ae8b.js")),c("enableQuickDrink")&&p(import("./fastWear-6f6acb59.js")),c("fixFolderImages")&&p(import("./fixFolders-4fdd6c58.js")),c("componentWidgets")&&p(import("./components-9ec49f7e.js")),c("quickWearLink")&&p(import("./quickWearLink-c4967a5e.js")),c("selectAllLink")&&p(import("./selectAllLink-e1a1d00c.js")),P(),c("nekidButton")&&p(import("./nekidBtn-64789819.js")),c("ajaxifyProfileSections")&&p(import("./ajaxifyProfileSections-86ce5e86.js")))}function L(){const t=x()
return function(t){return t&&c("renderSelfBio")}(t)||function(t){return!t&&c("renderOtherBios")}(t)}function D(){S(),c("showGuildRelationship")&&p(import("./profileInjectGuildRel-d2b16d38.js")),c("showQuickButtons")&&p(import("./profileInjectQuickButton-895f991e.js")),c("injectBuffGuide")&&p(import("./updateBuffs-485b29f6.js")),c("statisticsWrap")&&p(import("./updateStatistics-9eedd3fb.js")),c("highlightPvpProtection")&&p(import("./highlightPvpProtection-f3d192b4.js")),L()&&p(import("./bio-725ce82e.js")),c("enableBioCompressor")&&p(import("./compressBio-3beb6c3e.js")),h(),c("showBuffLevel")&&p(import("./buffLevelDisplay-4cd8b306.js")),m(3,d)}var W=Object.freeze({__proto__:null,default:function(){u()||(D(),x()||k())}})
export{g as a,x as g,W as p}
//# sourceMappingURL=profile-678af0d6.js.map
