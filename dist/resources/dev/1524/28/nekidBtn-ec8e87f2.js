import{a$ as t,y as e,m as n,h as o,o as s,V as i,g as a,t as r,A as f}from"./calfSystem-b136673a.js"
import{i as c}from"./insertTextBeforeEnd-131a905a.js"
import{c as l}from"./createButton-f2fbc414.js"
function m(e){return function(e){return t({subcmd:"unequipitem",inventory_id:e})}(e)}let u
function d(t,e){e.s&&f("",t.parentNode)}function p(t){const e=/inventory_id=(\d+)/.exec(t.href)[1]
e&&m(e).then(r(d,t))}function h(){i("profile","nekidBtn")
const t=u.nextElementSibling
a("a",t).forEach(p)}function b(){const t=e("profileRightColumn")
u=e("profileCombatSetDiv")
const i=u.parentNode.nextElementSibling,a=function(){const t=n({className:"fshCenter"}),e=l({className:"fshBl fshBls",textContent:"Nekid"})
return c(t,"[ "),o(t,e),c(t," ]"),s(e,h),t}()
t.replaceChild(a,i)}export default b
//# sourceMappingURL=nekidBtn-ec8e87f2.js.map
