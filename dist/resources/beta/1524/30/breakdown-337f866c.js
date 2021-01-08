import{r as e,x as o,H as t,i as s,p as n,o as i,y as a,l as r,Y as d,t as c,bD as m,ao as p}from"./calfSystem-ebf4b17d.js"
import"./isChecked-6167b36b.js"
import{s as g}from"./simpleCheckbox-d8b32f4e.js"
import"./indexAjaxJson-91b10960.js"
import"./cmdExport-6e99c1e8.js"
import"./getInventory-4b39d7a1.js"
import"./getInventoryById-d902b49d.js"
import"./getArrayByClassName-f55d7526.js"
import{p as b}from"./perfFilter-e8973f26.js"
let l
const f=[]
function u(e){e.hide()}function h(e,o){e.animate({height:0},500,o)}function w(){const e=$("#composingMessageContainer")
e.animate({opacity:0},500,c(h,e,c(u,e)))}function x(e,o){$("#composingMessageContainer").remove(),$("#composingMessage").append($("<div/>",{id:"composingMessageContainer",width:"100%"}).append(function(e,o){return $("<div/>",{id:"composingMessageText"}).css({width:"90%","text-align":"center","background-color":o,color:"rgb(255, 255, 255)",margin:"5px auto 5px auto",padding:"2px"}).html(e)}(e,o))),setTimeout(w,5e3)}function y(e){0!==e.error?x("Error: "+e.msg,"rgb(164, 28, 28)"):window.location=m+p+"breakdown&m=1"}function j(){(function(o){return e({type:"POST",data:{cmd:"composing",subcmd:"dobreakdown",item_list:o},dataType:"json"})})(f).then(y)}function k(e){l&&"breakdown-selected-items"===e.target.id&&function(e){e.stopPropagation(),0!==f.length?j():x("Error: No items selected.","rgb(164, 28, 28)")}(e)}function C(e){if(!r("selectable-item",e.target))return
const o=e.target.id.replace("composing-item-",""),t=f.indexOf(o);-1===t?f.push(o):f.splice(t,1)}function B(){l=!l,d("disableBreakdownPrompts",l)}function P(){o()||(b("composing"),l=t("disableBreakdownPrompts"),s(n,`<table class="fshTblCenter"><tbody>${g("disableBreakdownPrompts")}</tbody></table>`),i(a("breakdown-selected-items").parentNode,k,!0),i(a("composing-items"),C),i(a("disableBreakdownPrompts"),B))}export default P
//# sourceMappingURL=breakdown-337f866c.js.map
