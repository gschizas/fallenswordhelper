import{G as e,b as s,p as a,c as r,br as t,bm as c,D as l,a4 as o,_ as d}from"./calfSystem-99da704d.js"
import"./isChecked-f9f6f632.js"
import{s as i}from"./simpleCheckbox-6f867e75.js"
import{c as n}from"./collapse-b2d9e1e8.js"
let f
function p(e){if(t("PvP Ladder",e.children[1].children[0])){const s=c(l(e.children[1].children[2]).replace("Posted: ",""))
s>f&&(o("lastLadderReset",s),f=s)}}function h(e){return e>1}export default function(){f=e("lastLadderReset")
const t=s(r,a)
t.length>2&&(!function(e,s){d(s,i(e))}("collapseNewsArchive",t[0].rows[2]),n({prefName:"collapseNewsArchive",theTable:t[2],headInd:7,articleTest:h,extraFn:p}))}
//# sourceMappingURL=viewArchive-e1533a6e.js.map
