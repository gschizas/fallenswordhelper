import{r as e,x as o,H as t,i as s,p as n,o as a,y as i,l as r,Y as d,t as c,bD as m,ao as p}from"./calfSystem-964f4fc9.js"
import"./isChecked-12c32ad5.js"
import{s as g}from"./simpleCheckbox-db80ba61.js"
import"./indexAjaxJson-0d030f07.js"
import"./cmdExport-f2adfd05.js"
import"./getInventory-5b4273f5.js"
import"./getInventoryById-d734e0a5.js"
import"./getArrayByClassName-022b52a0.js"
import{p as l}from"./perfFilter-0c105867.js"
let f
const b=[]
function u(e){e.hide()}function h(e,o){e.animate({height:0},500,o)}function w(){const e=$("#composingMessageContainer")
e.animate({opacity:0},500,c(h,e,c(u,e)))}function x(e,o){$("#composingMessageContainer").remove(),$("#composingMessage").append($("<div/>",{id:"composingMessageContainer",width:"100%"}).append(function(e,o){return $("<div/>",{id:"composingMessageText"}).css({width:"90%","text-align":"center","background-color":o,color:"rgb(255, 255, 255)",margin:"5px auto 5px auto",padding:"2px"}).html(e)}(e,o))),setTimeout(w,5e3)}function y(e){0!==e.error?x("Error: "+e.msg,"rgb(164, 28, 28)"):window.location=m+p+"breakdown&m=1"}function j(){(function(o){return e({type:"POST",data:{cmd:"composing",subcmd:"dobreakdown",item_list:o},dataType:"json"})})(b).then(y)}function k(e){f&&"breakdown-selected-items"===e.target.id&&function(e){e.stopPropagation(),0!==b.length?j():x("Error: No items selected.","rgb(164, 28, 28)")}(e)}function C(e){if(!r("selectable-item",e.target))return
const o=e.target.id.replace("composing-item-",""),t=b.indexOf(o);-1===t?b.push(o):b.splice(t,1)}function B(){f=!f,d("disableBreakdownPrompts",f)}function P(){o()||(l("composing"),f=t("disableBreakdownPrompts"),s(n,`<table class="fshTblCenter"><tbody>${g("disableBreakdownPrompts")}</tbody></table>`),a(i("breakdown-selected-items").parentNode,k,!0),a(i("composing-items"),C),a(i("disableBreakdownPrompts"),B))}export default P
//# sourceMappingURL=breakdown-6d772352.js.map
