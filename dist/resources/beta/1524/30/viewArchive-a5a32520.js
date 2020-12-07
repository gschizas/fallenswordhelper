import{H as e,a3 as s,b as t,p as r,d as a,b4 as o,B as i,Y as c}from"./calfSystem-ebf4b17d.js"
import"./isChecked-6167b36b.js"
import{s as n}from"./simpleCheckbox-d8b32f4e.js"
import"./hideElement-f7381055.js"
import{i as d}from"./insertHtmlAfterEnd-e822003d.js"
import{p as m}from"./parseDateAsTimestamp-6231b29e.js"
import"./toggleForce-c034bc71.js"
import{c as l}from"./collapse-a00edc90.js"
let p,f
function b(e){if(f&&o("PvP Ladder",e.children[1].children[0])){const t=m(i(e.children[1].children[2]).replace("Posted: ",""))
t>p&&(c(s,t),p=t)}}function h(e){return e>1}function j(){p=e(s),f=e("trackLadderReset")
const o="collapseNewsArchive",i=t(a,r)
i.length>2&&(!function(e,s){d(s,n(e))}(o,i[0].rows[2]),l({prefName:o,theTable:i[2],headInd:7,articleTest:h,extraFn:b}))}export default j
//# sourceMappingURL=viewArchive-a5a32520.js.map
