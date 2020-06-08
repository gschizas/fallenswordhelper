import{B as t,b as i,p as o,y as e,bu as s,I as r,J as a,Y as n,H as f,G as c,bv as p,x as u,a as m}from"./calfSystem-05554bae.js"
import{p as l}from"./playerName-0e65dbb6.js"
import{c as b}from"./colouredDots-bcbb39d3.js"
import{i as d}from"./intValue-f723fc88.js"
import{v as j}from"./valueText-d9bb024d.js"
import{d as k}from"./doStatTotal-b24fc6c4.js"
import{i as h}from"./interceptSubmit-399cf9b1.js"
let B,y,g
function v(){return B||(B=t(i("h1",o)[0])),B}function x(){return y||(g=v()===l(),y=!0),g}function P(){const i=Number(t(e(s)))
!function(t){return d(j(r(a)))===t}(i)?n(f,i):n(f,"")}function S(){x()&&(!async function(){const t=c("fastDebuff"),i=c("disableDeactivatePrompts")
if(t||i){(await import("./debuff-0e474209.js")).default(t,i)}}(),c("countAllyEnemy")&&p(import("./profileAllyEnemy-32bd43cf.js")),c("enableQuickDrink")&&p(import("./fastWear-58c949cd.js")),c("fixFolderImages")&&p(import("./fixFolders-64895264.js")),c("componentWidgets")&&p(import("./components-06467f08.js")),c("quickWearLink")&&p(import("./quickWearLink-13546c6b.js")),c("selectAllLink")&&p(import("./selectAllLink-ee154eb2.js")),P(),c("nekidButton")&&p(import("./nekidBtn-2d44dd5f.js")),c("ajaxifyProfileSections")&&p(import("./ajaxifyProfileSections-6f5b19ff.js")))}function W(){const t=x()
return function(t){return t&&c("renderSelfBio")}(t)||function(t){return!t&&c("renderOtherBios")}(t)}function A(){S(),c("showGuildRelationship")&&p(import("./profileInjectGuildRel-ab467b30.js")),c("showQuickButtons")&&p(import("./profileInjectQuickButton-7ffbf3bf.js")),c("injectBuffGuide")&&p(import("./updateBuffs-a839d7da.js")),c("statisticsWrap")&&p(import("./updateStatistics-20cd1e5e.js")),c("highlightPvpProtection")&&p(import("./highlightPvpProtection-9ccafb8e.js")),W()&&p(import("./bio-2655a831.js")),c("enableBioCompressor")&&p(import("./compressBio-5a732bb6.js")),k(),m(3,b)}var D=Object.freeze({__proto__:null,default:function(){u()||(A(),x()||h())}})
export{v as a,x as g,D as p}
//# sourceMappingURL=profile-a3a9990e.js.map
