import{A as e,cd as n,o as t,p as a,N as s,b as i,h as c,i as l,Y as o,v as r,B as u,aF as m}from"./calfSystem-cb871cc0.js"
import{c as p}from"./createInput-91fe6fc0.js"
import{g as f}from"./guildInventory-396279c0.js"
function g(e){return function(e){return f({subcmd2:"takeitem",guildstore_id:e})}(e)}function d(e){l(e.parentNode.nextElementSibling.nextElementSibling,'&nbsp;<span class="sendLink">Fast BP</span>')}function b(e,n){n.s&&(e.removeAttribute("style"),e.className="fshGreen",u("Taken",e))}function v(e){const{target:n}=e
var t
"Check All"===n.value&&s('#pCC input[name="tagIndex[]"]').forEach(o),"sendLink"===n.className&&(g((t=n).parentNode.previousElementSibling.previousElementSibling.children[0].value).then(r(b,t)),u("",t),t.className="guildTagSpinner",t.style.backgroundImage=`url('${m}ui/misc/spinner.gif')`)}function h(){t(a,v),s('#pCC input[name="tagIndex[]"]').forEach(d),function(){const e=p({type:"button",value:"Check All"}),n=i("form",a)
1===n.length&&c(n[0].previousElementSibling.cells[0],e)}()}export default function(){e("tagging_cost")?h():n()}
//# sourceMappingURL=injectGuildAddTagsWidgets-1c93ccd1.js.map
