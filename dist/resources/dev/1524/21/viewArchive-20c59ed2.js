import{G as e,a6 as s,b as a,p as r,d as t,ba as c,B as o,Z as i}from"./calfSystem-9c7241dc.js"
import"./isChecked-6dfc89f5.js"
import{s as l}from"./simpleCheckbox-6241d838.js"
import"./hideElement-2e2ee272.js"
import{i as n}from"./insertHtmlAfterEnd-1e4cd611.js"
import{p as d}from"./parseDateAsTimestamp-887793ae.js"
import"./toggleForce-5f56c364.js"
import{c as m}from"./collapse-ab7af893.js"
let p,f
function h(e){if(f&&c("PvP Ladder",e.children[1].children[0])){const a=d(o(e.children[1].children[2]).replace("Posted: ",""))
a>p&&(i(s,a),p=a)}}function j(e){return e>1}export default function(){p=e(s),f=e("trackLadderReset")
const c=a(t,r)
c.length>2&&(!function(e,s){n(s,l(e))}("collapseNewsArchive",c[0].rows[2]),m({prefName:"collapseNewsArchive",theTable:c[2],headInd:7,articleTest:j,extraFn:h}))}
//# sourceMappingURL=viewArchive-20c59ed2.js.map
