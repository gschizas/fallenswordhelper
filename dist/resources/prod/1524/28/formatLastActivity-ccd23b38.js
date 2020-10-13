import{S as o}from"./calfSystem-a5da5210.js"
import{o as t}from"./outputFormat-5b66d2aa.js"
function a(a){const r=function(o){let t=o,a=Math.floor(t/60)
t%=60
let r=Math.floor(a/60)
a%=60
const s=Math.floor(r/24)
return r%=24,[s,r,a,t]}(Math.abs(o-a))
return t(r[0]," days, ")+t(r[1]," hours, ")+t(r[2]," mins, ")+r[3]+" secs"}export{a as f}
//# sourceMappingURL=formatLastActivity-ccd23b38.js.map
