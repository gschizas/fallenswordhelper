import{x as e,c0 as n,o as t,p as s,I as a,b as i,f as l,i as o,N as r,s as c,y as u,at as m}from"./calfSystem-740ec4d2.js"
import{c as f}from"./createInput-e6e1d6b3.js"
import{g as p}from"./guildInventory-34eff095.js"
function g(e){return function(e){return p({subcmd2:"takeitem",guildstore_id:e})}(e)}function d(e){o(e.parentNode.nextElementSibling.nextElementSibling,'&nbsp;<span class="sendLink">Fast BP</span>')}function b(e,n){n.s&&(e.removeAttribute("style"),e.className="fshGreen",u("Taken",e))}function v(e){const{target:n}=e
var t
"Check All"===n.value&&a('#pCC input[name="tagIndex[]"]').forEach(r),"sendLink"===n.className&&(g((t=n).parentNode.previousElementSibling.previousElementSibling.children[0].value).then(c(b,t)),u("",t),t.className="guildTagSpinner",t.style.backgroundImage=`url('${m}ui/misc/spinner.gif')`)}function h(){t(s,v),a('#pCC input[name="tagIndex[]"]').forEach(d),function(){const e=f({type:"button",value:"Check All"}),n=i("form",s)
1===n.length&&l(n[0].previousElementSibling.cells[0],e)}()}export default function(){e("tagging_cost")?h():n()}
//# sourceMappingURL=injectGuildAddTagsWidgets-19b78488.js.map
