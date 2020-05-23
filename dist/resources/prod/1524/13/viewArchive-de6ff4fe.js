import{G as e,b as s,p as a,c as t,bp as r,bk as c,D as l,a4 as o,_ as i}from"./calfSystem-e6a24264.js"
import"./isChecked-2896c552.js"
import{s as n}from"./simpleCheckbox-1004d6af.js"
import{c as d}from"./collapse-b0a08406.js"
let p
function f(e){if(r("PvP Ladder",e.children[1].children[0])){const s=c(l(e.children[1].children[2]).replace("Posted: ",""))
s>p&&(o("lastLadderReset",s),p=s)}}function h(e){return e>1}export default function(){p=e("lastLadderReset")
const r=s(t,a)
r.length>2&&(!function(e,s){i(s,n(e))}("collapseNewsArchive",r[0].rows[2]),d({prefName:"collapseNewsArchive",theTable:r[2],headInd:7,articleTest:h,extraFn:f}))}
//# sourceMappingURL=viewArchive-de6ff4fe.js.map
