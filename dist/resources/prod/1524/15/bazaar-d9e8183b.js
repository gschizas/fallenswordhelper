import{v as t,w as a,b as e,p as s,g as n,i,o as r,x as d,e as c,y as o,z as u,f as l,A as p}from"./calfSystem-740ec4d2.js"
import"./numberIsNaN-2fbabd4d.js"
import"./testRange-c1779f47.js"
import{t as m}from"./testQuant-ffd89c9b.js"
import{j as f,o as b}from"./jsonFail-b37bbca2.js"
function y(a){return function(a){return t({cmd:"potionbazaar",subcmd:"buyitem",item_id:a})}(a)}let h,g='<table id="fshBazaar"><tr><td colspan="5">Select an item to quick-buy:</td></tr><tr><td colspan="5">Select how many to quick-buy</td></tr><tr><td colspan="5"><input id="buy_amount" class="fshNumberInput" type="number" min="0" max="99" value="1"></td></tr><tr><td>@0@</td><td>@1@</td><td>@2@</td><td>@3@</td><td>@4@</td></tr><tr><td>@5@</td><td>@6@</td><td>@7@</td><td>@8@</td><td>@9@</td></tr><tr><td colspan="3">Selected item:</td><td id="selectedItem" colspan="2"></td></tr><tr><td colspan="5"><span id="fshBazaarWarning" class="fshHide">Warning:<br>pressing [<span id="fshBuy" class="fshLink">This button</span>] now will buy the <span id="quantity">1</span> item(s) WITHOUT confirmation!</span></td></tr><tr><td colspan="5"><span id="buyResultLabel"></span><ol id="buy_result"></ol></td></tr></table>'
function z(){return m(d("buy_amount").value)}function B(t){const{target:a}=t
if(!a.classList.contains("bazaarButton"))return
const e=z()
e&&function(t,a){o(a,d("quantity")),h=t.getAttribute("itemid"),d("fshBazaarWarning").removeAttribute("class")
const e=t.cloneNode(!1)
e.className="bazaarSelected tip-dynamic"
const s=d("selectedItem")
u("",s),l(s,e)}(a,e)}function j(){const t=z()
t&&o(t,d("quantity"))}function N(t){const a=d("buy_result")
f(t,a)||t.s&&b("You purchased the item!",a)}function _(){if(!h)return
const t=p(d("quantity"))
o(`Buying ${t} items`,d("buyResultLabel"))
for(let a=0;a<t;a+=1)y(h).then(N)}function q(t,a){const e=t.children[0],{tipped:s}=e.dataset
g=g.replace(`@${a}@`,'<span class="bazaarButton tip-dynamic" style="background-image: url(\'@src@\');" itemid="@itemid@" data-tipped="@tipped@"></span>').replace("@src@",e.getAttribute("src")).replace("@itemid@",s.match(/\?item_id=(\d+)/)[1]).replace("@tipped@",s)}export default function(){if(a())return
const t=e("img",s)[0]
t.className="fshFloatLeft",n("a",s).forEach(q),g=g.replace(/@\d@/g,""),i(t.parentNode,g),r(d("fshBazaar"),B),c(d("buy_amount"),"input",j),r(d("fshBuy"),_)}
//# sourceMappingURL=bazaar-d9e8183b.js.map
