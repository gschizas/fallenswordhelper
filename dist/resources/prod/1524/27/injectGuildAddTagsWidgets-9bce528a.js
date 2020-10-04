import{y as e,bY as n,o as t,p as s,D as a,b as i,h as l,i as o,P as r,t as u,z as c,aE as m}from"./calfSystem-3bdf319e.js"
import{c as p}from"./createInput-52b88e62.js"
import"./guild-68bbf674.js"
import{g}from"./guildInventory-b3252008.js"
function f(e){return function(e){return g({subcmd2:"takeitem",guildstore_id:e})}(e)}function b(e){o(e.parentNode.nextElementSibling.nextElementSibling,'&nbsp;<span class="sendLink">Fast BP</span>')}function d(e,n){n.s&&(e.removeAttribute("style"),e.className="fshGreen",c("Taken",e))}function h(e){const{target:n}=e
var t
"Check All"===n.value&&a('#pCC input[name="tagIndex[]"]').forEach(r),"sendLink"===n.className&&(f((t=n).parentNode.previousElementSibling.previousElementSibling.children[0].value).then(u(d,t)),c("",t),t.className="guildTagSpinner",t.style.backgroundImage=`url('${m}ui/misc/spinner.gif')`)}function v(){t(s,h),a('#pCC input[name="tagIndex[]"]').forEach(b),function(){const e=p({type:"button",value:"Check All"}),n=i("form",s)
1===n.length&&l(n[0].previousElementSibling.cells[0],e)}()}function E(){e("tagging_cost")?v():n()}export default E
//# sourceMappingURL=injectGuildAddTagsWidgets-9bce528a.js.map
