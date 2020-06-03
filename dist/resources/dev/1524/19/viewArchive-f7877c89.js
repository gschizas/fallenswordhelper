import{D as e,a6 as s,b as a,p as r,d as t,bb as c,A as o,X as i}from"./calfSystem-f7574730.js"
import"./isChecked-8b5fb1cd.js"
import{s as l}from"./simpleCheckbox-6ccf77ae.js"
import"./hideElement-8a032490.js"
import{i as n}from"./insertHtmlAfterEnd-38a30874.js"
import"./toggleForce-253de8c7.js"
import{p as m}from"./parseDateAsTimestamp-e4ec080f.js"
import{c as d}from"./collapse-97a93dec.js"
let p,f
function h(e){if(f&&c("PvP Ladder",e.children[1].children[0])){const a=m(o(e.children[1].children[2]).replace("Posted: ",""))
a>p&&(i(s,a),p=a)}}function j(e){return e>1}export default function(){p=e(s),f=e("trackLadderReset")
const c=a(t,r)
c.length>2&&(!function(e,s){n(s,l(e))}("collapseNewsArchive",c[0].rows[2]),d({prefName:"collapseNewsArchive",theTable:c[2],headInd:7,articleTest:j,extraFn:h}))}
//# sourceMappingURL=viewArchive-f7877c89.js.map
