import{c as a}from"./createAnchor-7e36362f.js"
import{y as t,h as e,o as r,bF as s,a9 as o,ao as n,bO as f,bP as i,a7 as m}from"./calfSystem-45544049.js"
import{i as c}from"./insertElementAfterBegin-ddd00fbd.js"
import"./insertElementBefore-aa28f497.js"
function p(a){a.stopPropagation()}function d(s,o){const n=t(`statbar-${o}`)
if(!n)return
const f=a({href:s}),i=n.parentNode
e(f,n),c(i,f),r(f,p,!0)}function b(){d(s,"character"),d(`${o+n}reserve`,"stamina"),d(f,"equipment"),d(i,"inventory"),d(o,"fsp"),d(`${m}bank`,"gold")}export default b
//# sourceMappingURL=statBar-4255083b.js.map
