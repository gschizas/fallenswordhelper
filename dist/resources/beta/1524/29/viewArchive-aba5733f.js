import{H as e,a3 as s,b as a,p as t,d as r,b4 as o,B as i,Y as c}from"./calfSystem-f9a27018.js"
import"./isChecked-92297855.js"
import{s as n}from"./simpleCheckbox-7d7105d2.js"
import"./hideElement-a8c1e8d6.js"
import{i as d}from"./insertHtmlAfterEnd-18e893ae.js"
import{p as m}from"./parseDateAsTimestamp-83334593.js"
import"./toggleForce-68981a01.js"
import{c as l}from"./collapse-5016da8f.js"
let p,f
function h(e){if(f&&o("PvP Ladder",e.children[1].children[0])){const a=m(i(e.children[1].children[2]).replace("Posted: ",""))
a>p&&(c(s,a),p=a)}}function j(e){return e>1}function u(){p=e(s),f=e("trackLadderReset")
const o="collapseNewsArchive",i=a(r,t)
i.length>2&&(!function(e,s){d(s,n(e))}(o,i[0].rows[2]),l({prefName:o,theTable:i[2],headInd:7,articleTest:j,extraFn:h}))}export default u
//# sourceMappingURL=viewArchive-aba5733f.js.map
