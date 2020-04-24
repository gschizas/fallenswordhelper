import{G as e,b as s,p as a,c,br as r,bm as t,D as l,a4 as o,_ as d}from"./calfSystem-07c25a1c.js"
import"./isChecked-7fc8132c.js"
import{s as i}from"./simpleCheckbox-754ddbda.js"
import{c as n}from"./collapse-3ebb0cce.js"
let f
function p(e){if(r("PvP Ladder",e.children[1].children[0])){const s=t(l(e.children[1].children[2]).replace("Posted: ",""))
s>f&&(o("lastLadderReset",s),f=s)}}function h(e){return e>1}export default function(){f=e("lastLadderReset")
const r=s(c,a)
r.length>2&&(!function(e,s){d(s,i(e))}("collapseNewsArchive",r[0].rows[2]),n({prefName:"collapseNewsArchive",theTable:r[2],headInd:7,articleTest:h,extraFn:p}))}
//# sourceMappingURL=viewArchive-a0053c48.js.map
