import{B as t,b as e,p as i,y as o,bp as s,I as r,J as a,Y as n,H as c,G as f,bq as p,x as u,a as m}from"./calfSystem-03970067.js"
import{p as l}from"./playerName-e0979c8e.js"
import{c as d}from"./colouredDots-d1b69d53.js"
import{i as j}from"./intValue-0d844fc4.js"
import{v as b}from"./valueText-49d1445b.js"
import{d as k}from"./doStatTotal-85eb4928.js"
import{i as h}from"./interceptSubmit-e3519b7d.js"
let B,y,g
function x(){return B||(B=t(e("h1",i)[0])),B}function P(){return y||(g=x()===l(),y=!0),g}function S(){const e=Number(t(o(s)))
!function(t){return j(b(r(a)))===t}(e)?n(c,e):n(c,"")}function v(){P()&&(!async function(){const t=f("fastDebuff"),e=f("disableDeactivatePrompts")
if(t||e){(await import("./debuff-fa30c9cb.js")).default(t,e)}}(),f("countAllyEnemy")&&p(import("./profileAllyEnemy-df2e2188.js")),f("enableQuickDrink")&&p(import("./fastWear-eac1f63e.js")),f("fixFolderImages")&&p(import("./fixFolders-6dc9c58c.js")),f("componentWidgets")&&p(import("./components-abb8bed5.js")),f("quickWearLink")&&p(import("./quickWearLink-a33e7739.js")),f("selectAllLink")&&p(import("./selectAllLink-0346376f.js")),S(),f("nekidButton")&&p(import("./nekidBtn-592aa322.js")),f("ajaxifyProfileSections")&&p(import("./ajaxifyProfileSections-c9d8e99b.js")))}function W(){const t=P()
return function(t){return t&&f("renderSelfBio")}(t)||function(t){return!t&&f("renderOtherBios")}(t)}function A(){v(),f("showGuildRelationship")&&p(import("./profileInjectGuildRel-b1e71d92.js")),f("showQuickButtons")&&p(import("./profileInjectQuickButton-19ad6a73.js")),f("injectBuffGuide")&&p(import("./updateBuffs-579824eb.js")),f("statisticsWrap")&&p(import("./updateStatistics-f4044a21.js")),f("highlightPvpProtection")&&p(import("./highlightPvpProtection-16522744.js")),W()&&p(import("./bio-dc92c6cf.js")),f("enableBioCompressor")&&p(import("./compressBio-e6aa1e4e.js")),k(),m(3,d)}var D=Object.freeze({__proto__:null,default:function(){u()||(A(),P()||h())}})
export{x as a,P as g,D as p}
//# sourceMappingURL=profile-31bb0967.js.map
