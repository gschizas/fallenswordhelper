import{G as e,a6 as s,b as r,p as t,d as a,ba as c,B as o,Z as i}from"./calfSystem-a2862afc.js"
import"./isChecked-e0d689b2.js"
import{s as d}from"./simpleCheckbox-c8f3914c.js"
import"./hideElement-66d2f02e.js"
import{i as l}from"./insertHtmlAfterEnd-dd2b68c5.js"
import"./toggleForce-4bee24df.js"
import{p as n}from"./parseDateAsTimestamp-0811cfc6.js"
import{c as m}from"./collapse-4b53e2e8.js"
let f,p
function h(e){if(p&&c("PvP Ladder",e.children[1].children[0])){const r=n(o(e.children[1].children[2]).replace("Posted: ",""))
r>f&&(i(s,r),f=r)}}function b(e){return e>1}export default function(){f=e(s),p=e("trackLadderReset")
const c=r(a,t)
c.length>2&&(!function(e,s){l(s,d(e))}("collapseNewsArchive",c[0].rows[2]),m({prefName:"collapseNewsArchive",theTable:c[2],headInd:7,articleTest:b,extraFn:h}))}
//# sourceMappingURL=viewArchive-0e5c42ea.js.map
