import{bh as e,y as t,l as n,f as o,o as s,U as i,g as a,t as r,A as c}from"./calfSystem-05554bae.js"
import{i as f}from"./insertTextBeforeEnd-0b7ac991.js"
import{c as l}from"./createButton-3a781ecf.js"
function u(t){return function(t){return e({subcmd:"unequipitem",inventory_id:t})}(t)}let m
function d(e,t){t.s&&c("",e.parentNode)}function p(e){const t=/inventory_id=(\d+)/.exec(e.href)[1]
t&&u(t).then(r(d,e))}function h(){i("profile","nekidBtn")
const e=m.nextElementSibling
a("a",e).forEach(p)}export default function(){const e=t("profileRightColumn")
m=t("profileCombatSetDiv")
const i=m.parentNode.nextElementSibling,a=function(){const e=n({className:"fshCenter"}),t=l({className:"fshBl fshBls",textContent:"Nekid"})
return f(e,"[ "),o(e,t),f(e," ]"),s(t,h),e}()
e.replaceChild(a,i)}
//# sourceMappingURL=nekidBtn-2d44dd5f.js.map
