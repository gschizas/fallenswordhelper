import{D as e,b as s,p as t,d as r,bj as a,A as o,V as c}from"./calfSystem-1262535f.js"
import"./isChecked-d8a3d688.js"
import{s as d}from"./simpleCheckbox-69fdc6eb.js"
import"./hideElement-405c1665.js"
import{i}from"./insertHtmlAfterEnd-2dcd57ed.js"
import"./toggleForce-04e33300.js"
import{p as l}from"./parseDateAsTimestamp-53cf8e3f.js"
import{c as n}from"./collapse-57770361.js"
let m,p
function f(e){if(p&&a("PvP Ladder",e.children[1].children[0])){const s=l(o(e.children[1].children[2]).replace("Posted: ",""))
s>m&&(c("lastLadderReset",s),m=s)}}function h(e){return e>1}export default function(){m=e("lastLadderReset"),p=e("trackLadderReset")
const a=s(r,t)
a.length>2&&(!function(e,s){i(s,d(e))}("collapseNewsArchive",a[0].rows[2]),n({prefName:"collapseNewsArchive",theTable:a[2],headInd:7,articleTest:h,extraFn:f}))}
//# sourceMappingURL=viewArchive-1debd1af.js.map
