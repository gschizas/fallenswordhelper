import{G as e,a6 as s,b as a,p as r,d as t,ba as c,B as o,Z as i}from"./calfSystem-4cc738f8.js"
import"./isChecked-464466aa.js"
import{s as l}from"./simpleCheckbox-326bdee4.js"
import"./hideElement-22c940e2.js"
import{i as n}from"./insertHtmlAfterEnd-3b4dcf73.js"
import{p as d}from"./parseDateAsTimestamp-adcf08c1.js"
import"./toggleForce-521f5f12.js"
import{c as m}from"./collapse-710b283d.js"
let f,p
function h(e){if(p&&c("PvP Ladder",e.children[1].children[0])){const a=d(o(e.children[1].children[2]).replace("Posted: ",""))
a>f&&(i(s,a),f=a)}}function j(e){return e>1}export default function(){f=e(s),p=e("trackLadderReset")
const c=a(t,r)
c.length>2&&(!function(e,s){n(s,l(e))}("collapseNewsArchive",c[0].rows[2]),m({prefName:"collapseNewsArchive",theTable:c[2],headInd:7,articleTest:j,extraFn:h}))}
//# sourceMappingURL=viewArchive-3c3a1238.js.map
