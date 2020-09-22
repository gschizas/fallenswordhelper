import{H as e,a6 as s,b as t,p as a,d as r,ba as o,B as i,Z as c}from"./calfSystem-38898f3e.js"
import"./isChecked-2d5427f6.js"
import{s as d}from"./simpleCheckbox-b24eb7dc.js"
import"./hideElement-b044934d.js"
import{i as n}from"./insertHtmlAfterEnd-8b82fe39.js"
import{p as m}from"./parseDateAsTimestamp-181259a8.js"
import"./toggleForce-d6f8623d.js"
import{c as l}from"./collapse-6080aa94.js"
let f,p
function h(e){if(p&&o("PvP Ladder",e.children[1].children[0])){const t=m(i(e.children[1].children[2]).replace("Posted: ",""))
t>f&&(c(s,t),f=t)}}function b(e){return e>1}function j(){f=e(s),p=e("trackLadderReset")
const o="collapseNewsArchive",i=t(r,a)
i.length>2&&(!function(e,s){n(s,d(e))}(o,i[0].rows[2]),l({prefName:o,theTable:i[2],headInd:7,articleTest:b,extraFn:h}))}export default j
//# sourceMappingURL=viewArchive-1b769b48.js.map
