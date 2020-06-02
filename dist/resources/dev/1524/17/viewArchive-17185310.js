import{D as e,a6 as s,b as r,p as t,d as a,bb as c,A as o,X as i}from"./calfSystem-1c103624.js"
import"./isChecked-acff895a.js"
import{s as l}from"./simpleCheckbox-195e8c73.js"
import"./hideElement-e9cdcfef.js"
import{i as n}from"./insertHtmlAfterEnd-cca1ed99.js"
import"./toggleForce-43e39379.js"
import{p as f}from"./parseDateAsTimestamp-dbc8fb82.js"
import{c as m}from"./collapse-6987cf97.js"
let d,p
function h(e){if(p&&c("PvP Ladder",e.children[1].children[0])){const r=f(o(e.children[1].children[2]).replace("Posted: ",""))
r>d&&(i(s,r),d=r)}}function j(e){return e>1}export default function(){d=e(s),p=e("trackLadderReset")
const c=r(a,t)
c.length>2&&(!function(e,s){n(s,l(e))}("collapseNewsArchive",c[0].rows[2]),m({prefName:"collapseNewsArchive",theTable:c[2],headInd:7,articleTest:j,extraFn:h}))}
//# sourceMappingURL=viewArchive-17185310.js.map
