import{b0 as e,y as t,m as n,h as o,o as s,W as i,g as r,t as a,A as f}from"./calfSystem-ec5e5725.js"
import{i as c}from"./insertTextBeforeEnd-5b2001f1.js"
import{c as l}from"./createButton-142ef647.js"
function m(t){return function(t){return e({subcmd:"unequipitem",inventory_id:t})}(t)}let u
function d(e,t){t.s&&f("",e.parentNode)}function p(e){const t=/inventory_id=(\d+)/.exec(e.href)[1]
t&&m(t).then(a(d,e))}function h(){i("profile","nekidBtn")
const e=u.nextElementSibling
r("a",e).forEach(p)}function b(){const e=t("profileRightColumn")
u=t("profileCombatSetDiv")
const i=u.parentNode.nextElementSibling,r=function(){const e=n({className:"fshCenter"}),t=l({className:"fshBl fshBls",textContent:"Nekid"})
return c(e,"[ "),o(e,t),c(e," ]"),s(t,h),e}()
e.replaceChild(r,i)}export default b
//# sourceMappingURL=nekidBtn-4229632d.js.map
