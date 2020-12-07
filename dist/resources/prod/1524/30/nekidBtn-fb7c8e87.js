import{bc as t,y as e,m as n,h as o,o as s,U as i,g as r,t as a,A as f}from"./calfSystem-6459f18a.js"
import{i as c}from"./insertTextBeforeEnd-823db888.js"
import{c as l}from"./createButton-b54fa939.js"
function m(e){return function(e){return t({subcmd:"unequipitem",inventory_id:e})}(e)}let u
function d(t,e){e.s&&f("",t.parentNode)}function p(t){const e=/inventory_id=(\d+)/.exec(t.href)[1]
e&&m(e).then(a(d,t))}function h(){i("profile","nekidBtn")
const t=u.nextElementSibling
r("a",t).forEach(p)}function b(){const t=e("profileRightColumn")
u=e("profileCombatSetDiv")
const i=u.parentNode.nextElementSibling,r=function(){const t=n({className:"fshCenter"}),e=l({className:"fshBl fshBls",textContent:"Nekid"})
return c(t,"[ "),o(t,e),c(t," ]"),s(e,h),t}()
t.replaceChild(r,i)}export default b
//# sourceMappingURL=nekidBtn-fb7c8e87.js.map
