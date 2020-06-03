import{D as e,a1 as s,b as r,p as t,d as a,b4 as c,A as o,W as i}from"./calfSystem-8b6534a5.js"
import"./isChecked-cb800ed0.js"
import{s as l}from"./simpleCheckbox-c60a3930.js"
import"./hideElement-551a92b9.js"
import{i as n}from"./insertHtmlAfterEnd-4546785f.js"
import"./toggleForce-c312b2b1.js"
import{p as m}from"./parseDateAsTimestamp-c909c985.js"
import{c as p}from"./collapse-7b6fb8f6.js"
let d,f
function h(e){if(f&&c("PvP Ladder",e.children[1].children[0])){const r=m(o(e.children[1].children[2]).replace("Posted: ",""))
r>d&&(i(s,r),d=r)}}function b(e){return e>1}export default function(){d=e(s),f=e("trackLadderReset")
const c=r(a,t)
c.length>2&&(!function(e,s){n(s,l(e))}("collapseNewsArchive",c[0].rows[2]),p({prefName:"collapseNewsArchive",theTable:c[2],headInd:7,articleTest:b,extraFn:h}))}
//# sourceMappingURL=viewArchive-f38407b0.js.map
