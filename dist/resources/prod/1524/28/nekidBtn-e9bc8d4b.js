import{bc as e,y as t,m as n,h as o,o as s,U as i,g as a,t as r,A as c}from"./calfSystem-a5da5210.js"
import{i as f}from"./insertTextBeforeEnd-493fede1.js"
import{c as l}from"./createButton-219c3a0e.js"
function m(t){return function(t){return e({subcmd:"unequipitem",inventory_id:t})}(t)}let u
function d(e,t){t.s&&c("",e.parentNode)}function p(e){const t=/inventory_id=(\d+)/.exec(e.href)[1]
t&&m(t).then(r(d,e))}function h(){i("profile","nekidBtn")
const e=u.nextElementSibling
a("a",e).forEach(p)}function x(){const e=t("profileRightColumn")
u=t("profileCombatSetDiv")
const i=u.parentNode.nextElementSibling,a=function(){const e=n({className:"fshCenter"}),t=l({className:"fshBl fshBls",textContent:"Nekid"})
return f(e,"[ "),o(e,t),f(e," ]"),s(t,h),e}()
e.replaceChild(a,i)}export default x
//# sourceMappingURL=nekidBtn-e9bc8d4b.js.map
