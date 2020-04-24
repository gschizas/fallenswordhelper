import{G as e,b as s,p as a,c as t,bp as r,bk as c,D as l,a4 as o,_ as i}from"./calfSystem-3956a623.js"
import"./isChecked-fb51e5d1.js"
import{s as n}from"./simpleCheckbox-6ac789e1.js"
import{c as d}from"./collapse-1fe3862b.js"
let f
function p(e){if(r("PvP Ladder",e.children[1].children[0])){const s=c(l(e.children[1].children[2]).replace("Posted: ",""))
s>f&&(o("lastLadderReset",s),f=s)}}function h(e){return e>1}export default function(){f=e("lastLadderReset")
const r=s(t,a)
r.length>2&&(!function(e,s){i(s,n(e))}("collapseNewsArchive",r[0].rows[2]),d({prefName:"collapseNewsArchive",theTable:r[2],headInd:7,articleTest:h,extraFn:p}))}
//# sourceMappingURL=viewArchive-e8dadcb9.js.map
