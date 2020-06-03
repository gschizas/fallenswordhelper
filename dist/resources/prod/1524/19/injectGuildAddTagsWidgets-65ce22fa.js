import{x as e,bZ as n,o as t,p as a,I as s,b as i,f as l,i as o,O as r,s as c,y as u,aB as m}from"./calfSystem-6fc0cc1b.js"
import{c as p}from"./createInput-75e5aa25.js"
import"./guild-6c498bb2.js"
import{g as f}from"./guildInventory-7a40421f.js"
function g(e){return function(e){return f({subcmd2:"takeitem",guildstore_id:e})}(e)}function b(e){o(e.parentNode.nextElementSibling.nextElementSibling,'&nbsp;<span class="sendLink">Fast BP</span>')}function d(e,n){n.s&&(e.removeAttribute("style"),e.className="fshGreen",u("Taken",e))}function v(e){const{target:n}=e
var t
"Check All"===n.value&&s('#pCC input[name="tagIndex[]"]').forEach(r),"sendLink"===n.className&&(g((t=n).parentNode.previousElementSibling.previousElementSibling.children[0].value).then(c(d,t)),u("",t),t.className="guildTagSpinner",t.style.backgroundImage=`url('${m}ui/misc/spinner.gif')`)}function h(){t(a,v),s('#pCC input[name="tagIndex[]"]').forEach(b),function(){const e=p({type:"button",value:"Check All"}),n=i("form",a)
1===n.length&&l(n[0].previousElementSibling.cells[0],e)}()}export default function(){e("tagging_cost")?h():n()}
//# sourceMappingURL=injectGuildAddTagsWidgets-65ce22fa.js.map
