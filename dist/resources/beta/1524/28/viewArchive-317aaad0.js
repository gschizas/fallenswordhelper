import{H as e,a3 as s,b as a,p as t,d as r,b4 as c,B as o,Y as i}from"./calfSystem-964f4fc9.js"
import"./isChecked-12c32ad5.js"
import{s as d}from"./simpleCheckbox-db80ba61.js"
import"./hideElement-c14a94c9.js"
import{i as n}from"./insertHtmlAfterEnd-17c23200.js"
import{p as m}from"./parseDateAsTimestamp-ea0c4118.js"
import"./toggleForce-10d35470.js"
import{c as l}from"./collapse-dbebd3ad.js"
let p,f
function h(e){if(f&&c("PvP Ladder",e.children[1].children[0])){const a=m(o(e.children[1].children[2]).replace("Posted: ",""))
a>p&&(i(s,a),p=a)}}function b(e){return e>1}function j(){p=e(s),f=e("trackLadderReset")
const c="collapseNewsArchive",o=a(r,t)
o.length>2&&(!function(e,s){n(s,d(e))}(c,o[0].rows[2]),l({prefName:c,theTable:o[2],headInd:7,articleTest:b,extraFn:h}))}export default j
//# sourceMappingURL=viewArchive-317aaad0.js.map
