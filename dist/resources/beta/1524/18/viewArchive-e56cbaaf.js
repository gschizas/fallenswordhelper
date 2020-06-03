import{D as e,a1 as s,b as a,p as r,d as t,b6 as o,A as c,W as i}from"./calfSystem-4197cc22.js"
import"./isChecked-3260d105.js"
import{s as d}from"./simpleCheckbox-8187e065.js"
import"./hideElement-f08b19df.js"
import{i as l}from"./insertHtmlAfterEnd-33a3ae32.js"
import"./toggleForce-de86eac9.js"
import{p as n}from"./parseDateAsTimestamp-11233d2d.js"
import{c as m}from"./collapse-f898ea3e.js"
let p,f
function h(e){if(f&&o("PvP Ladder",e.children[1].children[0])){const a=n(c(e.children[1].children[2]).replace("Posted: ",""))
a>p&&(i(s,a),p=a)}}function j(e){return e>1}export default function(){p=e(s),f=e("trackLadderReset")
const o=a(t,r)
o.length>2&&(!function(e,s){l(s,d(e))}("collapseNewsArchive",o[0].rows[2]),m({prefName:"collapseNewsArchive",theTable:o[2],headInd:7,articleTest:j,extraFn:h}))}
//# sourceMappingURL=viewArchive-e56cbaaf.js.map
