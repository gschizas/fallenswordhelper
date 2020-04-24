import{A as n,cm as e,o as t,p as a,N as s,b as i,h as l,i as o,Z as r,v as c,B as u,aI as m}from"./calfSystem-9b1fa4ca.js"
import{c as p}from"./createInput-097870f4.js"
import{g as f}from"./guildInventory-5702bd9c.js"
function g(n){return function(n){return f({subcmd2:"takeitem",guildstore_id:n})}(n)}function d(n){o(n.parentNode.nextElementSibling.nextElementSibling,'&nbsp;<span class="sendLink">Fast BP</span>')}function b(n,e){e.s&&(n.removeAttribute("style"),n.className="fshGreen",u("Taken",n))}function v(n){const{target:e}=n
var t
"Check All"===e.value&&s('#pCC input[name="tagIndex[]"]').forEach(r),"sendLink"===e.className&&(g((t=e).parentNode.previousElementSibling.previousElementSibling.children[0].value).then(c(b,t)),u("",t),t.className="guildTagSpinner",t.style.backgroundImage=`url('${m}ui/misc/spinner.gif')`)}function h(){t(a,v),s('#pCC input[name="tagIndex[]"]').forEach(d),function(){const n=p({type:"button",value:"Check All"}),e=i("form",a)
1===e.length&&l(e[0].previousElementSibling.cells[0],n)}()}export default function(){n("tagging_cost")?h():e()}
//# sourceMappingURL=injectGuildAddTagsWidgets-e833157e.js.map
