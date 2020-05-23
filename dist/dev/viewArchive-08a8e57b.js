import{G as e,b as s,p as a,c as t,bw as r,bs as c,D as l,a5 as o,$ as d}from"./calfSystem-70b0df7f.js"
import"./isChecked-c96092db.js"
import{s as i}from"./simpleCheckbox-13baa371.js"
import{c as n}from"./collapse-4e0ddeb0.js"
let f
function p(e){if(r("PvP Ladder",e.children[1].children[0])){const s=c(l(e.children[1].children[2]).replace("Posted: ",""))
s>f&&(o("lastLadderReset",s),f=s)}}function h(e){return e>1}export default function(){f=e("lastLadderReset")
const r=s(t,a)
r.length>2&&(!function(e,s){d(s,i(e))}("collapseNewsArchive",r[0].rows[2]),n({prefName:"collapseNewsArchive",theTable:r[2],headInd:7,articleTest:h,extraFn:p}))}
//# sourceMappingURL=viewArchive-08a8e57b.js.map
