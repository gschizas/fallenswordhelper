import{x as e,bY as n,o as t,p as s,I as a,b as i,f as l,i as o,O as r,s as c,y as u,aB as m}from"./calfSystem-dec5e071.js"
import{c as p}from"./createInput-6f4c3b04.js"
import"./guild-3a4d4022.js"
import{g}from"./guildInventory-4312cd62.js"
function f(e){return function(e){return g({subcmd2:"takeitem",guildstore_id:e})}(e)}function d(e){o(e.parentNode.nextElementSibling.nextElementSibling,'&nbsp;<span class="sendLink">Fast BP</span>')}function b(e,n){n.s&&(e.removeAttribute("style"),e.className="fshGreen",u("Taken",e))}function v(e){const{target:n}=e
var t
"Check All"===n.value&&a('#pCC input[name="tagIndex[]"]').forEach(r),"sendLink"===n.className&&(f((t=n).parentNode.previousElementSibling.previousElementSibling.children[0].value).then(c(b,t)),u("",t),t.className="guildTagSpinner",t.style.backgroundImage=`url('${m}ui/misc/spinner.gif')`)}function h(){t(s,v),a('#pCC input[name="tagIndex[]"]').forEach(d),function(){const e=p({type:"button",value:"Check All"}),n=i("form",s)
1===n.length&&l(n[0].previousElementSibling.cells[0],e)}()}export default function(){e("tagging_cost")?h():n()}
//# sourceMappingURL=injectGuildAddTagsWidgets-c88eff66.js.map
