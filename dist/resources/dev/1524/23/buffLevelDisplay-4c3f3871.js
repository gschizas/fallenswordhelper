import{D as e,a5 as t}from"./calfSystem-9901ad27.js"
function n(e){const n=/Level: (\d+)/.exec(e.dataset.tipped)
if(!n)return
const i=n[1]
let l=e.nextElementSibling
e.nextElementSibling||(l=e.parentNode.nextElementSibling),t(l,`<b>(${i})</b><br>`)}export default function(){e('#profileRightColumn img[src*="/skills/"]').forEach(n)}
//# sourceMappingURL=buffLevelDisplay-4c3f3871.js.map
