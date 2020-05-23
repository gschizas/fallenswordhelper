import{G as e,b as s,p as a,c as t,bp as c,bk as r,D as l,a4 as o,_ as i}from"./calfSystem-d06402b1.js"
import"./isChecked-b6eac7fa.js"
import{s as n}from"./simpleCheckbox-fe85ce04.js"
import{c as d}from"./collapse-113e0d4e.js"
let f
function p(e){if(c("PvP Ladder",e.children[1].children[0])){const s=r(l(e.children[1].children[2]).replace("Posted: ",""))
s>f&&(o("lastLadderReset",s),f=s)}}function h(e){return e>1}export default function(){f=e("lastLadderReset")
const c=s(t,a)
c.length>2&&(!function(e,s){i(s,n(e))}("collapseNewsArchive",c[0].rows[2]),d({prefName:"collapseNewsArchive",theTable:c[2],headInd:7,articleTest:h,extraFn:p}))}
//# sourceMappingURL=viewArchive-e658eeb9.js.map
