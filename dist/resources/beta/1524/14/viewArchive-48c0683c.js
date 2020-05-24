import{F as e,b as s,p as a,d as c,bq as t,bl as r,C as l,a3 as o,Z as i}from"./calfSystem-371c414c.js"
import"./isChecked-b460a43d.js"
import{s as n}from"./simpleCheckbox-5ce6e544.js"
import{c as d}from"./collapse-aa6bec4b.js"
let p
function f(e){if(t("PvP Ladder",e.children[1].children[0])){const s=r(l(e.children[1].children[2]).replace("Posted: ",""))
s>p&&(o("lastLadderReset",s),p=s)}}function h(e){return e>1}export default function(){p=e("lastLadderReset")
const t=s(c,a)
t.length>2&&(!function(e,s){i(s,n(e))}("collapseNewsArchive",t[0].rows[2]),d({prefName:"collapseNewsArchive",theTable:t[2],headInd:7,articleTest:h,extraFn:f}))}
//# sourceMappingURL=viewArchive-48c0683c.js.map
