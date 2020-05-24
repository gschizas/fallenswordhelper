import{z as n,ch as e,o as t,p as a,M as s,b as i,f as l,i as o,X as r,u as c,A as u,aE as m}from"./calfSystem-371c414c.js"
import{c as p}from"./createInput-d378f9d2.js"
import{g as f}from"./guildInventory-7d78580c.js"
function g(n){return function(n){return f({subcmd2:"takeitem",guildstore_id:n})}(n)}function d(n){o(n.parentNode.nextElementSibling.nextElementSibling,'&nbsp;<span class="sendLink">Fast BP</span>')}function b(n,e){e.s&&(n.removeAttribute("style"),n.className="fshGreen",u("Taken",n))}function h(n){const{target:e}=n
var t
"Check All"===e.value&&s('#pCC input[name="tagIndex[]"]').forEach(r),"sendLink"===e.className&&(g((t=e).parentNode.previousElementSibling.previousElementSibling.children[0].value).then(c(b,t)),u("",t),t.className="guildTagSpinner",t.style.backgroundImage=`url('${m}ui/misc/spinner.gif')`)}function v(){t(a,h),s('#pCC input[name="tagIndex[]"]').forEach(d),function(){const n=p({type:"button",value:"Check All"}),e=i("form",a)
1===e.length&&l(e[0].previousElementSibling.cells[0],n)}()}export default function(){n("tagging_cost")?v():e()}
//# sourceMappingURL=injectGuildAddTagsWidgets-ee6c9a9a.js.map
