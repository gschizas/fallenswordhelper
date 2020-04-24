import{G as e,b as s,p as c,c as a,bp as t,bk as r,D as l,a4 as o,_ as i}from"./calfSystem-cb871cc0.js"
import"./isChecked-0ef3785c.js"
import{s as n}from"./simpleCheckbox-8c37c36e.js"
import{c as d}from"./collapse-42eecf11.js"
let f
function p(e){if(t("PvP Ladder",e.children[1].children[0])){const s=r(l(e.children[1].children[2]).replace("Posted: ",""))
s>f&&(o("lastLadderReset",s),f=s)}}function h(e){return e>1}export default function(){f=e("lastLadderReset")
const t=s(a,c)
t.length>2&&(!function(e,s){i(s,n(e))}("collapseNewsArchive",t[0].rows[2]),d({prefName:"collapseNewsArchive",theTable:t[2],headInd:7,articleTest:h,extraFn:p}))}
//# sourceMappingURL=viewArchive-2fe66d58.js.map
