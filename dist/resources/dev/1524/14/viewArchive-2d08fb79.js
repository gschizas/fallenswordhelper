import{F as e,b as s,p as a,d as r,bv as t,br as c,C as d,a4 as l,_ as o}from"./calfSystem-d96a3efd.js"
import"./isChecked-028fa109.js"
import{s as i}from"./simpleCheckbox-fb9f4a06.js"
import{c as n}from"./collapse-56dd7626.js"
let f
function p(e){if(t("PvP Ladder",e.children[1].children[0])){const s=c(d(e.children[1].children[2]).replace("Posted: ",""))
s>f&&(l("lastLadderReset",s),f=s)}}function h(e){return e>1}export default function(){f=e("lastLadderReset")
const t=s(r,a)
t.length>2&&(!function(e,s){o(s,i(e))}("collapseNewsArchive",t[0].rows[2]),n({prefName:"collapseNewsArchive",theTable:t[2],headInd:7,articleTest:h,extraFn:p}))}
//# sourceMappingURL=viewArchive-2d08fb79.js.map
