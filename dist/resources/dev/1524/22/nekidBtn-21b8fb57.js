import{b0 as t,y as e,m as n,h as o,o as s,V as i,g as r,t as f,A as a}from"./calfSystem-4cc738f8.js"
import{i as c}from"./insertTextBeforeEnd-f2295412.js"
import{c as l}from"./createButton-8ff4d3ce.js"
function m(e){return function(e){return t({subcmd:"unequipitem",inventory_id:e})}(e)}let u
function d(t,e){e.s&&a("",t.parentNode)}function p(t){const e=/inventory_id=(\d+)/.exec(t.href)[1]
e&&m(e).then(f(d,t))}function h(){i("profile","nekidBtn")
const t=u.nextElementSibling
r("a",t).forEach(p)}export default function(){const t=e("profileRightColumn")
u=e("profileCombatSetDiv")
const i=u.parentNode.nextElementSibling,r=function(){const t=n({className:"fshCenter"}),e=l({className:"fshBl fshBls",textContent:"Nekid"})
return c(t,"[ "),o(t,e),c(t," ]"),s(e,h),t}()
t.replaceChild(r,i)}
//# sourceMappingURL=nekidBtn-21b8fb57.js.map
