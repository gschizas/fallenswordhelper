import{G as e,b as s,p as a,c,bp as t,bk as r,D as l,a4 as o,_ as i}from"./calfSystem-4b4fbec4.js"
import"./isChecked-cda69a32.js"
import{s as n}from"./simpleCheckbox-8c161088.js"
import{c as d}from"./collapse-b0e92fb4.js"
let f
function p(e){if(t("PvP Ladder",e.children[1].children[0])){const s=r(l(e.children[1].children[2]).replace("Posted: ",""))
s>f&&(o("lastLadderReset",s),f=s)}}function h(e){return e>1}export default function(){f=e("lastLadderReset")
const t=s(c,a)
t.length>2&&(!function(e,s){i(s,n(e))}("collapseNewsArchive",t[0].rows[2]),d({prefName:"collapseNewsArchive",theTable:t[2],headInd:7,articleTest:h,extraFn:p}))}
//# sourceMappingURL=viewArchive-6afbd3c4.js.map
