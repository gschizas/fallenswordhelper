import{H as e,a3 as s,b as t,p as r,d as a,b3 as o,B as i,Y as c}from"./calfSystem-71b9378d.js"
import"./isChecked-9f10b428.js"
import{s as d}from"./simpleCheckbox-1a2b6475.js"
import"./hideElement-c8e0696f.js"
import{i as n}from"./insertHtmlAfterEnd-8f485add.js"
import{p as m}from"./parseDateAsTimestamp-07140c81.js"
import"./toggleForce-8f3fdd9b.js"
import{c as f}from"./collapse-154e55cd.js"
let l,p
function h(e){if(p&&o("PvP Ladder",e.children[1].children[0])){const t=m(i(e.children[1].children[2]).replace("Posted: ",""))
t>l&&(c(s,t),l=t)}}function b(e){return e>1}function j(){l=e(s),p=e("trackLadderReset")
const o="collapseNewsArchive",i=t(a,r)
i.length>2&&(!function(e,s){n(s,d(e))}(o,i[0].rows[2]),f({prefName:o,theTable:i[2],headInd:7,articleTest:b,extraFn:h}))}export default j
//# sourceMappingURL=viewArchive-935c26cb.js.map
