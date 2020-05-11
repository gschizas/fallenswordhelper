import{A as e,cd as n,o as t,p as a,N as s,b as i,h as l,i as o,Y as r,v as u,B as c,aF as m}from"./calfSystem-72fdbe97.js"
import{c as p}from"./createInput-00d19dd2.js"
import{g}from"./guildInventory-22421163.js"
function d(e){return function(e){return g({subcmd2:"takeitem",guildstore_id:e})}(e)}function f(e){o(e.parentNode.nextElementSibling.nextElementSibling,'&nbsp;<span class="sendLink">Fast BP</span>')}function b(e,n){n.s&&(e.removeAttribute("style"),e.className="fshGreen",c("Taken",e))}function v(e){const{target:n}=e
var t
"Check All"===n.value&&s('#pCC input[name="tagIndex[]"]').forEach(r),"sendLink"===n.className&&(d((t=n).parentNode.previousElementSibling.previousElementSibling.children[0].value).then(u(b,t)),c("",t),t.className="guildTagSpinner",t.style.backgroundImage=`url('${m}ui/misc/spinner.gif')`)}function h(){t(a,v),s('#pCC input[name="tagIndex[]"]').forEach(f),function(){const e=p({type:"button",value:"Check All"}),n=i("form",a)
1===n.length&&l(n[0].previousElementSibling.cells[0],e)}()}export default function(){e("tagging_cost")?h():n()}
//# sourceMappingURL=injectGuildAddTagsWidgets-1033bd89.js.map
