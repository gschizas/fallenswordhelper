import{H as e,a3 as s,b as t,p as r,d as a,b3 as o,B as i,Y as c}from"./calfSystem-ec854151.js"
import"./isChecked-2d5427f6.js"
import{s as d}from"./simpleCheckbox-df19e948.js"
import"./hideElement-b044934d.js"
import{i as n}from"./insertHtmlAfterEnd-29e289c9.js"
import{p as m}from"./parseDateAsTimestamp-b98cf0ad.js"
import"./toggleForce-d6f8623d.js"
import{c as l}from"./collapse-da600dba.js"
let f,p
function h(e){if(p&&o("PvP Ladder",e.children[1].children[0])){const t=m(i(e.children[1].children[2]).replace("Posted: ",""))
t>f&&(c(s,t),f=t)}}function j(e){return e>1}function b(){f=e(s),p=e("trackLadderReset")
const o="collapseNewsArchive",i=t(a,r)
i.length>2&&(!function(e,s){n(s,d(e))}(o,i[0].rows[2]),l({prefName:o,theTable:i[2],headInd:7,articleTest:j,extraFn:h}))}export default b
//# sourceMappingURL=viewArchive-b962e3c3.js.map
