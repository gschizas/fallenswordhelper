import{D as e,a1 as s,b as r,p as t,d as a,b6 as o,A as c,W as i}from"./calfSystem-57340987.js"
import"./isChecked-e2c7160f.js"
import{s as l}from"./simpleCheckbox-0095209e.js"
import"./hideElement-5296bb8b.js"
import{i as n}from"./insertHtmlAfterEnd-c6138b5e.js"
import"./toggleForce-1813ed31.js"
import{p as m}from"./parseDateAsTimestamp-c9ded138.js"
import{c as d}from"./collapse-911bbe87.js"
let p,f
function h(e){if(f&&o("PvP Ladder",e.children[1].children[0])){const r=m(c(e.children[1].children[2]).replace("Posted: ",""))
r>p&&(i(s,r),p=r)}}function b(e){return e>1}export default function(){p=e(s),f=e("trackLadderReset")
const o=r(a,t)
o.length>2&&(!function(e,s){n(s,l(e))}("collapseNewsArchive",o[0].rows[2]),d({prefName:"collapseNewsArchive",theTable:o[2],headInd:7,articleTest:b,extraFn:h}))}
//# sourceMappingURL=viewArchive-749a72cc.js.map
