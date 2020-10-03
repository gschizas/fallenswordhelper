import{H as e,a3 as a,b as s,p as t,d as r,b5 as o,B as c,Y as i}from"./calfSystem-cf4d22a7.js"
import"./isChecked-4820f42a.js"
import{s as n}from"./simpleCheckbox-358d4bfe.js"
import"./hideElement-891c9603.js"
import{i as f}from"./insertHtmlAfterEnd-a7b25c39.js"
import{p as m}from"./parseDateAsTimestamp-21fc8baa.js"
import"./toggleForce-a095aa43.js"
import{c as l}from"./collapse-b68ff297.js"
let d,p
function h(e){if(p&&o("PvP Ladder",e.children[1].children[0])){const s=m(c(e.children[1].children[2]).replace("Posted: ",""))
s>d&&(i(a,s),d=s)}}function b(e){return e>1}function j(){d=e(a),p=e("trackLadderReset")
const o="collapseNewsArchive",c=s(r,t)
c.length>2&&(!function(e,a){f(a,n(e))}(o,c[0].rows[2]),l({prefName:o,theTable:c[2],headInd:7,articleTest:b,extraFn:h}))}export default j
//# sourceMappingURL=viewArchive-7f274aac.js.map
