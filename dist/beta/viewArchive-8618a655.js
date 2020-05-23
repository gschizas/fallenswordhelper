import{G as e,b as s,p as a,c as r,br as t,bm as c,D as l,a4 as o,_ as i}from"./calfSystem-fb94ddf0.js"
import"./isChecked-b3e3c765.js"
import{s as n}from"./simpleCheckbox-67fe70a6.js"
import{c as d}from"./collapse-5253b354.js"
let f
function p(e){if(t("PvP Ladder",e.children[1].children[0])){const s=c(l(e.children[1].children[2]).replace("Posted: ",""))
s>f&&(o("lastLadderReset",s),f=s)}}function h(e){return e>1}export default function(){f=e("lastLadderReset")
const t=s(r,a)
t.length>2&&(!function(e,s){i(s,n(e))}("collapseNewsArchive",t[0].rows[2]),d({prefName:"collapseNewsArchive",theTable:t[2],headInd:7,articleTest:h,extraFn:p}))}
//# sourceMappingURL=viewArchive-8618a655.js.map
