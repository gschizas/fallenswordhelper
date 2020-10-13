import{H as e,a6 as a,b as s,p as t,d as r,b9 as o,B as c,Z as i}from"./calfSystem-b136673a.js"
import"./isChecked-12c32ad5.js"
import{s as n}from"./simpleCheckbox-b7b2f875.js"
import"./hideElement-c14a94c9.js"
import{i as d}from"./insertHtmlAfterEnd-a4a64d97.js"
import{p as m}from"./parseDateAsTimestamp-dc8c4305.js"
import"./toggleForce-10d35470.js"
import{c as l}from"./collapse-a92fa6a8.js"
let p,f
function h(e){if(f&&o("PvP Ladder",e.children[1].children[0])){const s=m(c(e.children[1].children[2]).replace("Posted: ",""))
s>p&&(i(a,s),p=s)}}function j(e){return e>1}function b(){p=e(a),f=e("trackLadderReset")
const o="collapseNewsArchive",c=s(r,t)
c.length>2&&(!function(e,a){d(a,n(e))}(o,c[0].rows[2]),l({prefName:o,theTable:c[2],headInd:7,articleTest:j,extraFn:h}))}export default b
//# sourceMappingURL=viewArchive-18e6d944.js.map
