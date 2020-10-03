import{C as a,bW as t,o as e,h as n,i as s,y as c,J as o,D as b,Q as i}from"./calfSystem-4991bf5b.js"
import{c as l}from"./createSpan-7856b9fc.js"
function r(){const a=c("backpack_tabs"),t=o("tab-selected",a)[0].getAttribute("data-type")
let e=b(`#backpackTab_${t} li:not(.hcsPaginate_hidden) .backpackItem`)
if(0===e.length)return
const n=b(`#backpackTab_${t} li:not(.hcsPaginate_hidden) .backpackCheckbox:not(:disabled)`)
n.length>0&&(e=n),e.forEach(i)}function p(){const c=a(`#profileRightColumn a[href="${t}"]`)
if(!c)return
const o=l({className:"smallLink",textContent:"All"})
e(o,r)
const b=l({innerHTML:"[&nbsp;"})
n(b,o),s(b,"&nbsp;]&nbsp;"),n(c.parentNode,b)}export default p
//# sourceMappingURL=selectAllLink-37190205.js.map
