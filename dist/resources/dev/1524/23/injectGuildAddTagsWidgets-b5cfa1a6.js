import{y as n,c3 as e,o as t,p as a,D as s,b as i,h as l,i as o,R as r,t as u,z as c,aH as m}from"./calfSystem-9901ad27.js"
import{c as p}from"./createInput-49d3d974.js"
import"./guild-1d87405d.js"
import{g}from"./guildInventory-14f039c1.js"
function d(n){return function(n){return g({subcmd2:"takeitem",guildstore_id:n})}(n)}function f(n){o(n.parentNode.nextElementSibling.nextElementSibling,'&nbsp;<span class="sendLink">Fast BP</span>')}function b(n,e){e.s&&(n.removeAttribute("style"),n.className="fshGreen",c("Taken",n))}function h(n){const{target:e}=n
var t
"Check All"===e.value&&s('#pCC input[name="tagIndex[]"]').forEach(r),"sendLink"===e.className&&(d((t=e).parentNode.previousElementSibling.previousElementSibling.children[0].value).then(u(b,t)),c("",t),t.className="guildTagSpinner",t.style.backgroundImage=`url('${m}ui/misc/spinner.gif')`)}function v(){t(a,h),s('#pCC input[name="tagIndex[]"]').forEach(f),function(){const n=p({type:"button",value:"Check All"}),e=i("form",a)
1===e.length&&l(e[0].previousElementSibling.cells[0],n)}()}export default function(){n("tagging_cost")?v():e()}
//# sourceMappingURL=injectGuildAddTagsWidgets-b5cfa1a6.js.map
