import{D as e,b as s,p as t,d as r,bh as a,A as c,V as o}from"./calfSystem-740ec4d2.js"
import"./isChecked-3cb537d5.js"
import{s as d}from"./simpleCheckbox-f50ed15c.js"
import"./hideElement-f48178cf.js"
import{i}from"./insertHtmlAfterEnd-85b35954.js"
import"./toggleForce-d0f18056.js"
import{p as l}from"./parseDateAsTimestamp-256bcc14.js"
import{c as n}from"./collapse-fade36d1.js"
let m,f
function p(e){if(f&&a("PvP Ladder",e.children[1].children[0])){const s=l(c(e.children[1].children[2]).replace("Posted: ",""))
s>m&&(o("lastLadderReset",s),m=s)}}function h(e){return e>1}export default function(){m=e("lastLadderReset"),f=e("trackLadderReset")
const a=s(r,t)
a.length>2&&(!function(e,s){i(s,d(e))}("collapseNewsArchive",a[0].rows[2]),n({prefName:"collapseNewsArchive",theTable:a[2],headInd:7,articleTest:h,extraFn:p}))}
//# sourceMappingURL=viewArchive-d4282e4c.js.map
