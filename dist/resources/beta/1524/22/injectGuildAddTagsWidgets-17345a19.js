import{y as n,c1 as e,o as t,p as a,D as s,b as i,h as l,i as o,Q as r,t as u,z as c,aD as f}from"./calfSystem-1b876afa.js"
import{c as m}from"./createInput-2c55af64.js"
import"./guild-f2f2bff5.js"
import{g as p}from"./guildInventory-fdb60bd9.js"
function g(n){return function(n){return p({subcmd2:"takeitem",guildstore_id:n})}(n)}function d(n){o(n.parentNode.nextElementSibling.nextElementSibling,'&nbsp;<span class="sendLink">Fast BP</span>')}function b(n,e){e.s&&(n.removeAttribute("style"),n.className="fshGreen",c("Taken",n))}function h(n){const{target:e}=n
var t
"Check All"===e.value&&s('#pCC input[name="tagIndex[]"]').forEach(r),"sendLink"===e.className&&(g((t=e).parentNode.previousElementSibling.previousElementSibling.children[0].value).then(u(b,t)),c("",t),t.className="guildTagSpinner",t.style.backgroundImage=`url('${f}ui/misc/spinner.gif')`)}function v(){t(a,h),s('#pCC input[name="tagIndex[]"]').forEach(d),function(){const n=m({type:"button",value:"Check All"}),e=i("form",a)
1===e.length&&l(e[0].previousElementSibling.cells[0],n)}()}export default function(){n("tagging_cost")?v():e()}
//# sourceMappingURL=injectGuildAddTagsWidgets-17345a19.js.map
