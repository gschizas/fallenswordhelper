import{H as e,a7 as s,b as t,p as r,d as a,ba as c,B as o,_ as i}from"./calfSystem-ec5e5725.js"
import"./isChecked-ed98077f.js"
import{s as n}from"./simpleCheckbox-e694b596.js"
import"./hideElement-b0b3e820.js"
import{i as m}from"./insertHtmlAfterEnd-01ce7acd.js"
import{p as d}from"./parseDateAsTimestamp-2287985e.js"
import"./toggleForce-7e736fc3.js"
import{c as l}from"./collapse-bcde20c9.js"
let p,f
function h(e){if(f&&c("PvP Ladder",e.children[1].children[0])){const t=d(o(e.children[1].children[2]).replace("Posted: ",""))
t>p&&(i(s,t),p=t)}}function b(e){return e>1}function j(){p=e(s),f=e("trackLadderReset")
const c="collapseNewsArchive",o=t(a,r)
o.length>2&&(!function(e,s){m(s,n(e))}(c,o[0].rows[2]),l({prefName:c,theTable:o[2],headInd:7,articleTest:b,extraFn:h}))}export default j
//# sourceMappingURL=viewArchive-70a87e59.js.map
