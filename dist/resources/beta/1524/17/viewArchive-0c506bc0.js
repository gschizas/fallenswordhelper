import{D as e,a1 as s,b as r,p as t,d as a,b6 as o,A as c,W as i}from"./calfSystem-02ae8657.js"
import"./isChecked-d5c20d5f.js"
import{s as l}from"./simpleCheckbox-11c3e9b3.js"
import"./hideElement-2791bd8d.js"
import{i as n}from"./insertHtmlAfterEnd-23545b48.js"
import"./toggleForce-f1ceaa74.js"
import{p as d}from"./parseDateAsTimestamp-3e99b4b4.js"
import{c as m}from"./collapse-1042304c.js"
let p,f
function h(e){if(f&&o("PvP Ladder",e.children[1].children[0])){const r=d(c(e.children[1].children[2]).replace("Posted: ",""))
r>p&&(i(s,r),p=r)}}function b(e){return e>1}export default function(){p=e(s),f=e("trackLadderReset")
const o=r(a,t)
o.length>2&&(!function(e,s){n(s,l(e))}("collapseNewsArchive",o[0].rows[2]),m({prefName:"collapseNewsArchive",theTable:o[2],headInd:7,articleTest:b,extraFn:h}))}
//# sourceMappingURL=viewArchive-0c506bc0.js.map
