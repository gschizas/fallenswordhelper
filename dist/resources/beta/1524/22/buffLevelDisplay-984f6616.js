import{D as e,a7 as t}from"./calfSystem-1b876afa.js"
function n(e){const n=/Level: (\d+)/.exec(e.dataset.tipped)
if(!n)return
const i=n[1]
let l=e.nextElementSibling
e.nextElementSibling||(l=e.parentNode.nextElementSibling),t(l,`<b>(${i})</b><br>`)}export default function(){e('#profileRightColumn img[src*="/skills/"]').forEach(n)}
//# sourceMappingURL=buffLevelDisplay-984f6616.js.map
