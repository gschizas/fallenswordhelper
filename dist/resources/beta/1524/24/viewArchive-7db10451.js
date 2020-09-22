import{H as e,a3 as s,b as t,p as r,d as a,b5 as o,B as i,Y as c}from"./calfSystem-019a589c.js"
import"./isChecked-2d5427f6.js"
import{s as d}from"./simpleCheckbox-863a1324.js"
import"./hideElement-b044934d.js"
import{i as n}from"./insertHtmlAfterEnd-74622885.js"
import{p as m}from"./parseDateAsTimestamp-b47d90ca.js"
import"./toggleForce-d6f8623d.js"
import{c as l}from"./collapse-e3981f68.js"
let p,f
function h(e){if(f&&o("PvP Ladder",e.children[1].children[0])){const t=m(i(e.children[1].children[2]).replace("Posted: ",""))
t>p&&(c(s,t),p=t)}}function j(e){return e>1}function b(){p=e(s),f=e("trackLadderReset")
const o="collapseNewsArchive",i=t(a,r)
i.length>2&&(!function(e,s){n(s,d(e))}(o,i[0].rows[2]),l({prefName:o,theTable:i[2],headInd:7,articleTest:j,extraFn:h}))}export default b
//# sourceMappingURL=viewArchive-7db10451.js.map
