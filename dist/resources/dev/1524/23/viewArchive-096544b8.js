import{G as e,a6 as s,b as r,p as t,d as a,ba as o,B as c,Z as i}from"./calfSystem-9901ad27.js"
import"./isChecked-8ee9db43.js"
import{s as l}from"./simpleCheckbox-3328fcb7.js"
import"./hideElement-48576eeb.js"
import{i as n}from"./insertHtmlAfterEnd-74bf7056.js"
import{p as d}from"./parseDateAsTimestamp-517c1f16.js"
import"./toggleForce-7d757ba6.js"
import{c as m}from"./collapse-9f7d09fc.js"
let f,p
function h(e){if(p&&o("PvP Ladder",e.children[1].children[0])){const r=d(c(e.children[1].children[2]).replace("Posted: ",""))
r>f&&(i(s,r),f=r)}}function b(e){return e>1}export default function(){f=e(s),p=e("trackLadderReset")
const o=r(a,t)
o.length>2&&(!function(e,s){n(s,l(e))}("collapseNewsArchive",o[0].rows[2]),m({prefName:"collapseNewsArchive",theTable:o[2],headInd:7,articleTest:b,extraFn:h}))}
//# sourceMappingURL=viewArchive-096544b8.js.map
