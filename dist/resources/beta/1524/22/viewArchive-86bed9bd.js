import{G as e,a3 as s,b as a,p as r,d as t,b5 as o,B as i,Y as c}from"./calfSystem-1b876afa.js"
import"./isChecked-a8ba6bb9.js"
import{s as d}from"./simpleCheckbox-3997639f.js"
import"./hideElement-e3866bf9.js"
import{i as l}from"./insertHtmlAfterEnd-dd9b917d.js"
import{p as n}from"./parseDateAsTimestamp-50780e09.js"
import"./toggleForce-0be28b41.js"
import{c as m}from"./collapse-dcd9d480.js"
let p,f
function b(e){if(f&&o("PvP Ladder",e.children[1].children[0])){const a=n(i(e.children[1].children[2]).replace("Posted: ",""))
a>p&&(c(s,a),p=a)}}function h(e){return e>1}export default function(){p=e(s),f=e("trackLadderReset")
const o=a(t,r)
o.length>2&&(!function(e,s){l(s,d(e))}("collapseNewsArchive",o[0].rows[2]),m({prefName:"collapseNewsArchive",theTable:o[2],headInd:7,articleTest:h,extraFn:b}))}
//# sourceMappingURL=viewArchive-86bed9bd.js.map
