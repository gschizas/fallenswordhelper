import{D as e,a1 as s,b as a,p as r,d as t,b4 as o,A as c,W as i}from"./calfSystem-be09bdff.js"
import"./isChecked-8d8d5233.js"
import{s as d}from"./simpleCheckbox-b4136c55.js"
import"./hideElement-dd1f789a.js"
import{i as l}from"./insertHtmlAfterEnd-a624273f.js"
import"./toggleForce-2711e067.js"
import{p as n}from"./parseDateAsTimestamp-f5ce65ae.js"
import{c as m}from"./collapse-e9ae35c7.js"
let f,p
function h(e){if(p&&o("PvP Ladder",e.children[1].children[0])){const a=n(c(e.children[1].children[2]).replace("Posted: ",""))
a>f&&(i(s,a),f=a)}}function j(e){return e>1}export default function(){f=e(s),p=e("trackLadderReset")
const o=a(t,r)
o.length>2&&(!function(e,s){l(s,d(e))}("collapseNewsArchive",o[0].rows[2]),m({prefName:"collapseNewsArchive",theTable:o[2],headInd:7,articleTest:j,extraFn:h}))}
//# sourceMappingURL=viewArchive-7c574f94.js.map
