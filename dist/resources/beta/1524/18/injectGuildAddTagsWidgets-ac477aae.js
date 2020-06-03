import{x as n,c1 as e,o as t,p as s,I as a,b as i,f as c,i as l,O as o,s as r,y as u,aB as m}from"./calfSystem-4197cc22.js"
import{c as p}from"./createInput-c03bcf66.js"
import"./guild-0ca0875d.js"
import{g as f}from"./guildInventory-c623f6c9.js"
function g(n){return function(n){return f({subcmd2:"takeitem",guildstore_id:n})}(n)}function d(n){l(n.parentNode.nextElementSibling.nextElementSibling,'&nbsp;<span class="sendLink">Fast BP</span>')}function b(n,e){e.s&&(n.removeAttribute("style"),n.className="fshGreen",u("Taken",n))}function v(n){const{target:e}=n
var t
"Check All"===e.value&&a('#pCC input[name="tagIndex[]"]').forEach(o),"sendLink"===e.className&&(g((t=e).parentNode.previousElementSibling.previousElementSibling.children[0].value).then(r(b,t)),u("",t),t.className="guildTagSpinner",t.style.backgroundImage=`url('${m}ui/misc/spinner.gif')`)}function h(){t(s,v),a('#pCC input[name="tagIndex[]"]').forEach(d),function(){const n=p({type:"button",value:"Check All"}),e=i("form",s)
1===e.length&&c(e[0].previousElementSibling.cells[0],n)}()}export default function(){n("tagging_cost")?h():e()}
//# sourceMappingURL=injectGuildAddTagsWidgets-ac477aae.js.map
