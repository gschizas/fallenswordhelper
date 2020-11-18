import{y as e,bX as n,o as t,p as a,D as s,b as i,h as l,i as c,P as o,t as r,z as u,aD as m}from"./calfSystem-57628ebe.js"
import{c as p}from"./createInput-b0ce969c.js"
import"./guild-089c237a.js"
import{g}from"./guildInventory-9c9cdc43.js"
function f(e){return function(e){return g({subcmd2:"takeitem",guildstore_id:e})}(e)}function d(e){c(e.parentNode.nextElementSibling.nextElementSibling,'&nbsp;<span class="sendLink">Fast BP</span>')}function b(e,n){n.s&&(e.removeAttribute("style"),e.className="fshGreen",u("Taken",e))}function h(e){const{target:n}=e
var t
"Check All"===n.value&&s('#pCC input[name="tagIndex[]"]').forEach(o),"sendLink"===n.className&&(f((t=n).parentNode.previousElementSibling.previousElementSibling.children[0].value).then(r(b,t)),u("",t),t.className="guildTagSpinner",t.style.backgroundImage=`url('${m}ui/misc/spinner.gif')`)}function v(){t(a,h),s('#pCC input[name="tagIndex[]"]').forEach(d),function(){const e=p({type:"button",value:"Check All"}),n=i("form",a)
1===n.length&&l(n[0].previousElementSibling.cells[0],e)}()}function k(){e("tagging_cost")?v():n()}export default k
//# sourceMappingURL=injectGuildAddTagsWidgets-36ee40ef.js.map
