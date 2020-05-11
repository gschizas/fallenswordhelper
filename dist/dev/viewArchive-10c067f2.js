import{G as e,b as s,p as a,c as t,bw as c,bs as r,D as l,a5 as o,$ as d}from"./calfSystem-8dc0fa4b.js"
import"./isChecked-1bdf83c2.js"
import{s as i}from"./simpleCheckbox-1f751e80.js"
import{c as n}from"./collapse-7d9ff169.js"
let f
function p(e){if(c("PvP Ladder",e.children[1].children[0])){const s=r(l(e.children[1].children[2]).replace("Posted: ",""))
s>f&&(o("lastLadderReset",s),f=s)}}function h(e){return e>1}export default function(){f=e("lastLadderReset")
const c=s(t,a)
c.length>2&&(!function(e,s){d(s,i(e))}("collapseNewsArchive",c[0].rows[2]),n({prefName:"collapseNewsArchive",theTable:c[2],headInd:7,articleTest:h,extraFn:p}))}
//# sourceMappingURL=viewArchive-10c067f2.js.map
