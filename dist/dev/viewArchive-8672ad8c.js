import{G as e,b as s,p as a,c as t,bw as r,bs as c,D as l,a5 as o,$ as i}from"./calfSystem-0e5d6faf.js"
import"./isChecked-b4499234.js"
import{s as n}from"./simpleCheckbox-36785f1a.js"
import{c as d}from"./collapse-e9aa7592.js"
let f
function p(e){if(r("PvP Ladder",e.children[1].children[0])){const s=c(l(e.children[1].children[2]).replace("Posted: ",""))
s>f&&(o("lastLadderReset",s),f=s)}}function h(e){return e>1}export default function(){f=e("lastLadderReset")
const r=s(t,a)
r.length>2&&(!function(e,s){i(s,n(e))}("collapseNewsArchive",r[0].rows[2]),d({prefName:"collapseNewsArchive",theTable:r[2],headInd:7,articleTest:h,extraFn:p}))}
//# sourceMappingURL=viewArchive-8672ad8c.js.map
