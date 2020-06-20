import{C as a,bQ as t,o as e,h as n,i as s,y as c,I as o,D as i,Q as b}from"./calfSystem-2741d97b.js"
import{c as l}from"./createSpan-b0f81047.js"
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
//# sourceMappingURL=selectAllLink-21a82298.js.map
