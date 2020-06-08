import{G as e,a3 as s,b as a,p as r,d as t,b3 as o,B as i,Y as c}from"./calfSystem-03970067.js"
import"./isChecked-02800593.js"
import{s as l}from"./simpleCheckbox-6af8c076.js"
import"./hideElement-ee7e2bbb.js"
import{i as n}from"./insertHtmlAfterEnd-d9794923.js"
import"./toggleForce-1be6b2e6.js"
import{p as m}from"./parseDateAsTimestamp-375eca5d.js"
import{c as p}from"./collapse-a47f6a25.js"
let d,f
function h(e){if(f&&o("PvP Ladder",e.children[1].children[0])){const a=m(i(e.children[1].children[2]).replace("Posted: ",""))
a>d&&(c(s,a),d=a)}}function b(e){return e>1}export default function(){d=e(s),f=e("trackLadderReset")
const o=a(t,r)
o.length>2&&(!function(e,s){n(s,l(e))}("collapseNewsArchive",o[0].rows[2]),p({prefName:"collapseNewsArchive",theTable:o[2],headInd:7,articleTest:b,extraFn:h}))}
//# sourceMappingURL=viewArchive-47022fc5.js.map
