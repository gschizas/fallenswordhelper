import{b0 as t,y as e,m as n,h as o,o as s,V as i,g as r,t as a,A as c}from"./calfSystem-9c7241dc.js"
import{i as f}from"./insertTextBeforeEnd-39b20141.js"
import{c as l}from"./createButton-9da72fb3.js"
function m(e){return function(e){return t({subcmd:"unequipitem",inventory_id:e})}(e)}let u
function d(t,e){e.s&&c("",t.parentNode)}function p(t){const e=/inventory_id=(\d+)/.exec(t.href)[1]
e&&m(e).then(a(d,t))}function h(){i("profile","nekidBtn")
const t=u.nextElementSibling
r("a",t).forEach(p)}export default function(){const t=e("profileRightColumn")
u=e("profileCombatSetDiv")
const i=u.parentNode.nextElementSibling,r=function(){const t=n({className:"fshCenter"}),e=l({className:"fshBl fshBls",textContent:"Nekid"})
return f(t,"[ "),o(t,e),f(t," ]"),s(e,h),t}()
t.replaceChild(r,i)}
//# sourceMappingURL=nekidBtn-5ad0ff27.js.map
