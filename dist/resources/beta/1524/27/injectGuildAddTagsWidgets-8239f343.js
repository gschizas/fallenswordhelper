import{y as e,c1 as n,o as t,p as a,D as s,b as i,h as l,i as o,P as r,t as c,z as u,aE as m}from"./calfSystem-70c7a660.js"
import{c as p}from"./createInput-1c8df108.js"
import"./guild-4439d23d.js"
import{g}from"./guildInventory-91c8a39e.js"
function f(e){return function(e){return g({subcmd2:"takeitem",guildstore_id:e})}(e)}function d(e){o(e.parentNode.nextElementSibling.nextElementSibling,'&nbsp;<span class="sendLink">Fast BP</span>')}function b(e,n){n.s&&(e.removeAttribute("style"),e.className="fshGreen",u("Taken",e))}function h(e){const{target:n}=e
var t
"Check All"===n.value&&s('#pCC input[name="tagIndex[]"]').forEach(r),"sendLink"===n.className&&(f((t=n).parentNode.previousElementSibling.previousElementSibling.children[0].value).then(c(b,t)),u("",t),t.className="guildTagSpinner",t.style.backgroundImage=`url('${m}ui/misc/spinner.gif')`)}function v(){t(a,h),s('#pCC input[name="tagIndex[]"]').forEach(d),function(){const e=p({type:"button",value:"Check All"}),n=i("form",a)
1===n.length&&l(n[0].previousElementSibling.cells[0],e)}()}function E(){e("tagging_cost")?v():n()}export default E
//# sourceMappingURL=injectGuildAddTagsWidgets-8239f343.js.map
