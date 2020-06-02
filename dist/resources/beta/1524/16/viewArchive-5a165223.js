import{D as e,a1 as s,b as a,p as r,d as t,b6 as o,A as i,W as c}from"./calfSystem-9554b525.js"
import"./isChecked-145d8a72.js"
import{s as l}from"./simpleCheckbox-7b8c126a.js"
import"./hideElement-adf57e3b.js"
import{i as n}from"./insertHtmlAfterEnd-b9b58b3d.js"
import"./toggleForce-23da739a.js"
import{p as d}from"./parseDateAsTimestamp-88f3f0a3.js"
import{c as m}from"./collapse-a0a0989c.js"
let p,f
function h(e){if(f&&o("PvP Ladder",e.children[1].children[0])){const a=d(i(e.children[1].children[2]).replace("Posted: ",""))
a>p&&(c(s,a),p=a)}}function b(e){return e>1}export default function(){p=e(s),f=e("trackLadderReset")
const o=a(t,r)
o.length>2&&(!function(e,s){n(s,l(e))}("collapseNewsArchive",o[0].rows[2]),m({prefName:"collapseNewsArchive",theTable:o[2],headInd:7,articleTest:b,extraFn:h}))}
//# sourceMappingURL=viewArchive-5a165223.js.map
