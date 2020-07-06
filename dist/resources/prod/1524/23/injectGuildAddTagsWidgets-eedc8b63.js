import{y as e,bY as n,o as t,p as a,D as s,b as i,h as l,i as o,Q as r,t as u,z as c,aD as m}from"./calfSystem-019de1cf.js"
import{c as p}from"./createInput-939428fe.js"
import"./guild-71ac27e9.js"
import{g as f}from"./guildInventory-4f822e74.js"
function g(e){return function(e){return f({subcmd2:"takeitem",guildstore_id:e})}(e)}function d(e){o(e.parentNode.nextElementSibling.nextElementSibling,'&nbsp;<span class="sendLink">Fast BP</span>')}function b(e,n){n.s&&(e.removeAttribute("style"),e.className="fshGreen",c("Taken",e))}function h(e){const{target:n}=e
var t
"Check All"===n.value&&s('#pCC input[name="tagIndex[]"]').forEach(r),"sendLink"===n.className&&(g((t=n).parentNode.previousElementSibling.previousElementSibling.children[0].value).then(u(b,t)),c("",t),t.className="guildTagSpinner",t.style.backgroundImage=`url('${m}ui/misc/spinner.gif')`)}function v(){t(a,h),s('#pCC input[name="tagIndex[]"]').forEach(d),function(){const e=p({type:"button",value:"Check All"}),n=i("form",a)
1===n.length&&l(n[0].previousElementSibling.cells[0],e)}()}export default function(){e("tagging_cost")?v():n()}
//# sourceMappingURL=injectGuildAddTagsWidgets-eedc8b63.js.map
