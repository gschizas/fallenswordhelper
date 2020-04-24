import{A as n,cn as e,o as t,p as a,N as s,b as i,h as l,i as c,Z as o,v as r,B as u,aI as m}from"./calfSystem-94018cd0.js"
import{c as f}from"./createInput-cfb8faf0.js"
import{g as p}from"./guildInventory-b06d0ccd.js"
function g(n){return function(n){return p({subcmd2:"takeitem",guildstore_id:n})}(n)}function d(n){c(n.parentNode.nextElementSibling.nextElementSibling,'&nbsp;<span class="sendLink">Fast BP</span>')}function b(n,e){e.s&&(n.removeAttribute("style"),n.className="fshGreen",u("Taken",n))}function v(n){const{target:e}=n
var t
"Check All"===e.value&&s('#pCC input[name="tagIndex[]"]').forEach(o),"sendLink"===e.className&&(g((t=e).parentNode.previousElementSibling.previousElementSibling.children[0].value).then(r(b,t)),u("",t),t.className="guildTagSpinner",t.style.backgroundImage=`url('${m}ui/misc/spinner.gif')`)}function h(){t(a,v),s('#pCC input[name="tagIndex[]"]').forEach(d),function(){const n=f({type:"button",value:"Check All"}),e=i("form",a)
1===e.length&&l(e[0].previousElementSibling.cells[0],n)}()}export default function(){n("tagging_cost")?h():e()}
//# sourceMappingURL=injectGuildAddTagsWidgets-df4962cc.js.map
