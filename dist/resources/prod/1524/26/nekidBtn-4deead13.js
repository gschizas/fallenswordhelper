import{bd as t,y as e,m as n,h as o,o as s,U as i,g as a,t as r,A as c}from"./calfSystem-a5fc99d4.js"
import{i as f}from"./insertTextBeforeEnd-a53a8e2c.js"
import{c as l}from"./createButton-5993a089.js"
function m(e){return function(e){return t({subcmd:"unequipitem",inventory_id:e})}(e)}let u
function d(t,e){e.s&&c("",t.parentNode)}function p(t){const e=/inventory_id=(\d+)/.exec(t.href)[1]
e&&m(e).then(r(d,t))}function h(){i("profile","nekidBtn")
const t=u.nextElementSibling
a("a",t).forEach(p)}function x(){const t=e("profileRightColumn")
u=e("profileCombatSetDiv")
const i=u.parentNode.nextElementSibling,a=function(){const t=n({className:"fshCenter"}),e=l({className:"fshBl fshBls",textContent:"Nekid"})
return f(t,"[ "),o(t,e),f(t," ]"),s(e,h),t}()
t.replaceChild(a,i)}export default x
//# sourceMappingURL=nekidBtn-4deead13.js.map
