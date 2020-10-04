import{H as e,a4 as s,b as t,p as a,d as r,b5 as o,B as i,Z as c}from"./calfSystem-70c7a660.js"
import"./isChecked-ed98077f.js"
import{s as d}from"./simpleCheckbox-334243d2.js"
import"./hideElement-b0b3e820.js"
import{i as n}from"./insertHtmlAfterEnd-005493b2.js"
import{p as m}from"./parseDateAsTimestamp-e22eadba.js"
import"./toggleForce-7e736fc3.js"
import{c as l}from"./collapse-e74ba0dd.js"
let p,f
function h(e){if(f&&o("PvP Ladder",e.children[1].children[0])){const t=m(i(e.children[1].children[2]).replace("Posted: ",""))
t>p&&(c(s,t),p=t)}}function b(e){return e>1}function j(){p=e(s),f=e("trackLadderReset")
const o="collapseNewsArchive",i=t(r,a)
i.length>2&&(!function(e,s){n(s,d(e))}(o,i[0].rows[2]),l({prefName:o,theTable:i[2],headInd:7,articleTest:b,extraFn:h}))}export default j
//# sourceMappingURL=viewArchive-a43272d6.js.map
