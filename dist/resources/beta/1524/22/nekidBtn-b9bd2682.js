import{bh as t,y as e,m as n,h as o,o as s,U as a,g as i,t as r,A as f}from"./calfSystem-1b876afa.js"
import{i as c}from"./insertTextBeforeEnd-32a0aa1d.js"
import{c as l}from"./createButton-9abbf075.js"
function m(e){return function(e){return t({subcmd:"unequipitem",inventory_id:e})}(e)}let u
function d(t,e){e.s&&f("",t.parentNode)}function p(t){const e=/inventory_id=(\d+)/.exec(t.href)[1]
e&&m(e).then(r(d,t))}function h(){a("profile","nekidBtn")
const t=u.nextElementSibling
i("a",t).forEach(p)}export default function(){const t=e("profileRightColumn")
u=e("profileCombatSetDiv")
const a=u.parentNode.nextElementSibling,i=function(){const t=n({className:"fshCenter"}),e=l({className:"fshBl fshBls",textContent:"Nekid"})
return c(t,"[ "),o(t,e),c(t," ]"),s(e,h),t}()
t.replaceChild(i,a)}
//# sourceMappingURL=nekidBtn-b9bd2682.js.map
