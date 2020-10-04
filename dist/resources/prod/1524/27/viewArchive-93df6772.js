import{H as e,a4 as s,b as t,p as r,d as a,b3 as o,B as i,Z as c}from"./calfSystem-3bdf319e.js"
import"./isChecked-ed98077f.js"
import{s as f}from"./simpleCheckbox-4f2c6115.js"
import"./hideElement-b0b3e820.js"
import{i as n}from"./insertHtmlAfterEnd-56f50dfb.js"
import{p as m}from"./parseDateAsTimestamp-3b93125b.js"
import"./toggleForce-7e736fc3.js"
import{c as d}from"./collapse-5af31583.js"
let l,p
function h(e){if(p&&o("PvP Ladder",e.children[1].children[0])){const t=m(i(e.children[1].children[2]).replace("Posted: ",""))
t>l&&(c(s,t),l=t)}}function b(e){return e>1}function j(){l=e(s),p=e("trackLadderReset")
const o="collapseNewsArchive",i=t(a,r)
i.length>2&&(!function(e,s){n(s,f(e))}(o,i[0].rows[2]),d({prefName:o,theTable:i[2],headInd:7,articleTest:b,extraFn:h}))}export default j
//# sourceMappingURL=viewArchive-93df6772.js.map
