import{v as t,w as a,b as e,p as s,g as n,i,o as d,x as r,e as c,y as o,z as u,f as l,A as p}from"./calfSystem-d49dbbd3.js"
import"./numberIsNaN-1742f258.js"
import"./testRange-22401008.js"
import{t as m}from"./testQuant-3028d04d.js"
import{j as f,o as b}from"./jsonFail-6914cee9.js"
function y(a){return function(a){return t({cmd:"potionbazaar",subcmd:"buyitem",item_id:a})}(a)}let h,g='<table id="fshBazaar"><tr><td colspan="5">Select an item to quick-buy:</td></tr><tr><td colspan="5">Select how many to quick-buy</td></tr><tr><td colspan="5"><input id="buy_amount" class="fshNumberInput" type="number" min="0" max="99" value="1"></td></tr><tr><td>@0@</td><td>@1@</td><td>@2@</td><td>@3@</td><td>@4@</td></tr><tr><td>@5@</td><td>@6@</td><td>@7@</td><td>@8@</td><td>@9@</td></tr><tr><td colspan="3">Selected item:</td><td id="selectedItem" colspan="2"></td></tr><tr><td colspan="5"><span id="fshBazaarWarning" class="fshHide">Warning:<br>pressing [<span id="fshBuy" class="fshLink">This button</span>] now will buy the <span id="quantity">1</span> item(s) WITHOUT confirmation!</span></td></tr><tr><td colspan="5"><span id="buyResultLabel"></span><ol id="buy_result"></ol></td></tr></table>'
function z(){return m(r("buy_amount").value)}function B(t){const{target:a}=t
if(!a.classList.contains("bazaarButton"))return
const e=z()
e&&function(t,a){o(a,r("quantity")),h=t.getAttribute("itemid"),r("fshBazaarWarning").removeAttribute("class")
const e=t.cloneNode(!1)
e.className="bazaarSelected tip-dynamic"
const s=r("selectedItem")
u("",s),l(s,e)}(a,e)}function j(){const t=z()
t&&o(t,r("quantity"))}function N(t){const a=r("buy_result")
f(t,a)||t.s&&b("You purchased the item!",a)}function _(){if(!h)return
const t=p(r("quantity"))
o(`Buying ${t} items`,r("buyResultLabel"))
for(let a=0;a<t;a+=1)y(h).then(N)}function q(t,a){const e=t.children[0],{tipped:s}=e.dataset
g=g.replace(`@${a}@`,'<span class="bazaarButton tip-dynamic" style="background-image: url(\'@src@\');" itemid="@itemid@" data-tipped="@tipped@"></span>').replace("@src@",e.getAttribute("src")).replace("@itemid@",s.match(/\?item_id=(\d+)/)[1]).replace("@tipped@",s)}export default function(){if(a())return
const t=e("img",s)[0]
t.className="fshFloatLeft",n("a",s).forEach(q),g=g.replace(/@\d@/g,""),i(t.parentNode,g),d(r("fshBazaar"),B),c(r("buy_amount"),"input",j),d(r("fshBuy"),_)}
//# sourceMappingURL=bazaar-a62fef40.js.map
