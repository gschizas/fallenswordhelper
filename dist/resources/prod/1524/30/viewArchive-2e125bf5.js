import{H as e,a3 as s,b as t,p as a,d as r,b2 as o,B as c,Y as i}from"./calfSystem-6459f18a.js"
import"./isChecked-6167b36b.js"
import{s as n}from"./simpleCheckbox-994bcb83.js"
import"./hideElement-f7381055.js"
import{i as m}from"./insertHtmlAfterEnd-deef01ad.js"
import{p as d}from"./parseDateAsTimestamp-6a159a44.js"
import"./toggleForce-c034bc71.js"
import{c as l}from"./collapse-5bf6c6ed.js"
let f,p
function h(e){if(p&&o("PvP Ladder",e.children[1].children[0])){const t=d(c(e.children[1].children[2]).replace("Posted: ",""))
t>f&&(i(s,t),f=t)}}function b(e){return e>1}function j(){f=e(s),p=e("trackLadderReset")
const o="collapseNewsArchive",c=t(r,a)
c.length>2&&(!function(e,s){m(s,n(e))}(o,c[0].rows[2]),l({prefName:o,theTable:c[2],headInd:7,articleTest:b,extraFn:h}))}export default j
//# sourceMappingURL=viewArchive-2e125bf5.js.map
