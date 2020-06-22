import{G as e,a3 as s,b as a,p as r,d as t,b3 as c,B as o,Y as i}from"./calfSystem-d04e4be4.js"
import"./isChecked-522ec787.js"
import{s as l}from"./simpleCheckbox-b64120a0.js"
import"./hideElement-54f4258c.js"
import{i as n}from"./insertHtmlAfterEnd-8f464ed1.js"
import{p as m}from"./parseDateAsTimestamp-8b8402c4.js"
import"./toggleForce-6cbae4af.js"
import{c as d}from"./collapse-0c68a9fd.js"
let p,f
function h(e){if(f&&c("PvP Ladder",e.children[1].children[0])){const a=m(o(e.children[1].children[2]).replace("Posted: ",""))
a>p&&(i(s,a),p=a)}}function b(e){return e>1}export default function(){p=e(s),f=e("trackLadderReset")
const c=a(t,r)
c.length>2&&(!function(e,s){n(s,l(e))}("collapseNewsArchive",c[0].rows[2]),d({prefName:"collapseNewsArchive",theTable:c[2],headInd:7,articleTest:b,extraFn:h}))}
//# sourceMappingURL=viewArchive-078b13a5.js.map
