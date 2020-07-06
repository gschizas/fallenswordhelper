import{B as t,b as e,p as i,y as o,bp as s,I as r,J as a,Y as n,H as f,G as c,bq as p,x as u,a as m}from"./calfSystem-019de1cf.js"
import{p as l}from"./playerName-569fc693.js"
import{c as d}from"./colouredDots-f42e5f7f.js"
import{i as j}from"./intValue-0e84cdad.js"
import{v as b}from"./valueText-4e1cfc2e.js"
import{d as h}from"./doStatTotal-928129d1.js"
import{i as k}from"./interceptSubmit-7b40d68d.js"
let B,y,v
function g(){return B||(B=t(e("h1",i)[0])),B}function x(){return y||(v=g()===l(),y=!0),v}function P(){const e=Number(t(o(s)))
!function(t){return j(b(r(a)))===t}(e)?n(f,e):n(f,"")}function S(){x()&&(!async function(){const t=c("fastDebuff"),e=c("disableDeactivatePrompts")
if(t||e){(await import("./debuff-d7aa676c.js")).default(t,e)}}(),c("countAllyEnemy")&&p(import("./profileAllyEnemy-8470eca6.js")),c("enableQuickDrink")&&p(import("./fastWear-c2223ec2.js")),c("fixFolderImages")&&p(import("./fixFolders-cdfe82b2.js")),c("componentWidgets")&&p(import("./components-03311743.js")),c("quickWearLink")&&p(import("./quickWearLink-dcaeafb9.js")),c("selectAllLink")&&p(import("./selectAllLink-60e9a21e.js")),P(),c("nekidButton")&&p(import("./nekidBtn-f30c1a74.js")),c("ajaxifyProfileSections")&&p(import("./ajaxifyProfileSections-09b9fc47.js")))}function L(){const t=x()
return function(t){return t&&c("renderSelfBio")}(t)||function(t){return!t&&c("renderOtherBios")}(t)}function D(){S(),c("showGuildRelationship")&&p(import("./profileInjectGuildRel-50b84c86.js")),c("showQuickButtons")&&p(import("./profileInjectQuickButton-fe481c9a.js")),c("injectBuffGuide")&&p(import("./updateBuffs-568cd0da.js")),c("statisticsWrap")&&p(import("./updateStatistics-e6917781.js")),c("highlightPvpProtection")&&p(import("./highlightPvpProtection-1a190389.js")),L()&&p(import("./bio-4001a4be.js")),c("enableBioCompressor")&&p(import("./compressBio-7ae0e2f1.js")),h(),c("showBuffLevel")&&p(import("./buffLevelDisplay-7e24057e.js")),m(3,d)}var W=Object.freeze({__proto__:null,default:function(){u()||(D(),x()||k())}})
export{g as a,x as g,W as p}
//# sourceMappingURL=profile-57565e2d.js.map
