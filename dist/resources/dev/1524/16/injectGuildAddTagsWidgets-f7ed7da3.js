import{x as e,c3 as n,o as t,p as s,I as a,b as i,f as l,i as o,P as r,s as u,y as c,aG as m}from"./calfSystem-d49dbbd3.js"
import{c as p}from"./createInput-1699d448.js"
import"./guild-5830ca1d.js"
import{g}from"./guildInventory-62e85e9b.js"
function d(e){return function(e){return g({subcmd2:"takeitem",guildstore_id:e})}(e)}function f(e){o(e.parentNode.nextElementSibling.nextElementSibling,'&nbsp;<span class="sendLink">Fast BP</span>')}function b(e,n){n.s&&(e.removeAttribute("style"),e.className="fshGreen",c("Taken",e))}function v(e){const{target:n}=e
var t
"Check All"===n.value&&a('#pCC input[name="tagIndex[]"]').forEach(r),"sendLink"===n.className&&(d((t=n).parentNode.previousElementSibling.previousElementSibling.children[0].value).then(u(b,t)),c("",t),t.className="guildTagSpinner",t.style.backgroundImage=`url('${m}ui/misc/spinner.gif')`)}function h(){t(s,v),a('#pCC input[name="tagIndex[]"]').forEach(f),function(){const e=p({type:"button",value:"Check All"}),n=i("form",s)
1===n.length&&l(n[0].previousElementSibling.cells[0],e)}()}export default function(){e("tagging_cost")?h():n()}
//# sourceMappingURL=injectGuildAddTagsWidgets-f7ed7da3.js.map
