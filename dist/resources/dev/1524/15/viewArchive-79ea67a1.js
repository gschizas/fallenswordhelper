import{D as e,b as s,p as a,d as t,bp as r,A as o,W as c}from"./calfSystem-ee582533.js"
import"./isChecked-21b2756d.js"
import{s as i}from"./simpleCheckbox-eb1aed29.js"
import"./hideElement-faecef36.js"
import{i as d}from"./insertHtmlAfterEnd-4dbaaf09.js"
import"./toggleForce-3b831976.js"
import{p as l}from"./parseDateAsTimestamp-aa2b0443.js"
import{c as n}from"./collapse-1e937cc2.js"
let m,p
function f(e){if(p&&r("PvP Ladder",e.children[1].children[0])){const s=l(o(e.children[1].children[2]).replace("Posted: ",""))
s>m&&(c("lastLadderReset",s),m=s)}}function h(e){return e>1}export default function(){m=e("lastLadderReset"),p=e("trackLadderReset")
const r=s(t,a)
r.length>2&&(!function(e,s){d(s,i(e))}("collapseNewsArchive",r[0].rows[2]),n({prefName:"collapseNewsArchive",theTable:r[2],headInd:7,articleTest:h,extraFn:f}))}
//# sourceMappingURL=viewArchive-79ea67a1.js.map
