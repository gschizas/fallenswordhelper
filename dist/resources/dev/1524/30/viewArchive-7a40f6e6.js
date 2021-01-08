import{H as e,a6 as s,b as a,p as t,d as r,b9 as o,B as c,Z as i}from"./calfSystem-54df10e3.js"
import"./isChecked-6167b36b.js"
import{s as n}from"./simpleCheckbox-4ba02dd9.js"
import"./hideElement-f7381055.js"
import{i as m}from"./insertHtmlAfterEnd-a9fec142.js"
import{p as d}from"./parseDateAsTimestamp-c381ef9a.js"
import"./toggleForce-c034bc71.js"
import{c as l}from"./collapse-b37ae1a9.js"
let f,p
function h(e){if(p&&o("PvP Ladder",e.children[1].children[0])){const a=d(c(e.children[1].children[2]).replace("Posted: ",""))
a>f&&(i(s,a),f=a)}}function b(e){return e>1}function j(){f=e(s),p=e("trackLadderReset")
const o="collapseNewsArchive",c=a(r,t)
c.length>2&&(!function(e,s){m(s,n(e))}(o,c[0].rows[2]),l({prefName:o,theTable:c[2],headInd:7,articleTest:b,extraFn:h}))}export default j
//# sourceMappingURL=viewArchive-7a40f6e6.js.map
