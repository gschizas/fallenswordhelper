import{G as e,b as s,p as a,c,bw as t,bs as r,D as l,a5 as o,$ as d}from"./calfSystem-fd021443.js"
import"./isChecked-fadd6c27.js"
import{s as i}from"./simpleCheckbox-3543dc2c.js"
import{c as n}from"./collapse-2a7a1e0c.js"
let f
function p(e){if(t("PvP Ladder",e.children[1].children[0])){const s=r(l(e.children[1].children[2]).replace("Posted: ",""))
s>f&&(o("lastLadderReset",s),f=s)}}function h(e){return e>1}export default function(){f=e("lastLadderReset")
const t=s(c,a)
t.length>2&&(!function(e,s){d(s,i(e))}("collapseNewsArchive",t[0].rows[2]),n({prefName:"collapseNewsArchive",theTable:t[2],headInd:7,articleTest:h,extraFn:p}))}
//# sourceMappingURL=viewArchive-1d39519f.js.map
