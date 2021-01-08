import{a$ as e,y as t,m as n,h as o,o as s,V as i,g as a,t as r,A as f}from"./calfSystem-54df10e3.js"
import{i as c}from"./insertTextBeforeEnd-9513e143.js"
import{c as l}from"./createButton-077faa0f.js"
function m(t){return function(t){return e({subcmd:"unequipitem",inventory_id:t})}(t)}let u
function d(e,t){t.s&&f("",e.parentNode)}function p(e){const t=/inventory_id=(\d+)/.exec(e.href)[1]
t&&m(t).then(r(d,e))}function h(){i("profile","nekidBtn")
const e=u.nextElementSibling
a("a",e).forEach(p)}function x(){const e=t("profileRightColumn")
u=t("profileCombatSetDiv")
const i=u.parentNode.nextElementSibling,a=function(){const e=n({className:"fshCenter"}),t=l({className:"fshBl fshBls",textContent:"Nekid"})
return c(e,"[ "),o(e,t),c(e," ]"),s(t,h),e}()
e.replaceChild(a,i)}export default x
//# sourceMappingURL=nekidBtn-93a592c8.js.map
