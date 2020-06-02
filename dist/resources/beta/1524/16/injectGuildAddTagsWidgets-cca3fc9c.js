import{x as e,c1 as n,o as t,p as a,I as s,b as i,f as l,i as o,O as r,s as c,y as u,aB as m}from"./calfSystem-9554b525.js"
import{c as f}from"./createInput-73435eda.js"
import"./guild-8fdef2fb.js"
import{g as p}from"./guildInventory-a207acdc.js"
function g(e){return function(e){return p({subcmd2:"takeitem",guildstore_id:e})}(e)}function d(e){o(e.parentNode.nextElementSibling.nextElementSibling,'&nbsp;<span class="sendLink">Fast BP</span>')}function b(e,n){n.s&&(e.removeAttribute("style"),e.className="fshGreen",u("Taken",e))}function v(e){const{target:n}=e
var t
"Check All"===n.value&&s('#pCC input[name="tagIndex[]"]').forEach(r),"sendLink"===n.className&&(g((t=n).parentNode.previousElementSibling.previousElementSibling.children[0].value).then(c(b,t)),u("",t),t.className="guildTagSpinner",t.style.backgroundImage=`url('${m}ui/misc/spinner.gif')`)}function h(){t(a,v),s('#pCC input[name="tagIndex[]"]').forEach(d),function(){const e=f({type:"button",value:"Check All"}),n=i("form",a)
1===n.length&&l(n[0].previousElementSibling.cells[0],e)}()}export default function(){e("tagging_cost")?h():n()}
//# sourceMappingURL=injectGuildAddTagsWidgets-cca3fc9c.js.map
