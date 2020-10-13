import{H as e,a3 as s,b as a,p as t,d as r,b2 as o,B as c,Y as i}from"./calfSystem-a5da5210.js"
import"./isChecked-12c32ad5.js"
import{s as n}from"./simpleCheckbox-b35743b7.js"
import"./hideElement-c14a94c9.js"
import{i as d}from"./insertHtmlAfterEnd-60f61894.js"
import{p as m}from"./parseDateAsTimestamp-5ef6ade0.js"
import"./toggleForce-10d35470.js"
import{c as l}from"./collapse-b39ecf31.js"
let p,f
function h(e){if(f&&o("PvP Ladder",e.children[1].children[0])){const a=m(c(e.children[1].children[2]).replace("Posted: ",""))
a>p&&(i(s,a),p=a)}}function j(e){return e>1}function b(){p=e(s),f=e("trackLadderReset")
const o="collapseNewsArchive",c=a(r,t)
c.length>2&&(!function(e,s){d(s,n(e))}(o,c[0].rows[2]),l({prefName:o,theTable:c[2],headInd:7,articleTest:j,extraFn:h}))}export default b
//# sourceMappingURL=viewArchive-9be863ff.js.map
