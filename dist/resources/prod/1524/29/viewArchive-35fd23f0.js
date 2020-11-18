import{H as e,a3 as s,b as a,p as t,d as r,b2 as o,B as c,Y as i}from"./calfSystem-57628ebe.js"
import"./isChecked-92297855.js"
import{s as n}from"./simpleCheckbox-e8742cc5.js"
import"./hideElement-a8c1e8d6.js"
import{i as m}from"./insertHtmlAfterEnd-5ac4fa8d.js"
import{p as d}from"./parseDateAsTimestamp-a0fe37ba.js"
import"./toggleForce-68981a01.js"
import{c as l}from"./collapse-7d94a10f.js"
let p,f
function h(e){if(f&&o("PvP Ladder",e.children[1].children[0])){const a=d(c(e.children[1].children[2]).replace("Posted: ",""))
a>p&&(i(s,a),p=a)}}function j(e){return e>1}function b(){p=e(s),f=e("trackLadderReset")
const o="collapseNewsArchive",c=a(r,t)
c.length>2&&(!function(e,s){m(s,n(e))}(o,c[0].rows[2]),l({prefName:o,theTable:c[2],headInd:7,articleTest:j,extraFn:h}))}export default b
//# sourceMappingURL=viewArchive-35fd23f0.js.map
