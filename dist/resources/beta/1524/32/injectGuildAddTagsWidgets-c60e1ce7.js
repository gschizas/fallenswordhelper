import{y as e,c0 as n,o as t,p as s,D as a,b as i,h as l,i as o,Q as r,t as c,z as u,ak as m}from"./calfSystem-26bcf570.js"
import{c as p}from"./createInput-538cc410.js"
import{g}from"./guildInventory-240e4647.js"
import"./guild-611eec4f.js"
function f(e){return function(e){return g({subcmd2:"takeitem",guildstore_id:e})}(e)}function d(e){o(e.parentNode.nextElementSibling.nextElementSibling,'&nbsp;<span class="sendLink">Fast BP</span>')}function b(e,n){n.s&&(e.removeAttribute("style"),e.className="fshGreen",u("Taken",e))}function h(e){const{target:n}=e
var t
"Check All"===n.value&&a('#pCC input[name="tagIndex[]"]').forEach(r),"sendLink"===n.className&&(f((t=n).parentNode.previousElementSibling.previousElementSibling.children[0].value).then(c(b,t)),u("",t),t.className="guildTagSpinner",t.style.backgroundImage=`url('${m}ui/misc/spinner.gif')`)}function v(){t(s,h),a('#pCC input[name="tagIndex[]"]').forEach(d),function(){const e=p({type:"button",value:"Check All"}),n=i("form",s)
1===n.length&&l(n[0].previousElementSibling.cells[0],e)}()}function k(){e("tagging_cost")?v():n()}export default k
//# sourceMappingURL=injectGuildAddTagsWidgets-c60e1ce7.js.map
