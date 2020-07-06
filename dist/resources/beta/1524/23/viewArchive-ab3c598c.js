import{G as e,a3 as s,b as r,p as t,d as a,b5 as o,B as i,Y as c}from"./calfSystem-34fcd691.js"
import"./isChecked-8ee9db43.js"
import{s as d}from"./simpleCheckbox-86567985.js"
import"./hideElement-48576eeb.js"
import{i as l}from"./insertHtmlAfterEnd-d9a9762d.js"
import{p as n}from"./parseDateAsTimestamp-56d08ae7.js"
import"./toggleForce-7d757ba6.js"
import{c as m}from"./collapse-69f7b584.js"
let p,f
function h(e){if(f&&o("PvP Ladder",e.children[1].children[0])){const r=n(i(e.children[1].children[2]).replace("Posted: ",""))
r>p&&(c(s,r),p=r)}}function b(e){return e>1}export default function(){p=e(s),f=e("trackLadderReset")
const o=r(a,t)
o.length>2&&(!function(e,s){l(s,d(e))}("collapseNewsArchive",o[0].rows[2]),m({prefName:"collapseNewsArchive",theTable:o[2],headInd:7,articleTest:b,extraFn:h}))}
//# sourceMappingURL=viewArchive-ab3c598c.js.map
