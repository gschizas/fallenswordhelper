import{B as t,b as e,p as i,y as o,bp as s,I as a,J as r,Y as f,H as n,G as c,bq as p,x as u,a as m}from"./calfSystem-2741d97b.js"
import{p as l}from"./playerName-5fbf0efe.js"
import{c as j}from"./colouredDots-b06d7daf.js"
import{i as b}from"./intValue-1a593541.js"
import{v as d}from"./valueText-9aacf9d4.js"
import{d as h}from"./doStatTotal-70ec844a.js"
import{i as k}from"./interceptSubmit-60aabec1.js"
let B,y,v
function g(){return B||(B=t(e("h1",i)[0])),B}function x(){return y||(v=g()===l(),y=!0),v}function P(){const e=Number(t(o(s)))
!function(t){return b(d(a(r)))===t}(e)?f(n,e):f(n,"")}function S(){x()&&(!async function(){const t=c("fastDebuff"),e=c("disableDeactivatePrompts")
if(t||e){(await import("./debuff-ea79fabf.js")).default(t,e)}}(),c("countAllyEnemy")&&p(import("./profileAllyEnemy-284e914f.js")),c("enableQuickDrink")&&p(import("./fastWear-2bafa58f.js")),c("fixFolderImages")&&p(import("./fixFolders-bcc31e51.js")),c("componentWidgets")&&p(import("./components-0f417fbd.js")),c("quickWearLink")&&p(import("./quickWearLink-10236f4e.js")),c("selectAllLink")&&p(import("./selectAllLink-21a82298.js")),P(),c("nekidButton")&&p(import("./nekidBtn-693ebf0b.js")),c("ajaxifyProfileSections")&&p(import("./ajaxifyProfileSections-3d8f4e18.js")))}function L(){const t=x()
return function(t){return t&&c("renderSelfBio")}(t)||function(t){return!t&&c("renderOtherBios")}(t)}function D(){S(),c("showGuildRelationship")&&p(import("./profileInjectGuildRel-7615a7bc.js")),c("showQuickButtons")&&p(import("./profileInjectQuickButton-ed92fa61.js")),c("injectBuffGuide")&&p(import("./updateBuffs-f6c812fb.js")),c("statisticsWrap")&&p(import("./updateStatistics-f0b3f49e.js")),c("highlightPvpProtection")&&p(import("./highlightPvpProtection-5a72b6c3.js")),L()&&p(import("./bio-a6c9f857.js")),c("enableBioCompressor")&&p(import("./compressBio-a378f1ca.js")),h(),c("showBuffLevel")&&p(import("./buffLevelDisplay-c0e36086.js")),m(3,j)}var W=Object.freeze({__proto__:null,default:function(){u()||(D(),x()||k())}})
export{g as a,x as g,W as p}
//# sourceMappingURL=profile-74acb2a5.js.map
