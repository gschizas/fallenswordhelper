import{G as e,b as s,p as a,c as t,bp as c,bk as r,D as l,a4 as o,_ as i}from"./calfSystem-4f7c0235.js"
import"./isChecked-792dad25.js"
import{s as n}from"./simpleCheckbox-7843c1e5.js"
import{c as d}from"./collapse-93566602.js"
let p
function f(e){if(c("PvP Ladder",e.children[1].children[0])){const s=r(l(e.children[1].children[2]).replace("Posted: ",""))
s>p&&(o("lastLadderReset",s),p=s)}}function h(e){return e>1}export default function(){p=e("lastLadderReset")
const c=s(t,a)
c.length>2&&(!function(e,s){i(s,n(e))}("collapseNewsArchive",c[0].rows[2]),d({prefName:"collapseNewsArchive",theTable:c[2],headInd:7,articleTest:h,extraFn:f}))}
//# sourceMappingURL=viewArchive-9a251fd5.js.map
