import{y as n,c3 as e,o as t,p as a,D as s,b as i,h as l,i as o,Q as r,t as c,z as u,aH as m}from"./calfSystem-69dd5601.js"
import{c as p}from"./createInput-31301338.js"
import"./guild-bc028c80.js"
import{g}from"./guildInventory-00a31f38.js"
function f(n){return function(n){return g({subcmd2:"takeitem",guildstore_id:n})}(n)}function d(n){o(n.parentNode.nextElementSibling.nextElementSibling,'&nbsp;<span class="sendLink">Fast BP</span>')}function b(n,e){e.s&&(n.removeAttribute("style"),n.className="fshGreen",u("Taken",n))}function h(n){const{target:e}=n
var t
"Check All"===e.value&&s('#pCC input[name="tagIndex[]"]').forEach(r),"sendLink"===e.className&&(f((t=e).parentNode.previousElementSibling.previousElementSibling.children[0].value).then(c(b,t)),u("",t),t.className="guildTagSpinner",t.style.backgroundImage=`url('${m}ui/misc/spinner.gif')`)}function v(){t(a,h),s('#pCC input[name="tagIndex[]"]').forEach(d),function(){const n=p({type:"button",value:"Check All"}),e=i("form",a)
1===e.length&&l(e[0].previousElementSibling.cells[0],n)}()}function k(){n("tagging_cost")?v():e()}export default k
//# sourceMappingURL=injectGuildAddTagsWidgets-a168035d.js.map
