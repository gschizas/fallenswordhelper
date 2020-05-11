import{G as e,b as s,p as a,c as t,bp as r,bk as c,D as l,a4 as o,_ as d}from"./calfSystem-72fdbe97.js"
import"./isChecked-66e1d489.js"
import{s as i}from"./simpleCheckbox-c6b19142.js"
import{c as n}from"./collapse-d0669ad1.js"
let p
function f(e){if(r("PvP Ladder",e.children[1].children[0])){const s=c(l(e.children[1].children[2]).replace("Posted: ",""))
s>p&&(o("lastLadderReset",s),p=s)}}function h(e){return e>1}export default function(){p=e("lastLadderReset")
const r=s(t,a)
r.length>2&&(!function(e,s){d(s,i(e))}("collapseNewsArchive",r[0].rows[2]),n({prefName:"collapseNewsArchive",theTable:r[2],headInd:7,articleTest:h,extraFn:f}))}
//# sourceMappingURL=viewArchive-e4477bb6.js.map
