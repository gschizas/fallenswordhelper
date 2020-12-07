import{r as e,x as o,H as t,i as s,p as a,o as n,y as i,l as r,Y as c,t as m,by as p,ao as d}from"./calfSystem-6459f18a.js"
import"./isChecked-6167b36b.js"
import{s as g}from"./simpleCheckbox-994bcb83.js"
import"./indexAjaxJson-14aa1022.js"
import"./cmdExport-7faecab1.js"
import"./getInventory-5521ae48.js"
import"./getInventoryById-1cf05aa3.js"
import"./getArrayByClassName-b1615c24.js"
import{p as l}from"./perfFilter-78ae47ab.js"
let b
const f=[]
function u(e){e.hide()}function y(e,o){e.animate({height:0},500,o)}function h(){const e=$("#composingMessageContainer")
e.animate({opacity:0},500,m(y,e,m(u,e)))}function w(e,o){$("#composingMessageContainer").remove(),$("#composingMessage").append($("<div/>",{id:"composingMessageContainer",width:"100%"}).append(function(e,o){return $("<div/>",{id:"composingMessageText"}).css({width:"90%","text-align":"center","background-color":o,color:"rgb(255, 255, 255)",margin:"5px auto 5px auto",padding:"2px"}).html(e)}(e,o))),setTimeout(h,5e3)}function x(e){0!==e.error?w("Error: "+e.msg,"rgb(164, 28, 28)"):window.location=p+d+"breakdown&m=1"}function j(){(function(o){return e({type:"POST",data:{cmd:"composing",subcmd:"dobreakdown",item_list:o},dataType:"json"})})(f).then(x)}function k(e){b&&"breakdown-selected-items"===e.target.id&&function(e){e.stopPropagation(),0!==f.length?j():w("Error: No items selected.","rgb(164, 28, 28)")}(e)}function C(e){if(!r("selectable-item",e.target))return
const o=e.target.id.replace("composing-item-",""),t=f.indexOf(o);-1===t?f.push(o):f.splice(t,1)}function B(){b=!b,c("disableBreakdownPrompts",b)}function P(){o()||(l("composing"),b=t("disableBreakdownPrompts"),s(a,`<table class="fshTblCenter"><tbody>${g("disableBreakdownPrompts")}</tbody></table>`),n(i("breakdown-selected-items").parentNode,k,!0),n(i("composing-items"),C),n(i("disableBreakdownPrompts"),B))}export default P
//# sourceMappingURL=breakdown-9291f28a.js.map
