import{G as e,b as s,p as a,c as t,bw as c,bs as r,D as l,a5 as o,$ as d}from"./calfSystem-01eb06ed.js"
import"./isChecked-4667e9c3.js"
import{s as i}from"./simpleCheckbox-d5402db3.js"
import{c as n}from"./collapse-6eb9215c.js"
let p
function f(e){if(c("PvP Ladder",e.children[1].children[0])){const s=r(l(e.children[1].children[2]).replace("Posted: ",""))
s>p&&(o("lastLadderReset",s),p=s)}}function h(e){return e>1}export default function(){p=e("lastLadderReset")
const c=s(t,a)
c.length>2&&(!function(e,s){d(s,i(e))}("collapseNewsArchive",c[0].rows[2]),n({prefName:"collapseNewsArchive",theTable:c[2],headInd:7,articleTest:h,extraFn:f}))}
//# sourceMappingURL=viewArchive-f1b880ae.js.map
