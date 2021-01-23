import{r as e,x as t,H as o,i as s,p as n,o as a,y as i,l as r,Y as c,t as d,am as m,an as p}from"./calfSystem-7aee5245.js"
import{p as g}from"./perfFilter-8ddeedba.js"
import{s as l}from"./simpleCheckbox-4f66a590.js"
import"./getArrayByClassName-b0ef8ab2.js"
import"./getInventoryById-6ca13561.js"
import"./getInventory-9e4bb982.js"
import"./cmdExport-ac019581.js"
import"./indexAjaxJson-d7e2ce82.js"
import"./isChecked-1c18cd61.js"
let b
const f=[]
function u(e){e.hide()}function h(e,t){e.animate({height:0},500,t)}function w(){const e=$("#composingMessageContainer")
e.animate({opacity:0},500,d(h,e,d(u,e)))}function x(e,t){$("#composingMessageContainer").remove(),$("#composingMessage").append($("<div/>",{id:"composingMessageContainer",width:"100%"}).append(function(e,t){return $("<div/>",{id:"composingMessageText"}).css({width:"90%","text-align":"center","background-color":t,color:"rgb(255, 255, 255)",margin:"5px auto 5px auto",padding:"2px"}).html(e)}(e,t))),setTimeout(w,5e3)}function y(e){0!==e.error?x(`Error: ${e.msg}`,"rgb(164, 28, 28)"):window.location=`${m+p}breakdown&m=1`}function j(){(function(t){return e({type:"POST",data:{cmd:"composing",subcmd:"dobreakdown",item_list:t},dataType:"json"})})(f).then(y)}function k(e){b&&"breakdown-selected-items"===e.target.id&&function(e){e.stopPropagation(),0!==f.length?j():x("Error: No items selected.","rgb(164, 28, 28)")}(e)}function C(e){if(!r("selectable-item",e.target))return
const t=e.target.id.replace("composing-item-",""),o=f.indexOf(t);-1===o?f.push(t):f.splice(o,1)}function B(){b=!b,c("disableBreakdownPrompts",b)}function P(){t()||(g("composing"),b=o("disableBreakdownPrompts"),s(n,`<table class="fshTblCenter"><tbody>${l("disableBreakdownPrompts")}</tbody></table>`),a(i("breakdown-selected-items").parentNode,k,!0),a(i("composing-items"),C),a(i("disableBreakdownPrompts"),B))}export default P
//# sourceMappingURL=breakdown-1653fa5f.js.map
