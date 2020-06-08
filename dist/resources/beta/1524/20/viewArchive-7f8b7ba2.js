import{G as e,a3 as s,b as a,p as r,d as t,b5 as o,B as i,Y as c}from"./calfSystem-05554bae.js"
import"./isChecked-57b4060d.js"
import{s as l}from"./simpleCheckbox-1bbe1878.js"
import"./hideElement-b7650daa.js"
import{i as n}from"./insertHtmlAfterEnd-1461aee3.js"
import"./toggleForce-61cef79e.js"
import{p as m}from"./parseDateAsTimestamp-4d374b86.js"
import{c as d}from"./collapse-10123058.js"
let p,f
function h(e){if(f&&o("PvP Ladder",e.children[1].children[0])){const a=m(i(e.children[1].children[2]).replace("Posted: ",""))
a>p&&(c(s,a),p=a)}}function b(e){return e>1}export default function(){p=e(s),f=e("trackLadderReset")
const o=a(t,r)
o.length>2&&(!function(e,s){n(s,l(e))}("collapseNewsArchive",o[0].rows[2]),d({prefName:"collapseNewsArchive",theTable:o[2],headInd:7,articleTest:b,extraFn:h}))}
//# sourceMappingURL=viewArchive-7f8b7ba2.js.map
