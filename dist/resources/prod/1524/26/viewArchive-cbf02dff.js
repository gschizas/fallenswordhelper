import{H as e,a3 as a,b as s,p as t,d as r,b3 as c,B as o,Y as i}from"./calfSystem-a5fc99d4.js"
import"./isChecked-4820f42a.js"
import{s as n}from"./simpleCheckbox-e1941c15.js"
import"./hideElement-891c9603.js"
import{i as d}from"./insertHtmlAfterEnd-4d0857c1.js"
import{p as m}from"./parseDateAsTimestamp-cea7abad.js"
import"./toggleForce-a095aa43.js"
import{c as l}from"./collapse-4bc09d3a.js"
let p,f
function h(e){if(f&&c("PvP Ladder",e.children[1].children[0])){const s=m(o(e.children[1].children[2]).replace("Posted: ",""))
s>p&&(i(a,s),p=s)}}function j(e){return e>1}function b(){p=e(a),f=e("trackLadderReset")
const c="collapseNewsArchive",o=s(r,t)
o.length>2&&(!function(e,a){d(a,n(e))}(c,o[0].rows[2]),l({prefName:c,theTable:o[2],headInd:7,articleTest:j,extraFn:h}))}export default b
//# sourceMappingURL=viewArchive-cbf02dff.js.map
