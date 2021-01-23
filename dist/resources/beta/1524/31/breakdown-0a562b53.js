import{r as e,x as o,H as t,i as s,p as n,o as a,y as i,l as r,Y as c,t as d,ao as m,ap as p}from"./calfSystem-47fc08ae.js"
import{p as g}from"./perfFilter-507bce54.js"
import{s as l}from"./simpleCheckbox-c51e0696.js"
import"./getArrayByClassName-2a13cfae.js"
import"./getInventoryById-216cdd3b.js"
import"./getInventory-a6ab3edc.js"
import"./cmdExport-ca6a6b3e.js"
import"./indexAjaxJson-be24760c.js"
import"./isChecked-1c18cd61.js"
let b
const f=[]
function u(e){e.hide()}function h(e,o){e.animate({height:0},500,o)}function w(){const e=$("#composingMessageContainer")
e.animate({opacity:0},500,d(h,e,d(u,e)))}function x(e,o){$("#composingMessageContainer").remove(),$("#composingMessage").append($("<div/>",{id:"composingMessageContainer",width:"100%"}).append(function(e,o){return $("<div/>",{id:"composingMessageText"}).css({width:"90%","text-align":"center","background-color":o,color:"rgb(255, 255, 255)",margin:"5px auto 5px auto",padding:"2px"}).html(e)}(e,o))),setTimeout(w,5e3)}function y(e){0!==e.error?x(`Error: ${e.msg}`,"rgb(164, 28, 28)"):window.location=`${m+p}breakdown&m=1`}function j(){(function(o){return e({type:"POST",data:{cmd:"composing",subcmd:"dobreakdown",item_list:o},dataType:"json"})})(f).then(y)}function k(e){b&&"breakdown-selected-items"===e.target.id&&function(e){e.stopPropagation(),0!==f.length?j():x("Error: No items selected.","rgb(164, 28, 28)")}(e)}function C(e){if(!r("selectable-item",e.target))return
const o=e.target.id.replace("composing-item-",""),t=f.indexOf(o);-1===t?f.push(o):f.splice(t,1)}function B(){b=!b,c("disableBreakdownPrompts",b)}function P(){o()||(g("composing"),b=t("disableBreakdownPrompts"),s(n,`<table class="fshTblCenter"><tbody>${l("disableBreakdownPrompts")}</tbody></table>`),a(i("breakdown-selected-items").parentNode,k,!0),a(i("composing-items"),C),a(i("disableBreakdownPrompts"),B))}export default P
//# sourceMappingURL=breakdown-0a562b53.js.map
