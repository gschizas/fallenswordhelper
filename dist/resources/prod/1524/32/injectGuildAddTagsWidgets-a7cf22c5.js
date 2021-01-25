import{y as e,bZ as n,o as t,p as a,D as s,b as i,h as l,i as o,Q as r,t as u,z as c,ai as m}from"./calfSystem-45544049.js"
import{c as p}from"./createInput-8791792e.js"
import{g}from"./guildInventory-caf8055a.js"
import"./guild-df4d675e.js"
function f(e){return function(e){return g({subcmd2:"takeitem",guildstore_id:e})}(e)}function d(e){o(e.parentNode.nextElementSibling.nextElementSibling,'&nbsp;<span class="sendLink">Fast BP</span>')}function b(e,n){n.s&&(e.removeAttribute("style"),e.className="fshGreen",c("Taken",e))}function h(e){const{target:n}=e
var t
"Check All"===n.value&&s('#pCC input[name="tagIndex[]"]').forEach(r),"sendLink"===n.className&&(f((t=n).parentNode.previousElementSibling.previousElementSibling.children[0].value).then(u(b,t)),c("",t),t.className="guildTagSpinner",t.style.backgroundImage=`url('${m}ui/misc/spinner.gif')`)}function v(){t(a,h),s('#pCC input[name="tagIndex[]"]').forEach(d),function(){const e=p({type:"button",value:"Check All"}),n=i("form",a)
1===n.length&&l(n[0].previousElementSibling.cells[0],e)}()}function k(){e("tagging_cost")?v():n()}export default k
//# sourceMappingURL=injectGuildAddTagsWidgets-a7cf22c5.js.map
