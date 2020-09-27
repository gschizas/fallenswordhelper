import{H as e,a6 as s,b as t,p as r,d as a,ba as o,B as i,Z as c}from"./calfSystem-69dd5601.js"
import"./isChecked-9f10b428.js"
import{s as d}from"./simpleCheckbox-5b36aca2.js"
import"./hideElement-c8e0696f.js"
import{i as n}from"./insertHtmlAfterEnd-df8843e7.js"
import{p as f}from"./parseDateAsTimestamp-02f5c147.js"
import"./toggleForce-8f3fdd9b.js"
import{c as m}from"./collapse-0672b344.js"
let l,p
function h(e){if(p&&o("PvP Ladder",e.children[1].children[0])){const t=f(i(e.children[1].children[2]).replace("Posted: ",""))
t>l&&(c(s,t),l=t)}}function b(e){return e>1}function j(){l=e(s),p=e("trackLadderReset")
const o="collapseNewsArchive",i=t(a,r)
i.length>2&&(!function(e,s){n(s,d(e))}(o,i[0].rows[2]),m({prefName:o,theTable:i[2],headInd:7,articleTest:b,extraFn:h}))}export default j
//# sourceMappingURL=viewArchive-6b092ed2.js.map
