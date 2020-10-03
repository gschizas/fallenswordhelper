import{H as e,a6 as s,b as a,p as t,d as r,ba as o,B as c,Z as i}from"./calfSystem-4991bf5b.js"
import"./isChecked-4820f42a.js"
import{s as n}from"./simpleCheckbox-07c276d2.js"
import"./hideElement-891c9603.js"
import{i as m}from"./insertHtmlAfterEnd-93fb4549.js"
import{p as l}from"./parseDateAsTimestamp-38003be6.js"
import"./toggleForce-a095aa43.js"
import{c as p}from"./collapse-2c194c44.js"
let d,f
function h(e){if(f&&o("PvP Ladder",e.children[1].children[0])){const a=l(c(e.children[1].children[2]).replace("Posted: ",""))
a>d&&(i(s,a),d=a)}}function b(e){return e>1}function j(){d=e(s),f=e("trackLadderReset")
const o="collapseNewsArchive",c=a(r,t)
c.length>2&&(!function(e,s){m(s,n(e))}(o,c[0].rows[2]),p({prefName:o,theTable:c[2],headInd:7,articleTest:b,extraFn:h}))}export default j
//# sourceMappingURL=viewArchive-d33dd721.js.map
