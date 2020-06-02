import{D as e,a1 as s,b as r,p as t,d as a,b4 as c,A as o,W as i}from"./calfSystem-dec5e071.js"
import"./isChecked-9b2ad5c2.js"
import{s as l}from"./simpleCheckbox-3c52b154.js"
import"./hideElement-3fc45118.js"
import{i as n}from"./insertHtmlAfterEnd-52e450d3.js"
import"./toggleForce-93af29f7.js"
import{p as m}from"./parseDateAsTimestamp-c7307a60.js"
import{c as d}from"./collapse-c2e6e937.js"
let p,f
function h(e){if(f&&c("PvP Ladder",e.children[1].children[0])){const r=m(o(e.children[1].children[2]).replace("Posted: ",""))
r>p&&(i(s,r),p=r)}}function j(e){return e>1}export default function(){p=e(s),f=e("trackLadderReset")
const c=r(a,t)
c.length>2&&(!function(e,s){n(s,l(e))}("collapseNewsArchive",c[0].rows[2]),d({prefName:"collapseNewsArchive",theTable:c[2],headInd:7,articleTest:j,extraFn:h}))}
//# sourceMappingURL=viewArchive-ce7cdaa3.js.map
