import{G as e,b as s,p as a,c,bw as t,bs as r,D as l,a5 as o,$ as i}from"./calfSystem-9b1fa4ca.js"
import"./isChecked-c7d79538.js"
import{s as n}from"./simpleCheckbox-8c7c7b00.js"
import{c as d}from"./collapse-d7ae2840.js"
let f
function p(e){if(t("PvP Ladder",e.children[1].children[0])){const s=r(l(e.children[1].children[2]).replace("Posted: ",""))
s>f&&(o("lastLadderReset",s),f=s)}}function h(e){return e>1}export default function(){f=e("lastLadderReset")
const t=s(c,a)
t.length>2&&(!function(e,s){i(s,n(e))}("collapseNewsArchive",t[0].rows[2]),d({prefName:"collapseNewsArchive",theTable:t[2],headInd:7,articleTest:h,extraFn:p}))}
//# sourceMappingURL=viewArchive-9a314888.js.map
