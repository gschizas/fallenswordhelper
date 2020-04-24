import{G as e,b as s,p as a,c,br as r,bm as t,D as d,a4 as l,_ as o}from"./calfSystem-c91e004c.js"
import"./isChecked-ba1d4cd2.js"
import{s as i}from"./simpleCheckbox-0fc09da7.js"
import{c as n}from"./collapse-d49bcfdf.js"
let f
function p(e){if(r("PvP Ladder",e.children[1].children[0])){const s=t(d(e.children[1].children[2]).replace("Posted: ",""))
s>f&&(l("lastLadderReset",s),f=s)}}function h(e){return e>1}export default function(){f=e("lastLadderReset")
const r=s(c,a)
r.length>2&&(!function(e,s){o(s,i(e))}("collapseNewsArchive",r[0].rows[2]),n({prefName:"collapseNewsArchive",theTable:r[2],headInd:7,articleTest:h,extraFn:p}))}
//# sourceMappingURL=viewArchive-f17d93b0.js.map
