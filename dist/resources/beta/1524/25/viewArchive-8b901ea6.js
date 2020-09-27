import{H as e,a3 as s,b as a,p as t,d as r,b5 as o,B as i,Y as c}from"./calfSystem-d3aab5a8.js"
import"./isChecked-9f10b428.js"
import{s as d}from"./simpleCheckbox-1b2a93e8.js"
import"./hideElement-c8e0696f.js"
import{i as n}from"./insertHtmlAfterEnd-d031a1ae.js"
import{p as f}from"./parseDateAsTimestamp-2f425fab.js"
import"./toggleForce-8f3fdd9b.js"
import{c as m}from"./collapse-4018750d.js"
let l,p
function h(e){if(p&&o("PvP Ladder",e.children[1].children[0])){const a=f(i(e.children[1].children[2]).replace("Posted: ",""))
a>l&&(c(s,a),l=a)}}function b(e){return e>1}function j(){l=e(s),p=e("trackLadderReset")
const o="collapseNewsArchive",i=a(r,t)
i.length>2&&(!function(e,s){n(s,d(e))}(o,i[0].rows[2]),m({prefName:o,theTable:i[2],headInd:7,articleTest:b,extraFn:h}))}export default j
//# sourceMappingURL=viewArchive-8b901ea6.js.map
