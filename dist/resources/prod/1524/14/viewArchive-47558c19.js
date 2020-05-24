import{F as e,b as s,p as a,d as t,bo as r,bj as d,C as c,a3 as o,Z as l}from"./calfSystem-d587d232.js"
import"./isChecked-75e8367b.js"
import{s as i}from"./simpleCheckbox-d7dd72e2.js"
import{c as n}from"./collapse-5da524a4.js"
let p
function f(e){if(r("PvP Ladder",e.children[1].children[0])){const s=d(c(e.children[1].children[2]).replace("Posted: ",""))
s>p&&(o("lastLadderReset",s),p=s)}}function h(e){return e>1}export default function(){p=e("lastLadderReset")
const r=s(t,a)
r.length>2&&(!function(e,s){l(s,i(e))}("collapseNewsArchive",r[0].rows[2]),n({prefName:"collapseNewsArchive",theTable:r[2],headInd:7,articleTest:h,extraFn:f}))}
//# sourceMappingURL=viewArchive-47558c19.js.map
