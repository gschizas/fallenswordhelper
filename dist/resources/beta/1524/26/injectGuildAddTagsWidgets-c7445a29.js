import{y as n,c1 as e,o as t,p as a,D as s,b as i,h as l,i as c,P as o,t as r,z as u,aD as m}from"./calfSystem-cf4d22a7.js"
import{c as p}from"./createInput-6dbf94aa.js"
import"./guild-740bccac.js"
import{g}from"./guildInventory-a39bbc32.js"
function f(n){return function(n){return g({subcmd2:"takeitem",guildstore_id:n})}(n)}function d(n){c(n.parentNode.nextElementSibling.nextElementSibling,'&nbsp;<span class="sendLink">Fast BP</span>')}function b(n,e){e.s&&(n.removeAttribute("style"),n.className="fshGreen",u("Taken",n))}function h(n){const{target:e}=n
var t
"Check All"===e.value&&s('#pCC input[name="tagIndex[]"]').forEach(o),"sendLink"===e.className&&(f((t=e).parentNode.previousElementSibling.previousElementSibling.children[0].value).then(r(b,t)),u("",t),t.className="guildTagSpinner",t.style.backgroundImage=`url('${m}ui/misc/spinner.gif')`)}function v(){t(a,h),s('#pCC input[name="tagIndex[]"]').forEach(d),function(){const n=p({type:"button",value:"Check All"}),e=i("form",a)
1===e.length&&l(e[0].previousElementSibling.cells[0],n)}()}function k(){n("tagging_cost")?v():e()}export default k
//# sourceMappingURL=injectGuildAddTagsWidgets-c7445a29.js.map
