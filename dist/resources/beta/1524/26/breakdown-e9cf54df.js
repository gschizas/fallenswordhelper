import{r as e,x as o,H as t,i as s,p as n,o as a,y as i,l as r,Y as c,t as d,bE as m,ao as p}from"./calfSystem-cf4d22a7.js"
import"./isChecked-4820f42a.js"
import{s as g}from"./simpleCheckbox-358d4bfe.js"
import"./indexAjaxJson-451a313a.js"
import"./cmdExport-b7dc8f76.js"
import"./getInventory-8dedf4fe.js"
import"./getInventoryById-c7da90ec.js"
import"./getArrayByClassName-9fa4b21c.js"
import{p as f}from"./perfFilter-0aa07c83.js"
let l
const b=[]
function u(e){e.hide()}function h(e,o){e.animate({height:0},500,o)}function w(){const e=$("#composingMessageContainer")
e.animate({opacity:0},500,d(h,e,d(u,e)))}function x(e,o){$("#composingMessageContainer").remove(),$("#composingMessage").append($("<div/>",{id:"composingMessageContainer",width:"100%"}).append(function(e,o){return $("<div/>",{id:"composingMessageText"}).css({width:"90%","text-align":"center","background-color":o,color:"rgb(255, 255, 255)",margin:"5px auto 5px auto",padding:"2px"}).html(e)}(e,o))),setTimeout(w,5e3)}function y(e){0!==e.error?x("Error: "+e.msg,"rgb(164, 28, 28)"):window.location=m+p+"breakdown&m=1"}function j(){(function(o){return e({type:"POST",data:{cmd:"composing",subcmd:"dobreakdown",item_list:o},dataType:"json"})})(b).then(y)}function k(e){l&&"breakdown-selected-items"===e.target.id&&function(e){e.stopPropagation(),0!==b.length?j():x("Error: No items selected.","rgb(164, 28, 28)")}(e)}function C(e){if(!r("selectable-item",e.target))return
const o=e.target.id.replace("composing-item-",""),t=b.indexOf(o);-1===t?b.push(o):b.splice(t,1)}function B(){l=!l,c("disableBreakdownPrompts",l)}function P(){o()||(f("composing"),l=t("disableBreakdownPrompts"),s(n,`<table class="fshTblCenter"><tbody>${g("disableBreakdownPrompts")}</tbody></table>`),a(i("breakdown-selected-items").parentNode,k,!0),a(i("composing-items"),C),a(i("disableBreakdownPrompts"),B))}export default P
//# sourceMappingURL=breakdown-e9cf54df.js.map
