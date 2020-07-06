import{G as e,a3 as s,b as r,p as t,d as a,b3 as o,B as c,Y as i}from"./calfSystem-019de1cf.js"
import"./isChecked-8ee9db43.js"
import{s as d}from"./simpleCheckbox-4d2b1b22.js"
import"./hideElement-48576eeb.js"
import{i as l}from"./insertHtmlAfterEnd-4e8e25bc.js"
import{p as n}from"./parseDateAsTimestamp-1a852ddf.js"
import"./toggleForce-7d757ba6.js"
import{c as m}from"./collapse-e50473c7.js"
let p,f
function h(e){if(f&&o("PvP Ladder",e.children[1].children[0])){const r=n(c(e.children[1].children[2]).replace("Posted: ",""))
r>p&&(i(s,r),p=r)}}function b(e){return e>1}export default function(){p=e(s),f=e("trackLadderReset")
const o=r(a,t)
o.length>2&&(!function(e,s){l(s,d(e))}("collapseNewsArchive",o[0].rows[2]),m({prefName:"collapseNewsArchive",theTable:o[2],headInd:7,articleTest:b,extraFn:h}))}
//# sourceMappingURL=viewArchive-7c317e69.js.map
