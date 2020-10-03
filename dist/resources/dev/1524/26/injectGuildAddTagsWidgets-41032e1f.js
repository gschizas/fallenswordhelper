import{y as e,c3 as n,o as t,p as s,D as a,b as i,h as l,i as o,Q as r,t as u,z as c,aH as m}from"./calfSystem-4991bf5b.js"
import{c as p}from"./createInput-befbd592.js"
import"./guild-b6f6e040.js"
import{g as f}from"./guildInventory-5217c01d.js"
function g(e){return function(e){return f({subcmd2:"takeitem",guildstore_id:e})}(e)}function d(e){o(e.parentNode.nextElementSibling.nextElementSibling,'&nbsp;<span class="sendLink">Fast BP</span>')}function b(e,n){n.s&&(e.removeAttribute("style"),e.className="fshGreen",c("Taken",e))}function h(e){const{target:n}=e
var t
"Check All"===n.value&&a('#pCC input[name="tagIndex[]"]').forEach(r),"sendLink"===n.className&&(g((t=n).parentNode.previousElementSibling.previousElementSibling.children[0].value).then(u(b,t)),c("",t),t.className="guildTagSpinner",t.style.backgroundImage=`url('${m}ui/misc/spinner.gif')`)}function v(){t(s,h),a('#pCC input[name="tagIndex[]"]').forEach(d),function(){const e=p({type:"button",value:"Check All"}),n=i("form",s)
1===n.length&&l(n[0].previousElementSibling.cells[0],e)}()}function k(){e("tagging_cost")?v():n()}export default k
//# sourceMappingURL=injectGuildAddTagsWidgets-41032e1f.js.map
