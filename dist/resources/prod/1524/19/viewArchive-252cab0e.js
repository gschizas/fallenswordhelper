import{D as e,a1 as s,b as a,p as r,d as t,b4 as c,A as o,W as i}from"./calfSystem-6fc0cc1b.js"
import"./isChecked-ce5ca840.js"
import{s as l}from"./simpleCheckbox-a0ada781.js"
import"./hideElement-0911f8f2.js"
import{i as n}from"./insertHtmlAfterEnd-cb1e0a76.js"
import"./toggleForce-e87c07c6.js"
import{p as m}from"./parseDateAsTimestamp-576c2f4c.js"
import{c as d}from"./collapse-19d97dfb.js"
let f,p
function h(e){if(p&&c("PvP Ladder",e.children[1].children[0])){const a=m(o(e.children[1].children[2]).replace("Posted: ",""))
a>f&&(i(s,a),f=a)}}function j(e){return e>1}export default function(){f=e(s),p=e("trackLadderReset")
const c=a(t,r)
c.length>2&&(!function(e,s){n(s,l(e))}("collapseNewsArchive",c[0].rows[2]),d({prefName:"collapseNewsArchive",theTable:c[2],headInd:7,articleTest:j,extraFn:h}))}
//# sourceMappingURL=viewArchive-252cab0e.js.map
