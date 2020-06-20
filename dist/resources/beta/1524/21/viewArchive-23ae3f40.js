import{G as e,a3 as s,b as a,p as r,d as t,b5 as o,B as i,Y as c}from"./calfSystem-89b939c8.js"
import"./isChecked-3ea89984.js"
import{s as d}from"./simpleCheckbox-9add2311.js"
import"./hideElement-d2b16586.js"
import{i as l}from"./insertHtmlAfterEnd-c6efbdf8.js"
import{p as n}from"./parseDateAsTimestamp-ad083d9e.js"
import"./toggleForce-fba73ab8.js"
import{c as m}from"./collapse-15565e78.js"
let p,f
function h(e){if(f&&o("PvP Ladder",e.children[1].children[0])){const a=n(i(e.children[1].children[2]).replace("Posted: ",""))
a>p&&(c(s,a),p=a)}}function b(e){return e>1}export default function(){p=e(s),f=e("trackLadderReset")
const o=a(t,r)
o.length>2&&(!function(e,s){l(s,d(e))}("collapseNewsArchive",o[0].rows[2]),m({prefName:"collapseNewsArchive",theTable:o[2],headInd:7,articleTest:b,extraFn:h}))}
//# sourceMappingURL=viewArchive-23ae3f40.js.map
