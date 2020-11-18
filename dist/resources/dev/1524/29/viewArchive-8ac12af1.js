import{H as e,a6 as s,b as t,p as a,d as r,b9 as o,B as c,Z as i}from"./calfSystem-02c48ff5.js"
import"./isChecked-92297855.js"
import{s as n}from"./simpleCheckbox-5230523e.js"
import"./hideElement-a8c1e8d6.js"
import{i as m}from"./insertHtmlAfterEnd-b7d6a20f.js"
import{p as l}from"./parseDateAsTimestamp-c157f06b.js"
import"./toggleForce-68981a01.js"
import{c as d}from"./collapse-105c2ac8.js"
let f,p
function h(e){if(p&&o("PvP Ladder",e.children[1].children[0])){const t=l(c(e.children[1].children[2]).replace("Posted: ",""))
t>f&&(i(s,t),f=t)}}function j(e){return e>1}function b(){f=e(s),p=e("trackLadderReset")
const o="collapseNewsArchive",c=t(r,a)
c.length>2&&(!function(e,s){m(s,n(e))}(o,c[0].rows[2]),d({prefName:o,theTable:c[2],headInd:7,articleTest:j,extraFn:h}))}export default b
//# sourceMappingURL=viewArchive-8ac12af1.js.map
