import{D as e,a6 as s,b as a,p as r,d as t,bb as o,A as i,X as c}from"./calfSystem-5545a3e6.js"
import"./isChecked-ae232d81.js"
import{s as l}from"./simpleCheckbox-16914843.js"
import"./hideElement-f7434a50.js"
import{i as n}from"./insertHtmlAfterEnd-489f5b87.js"
import"./toggleForce-c71db530.js"
import{p as d}from"./parseDateAsTimestamp-d25abda3.js"
import{c as m}from"./collapse-ca7a10ab.js"
let p,f
function h(e){if(f&&o("PvP Ladder",e.children[1].children[0])){const a=d(i(e.children[1].children[2]).replace("Posted: ",""))
a>p&&(c(s,a),p=a)}}function b(e){return e>1}export default function(){p=e(s),f=e("trackLadderReset")
const o=a(t,r)
o.length>2&&(!function(e,s){n(s,l(e))}("collapseNewsArchive",o[0].rows[2]),m({prefName:"collapseNewsArchive",theTable:o[2],headInd:7,articleTest:b,extraFn:h}))}
//# sourceMappingURL=viewArchive-d7b50bbc.js.map
