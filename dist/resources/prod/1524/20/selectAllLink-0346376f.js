import{C as a,bP as t,o as e,f as n,i as s,y as c,I as o,D as i,Q as b}from"./calfSystem-03970067.js"
import{c as l}from"./createSpan-3c9a32c0.js"
function r(){const a=c("backpack_tabs"),t=o("tab-selected",a)[0].getAttribute("data-type")
let e=i(`#backpackTab_${t} li:not(.hcsPaginate_hidden) .backpackItem`)
if(0===e.length)return
const n=i(`#backpackTab_${t} li:not(.hcsPaginate_hidden) .backpackCheckbox:not(:disabled)`)
n.length>0&&(e=n),e.forEach(b)}export default function(){const c=a(`#profileRightColumn a[href="${t}"]`)
if(!c)return
const o=l({className:"smallLink",textContent:"All"})
e(o,r)
const i=l({innerHTML:"[&nbsp;"})
n(i,o),s(i,"&nbsp;]&nbsp;"),n(c.parentNode,i)}
//# sourceMappingURL=selectAllLink-0346376f.js.map
