import{y as t,z as a,b as s,p as e,g as n,i,o as d,A as r,f as c,B as o,C as u,h as l,D as p}from"./calfSystem-72fdbe97.js"
import"./numberIsNaN-7d89f7bf.js"
import"./testRange-a51dd710.js"
import{t as m}from"./testQuant-da078752.js"
import{j as f,o as b}from"./jsonFail-b18d58c6.js"
function y(a){return function(a){return t({cmd:"potionbazaar",subcmd:"buyitem",item_id:a})}(a)}let h,g='<table id="fshBazaar"><tr><td colspan="5">Select an item to quick-buy:</td></tr><tr><td colspan="5">Select how many to quick-buy</td></tr><tr><td colspan="5"><input id="buy_amount" class="fshNumberInput" type="number" min="0" max="99" value="1"></td></tr><tr><td>@0@</td><td>@1@</td><td>@2@</td><td>@3@</td><td>@4@</td></tr><tr><td>@5@</td><td>@6@</td><td>@7@</td><td>@8@</td><td>@9@</td></tr><tr><td colspan="3">Selected item:</td><td id="selectedItem" colspan="2"></td></tr><tr><td colspan="5"><span id="fshBazaarWarning" class="fshHide">Warning:<br>pressing [<span id="fshBuy" class="fshLink">This button</span>] now will buy the <span id="quantity">1</span> item(s) WITHOUT confirmation!</span></td></tr><tr><td colspan="5"><span id="buyResultLabel"></span><ol id="buy_result"></ol></td></tr></table>'
function B(){return m(r("buy_amount").value)}function z(t){const{target:a}=t
if(!a.classList.contains("bazaarButton"))return
const s=B()
s&&function(t,a){o(a,r("quantity")),h=t.getAttribute("itemid"),r("fshBazaarWarning").removeAttribute("class")
const s=t.cloneNode(!1)
s.className="bazaarSelected tip-dynamic"
const e=r("selectedItem")
u("",e),l(e,s)}(a,s)}function j(){const t=B()
t&&o(t,r("quantity"))}function N(t){const a=r("buy_result")
f(t,a)||t.s&&b("You purchased the item!",a)}function _(){if(!h)return
const t=p(r("quantity"))
o(`Buying ${t} items`,r("buyResultLabel"))
for(let a=0;a<t;a+=1)y(h).then(N)}function q(t,a){const s=t.children[0],{tipped:e}=s.dataset
g=g.replace(`@${a}@`,'<span class="bazaarButton tip-dynamic" style="background-image: url(\'@src@\');" itemid="@itemid@" data-tipped="@tipped@"></span>').replace("@src@",s.getAttribute("src")).replace("@itemid@",e.match(/\?item_id=(\d+)/)[1]).replace("@tipped@",e)}export default function(){if(a())return
const t=s("img",e)[0]
t.className="fshFloatLeft",n("a",e).forEach(q),g=g.replace(/@\d@/g,""),i(t.parentNode,g),d(r("fshBazaar"),z),c(r("buy_amount"),"input",j),d(r("fshBuy"),_)}
//# sourceMappingURL=bazaar-c4f1fde2.js.map
