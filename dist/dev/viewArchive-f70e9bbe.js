import{G as e,b as s,p as a,c,bw as t,bs as r,D as l,a5 as o,$ as d}from"./calfSystem-94018cd0.js"
import"./isChecked-a7321077.js"
import{s as i}from"./simpleCheckbox-8df8914d.js"
import{c as n}from"./collapse-be2dc57c.js"
let f
function p(e){if(t("PvP Ladder",e.children[1].children[0])){const s=r(l(e.children[1].children[2]).replace("Posted: ",""))
s>f&&(o("lastLadderReset",s),f=s)}}function h(e){return e>1}export default function(){f=e("lastLadderReset")
const t=s(c,a)
t.length>2&&(!function(e,s){d(s,i(e))}("collapseNewsArchive",t[0].rows[2]),n({prefName:"collapseNewsArchive",theTable:t[2],headInd:7,articleTest:h,extraFn:p}))}
//# sourceMappingURL=viewArchive-f70e9bbe.js.map
