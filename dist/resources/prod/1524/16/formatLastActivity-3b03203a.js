import{Q as o}from"./calfSystem-be09bdff.js"
import{o as t}from"./outputFormat-2f9f2a37.js"
function r(r){const s=function(o){let t=o,r=Math.floor(t/60)
t%=60
let s=Math.floor(r/60)
r%=60
const f=Math.floor(s/24)
return s%=24,[f,s,r,t]}(Math.abs(o-r))
return t(s[0]," days, ")+t(s[1]," hours, ")+t(s[2]," mins, ")+s[3]+" secs"}export{r as f}
//# sourceMappingURL=formatLastActivity-3b03203a.js.map
