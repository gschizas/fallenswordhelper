import{D as e,a6 as s,b as r,p as t,d as a,bb as c,A as o,X as i}from"./calfSystem-d49dbbd3.js"
import"./isChecked-e319351c.js"
import{s as d}from"./simpleCheckbox-1fc6621f.js"
import"./hideElement-a25240d4.js"
import{i as l}from"./insertHtmlAfterEnd-43b283e0.js"
import"./toggleForce-c06db9a6.js"
import{p as n}from"./parseDateAsTimestamp-526fc279.js"
import{c as m}from"./collapse-05fec26e.js"
let p,f
function h(e){if(f&&c("PvP Ladder",e.children[1].children[0])){const r=n(o(e.children[1].children[2]).replace("Posted: ",""))
r>p&&(i(s,r),p=r)}}function b(e){return e>1}export default function(){p=e(s),f=e("trackLadderReset")
const c=r(a,t)
c.length>2&&(!function(e,s){l(s,d(e))}("collapseNewsArchive",c[0].rows[2]),m({prefName:"collapseNewsArchive",theTable:c[2],headInd:7,articleTest:b,extraFn:h}))}
//# sourceMappingURL=viewArchive-525dace0.js.map
