import{r as e,x as o,G as t,i as s,p as n,o as a,y as i,l as r,Y as c,t as m,bH as d,ao as p}from"./calfSystem-1b876afa.js"
import"./isChecked-a8ba6bb9.js"
import{s as g}from"./simpleCheckbox-3997639f.js"
import"./indexAjaxJson-1a78cb06.js"
import"./cmdExport-f01a6b63.js"
import"./getInventory-19bbf690.js"
import"./getInventoryById-b28970a8.js"
import"./getArrayByClassName-ef7e9871.js"
import{p as b}from"./perfFilter-f0d1a042.js"
let l
const f=[]
function u(e){e.hide()}function h(e,o){e.animate({height:0},500,o)}function w(){const e=$("#composingMessageContainer")
e.animate({opacity:0},500,m(h,e,m(u,e)))}function x(e,o){$("#composingMessageContainer").remove(),$("#composingMessage").append($("<div/>",{id:"composingMessageContainer",width:"100%"}).append(function(e,o){return $("<div/>",{id:"composingMessageText"}).css({width:"90%","text-align":"center","background-color":o,color:"rgb(255, 255, 255)",margin:"5px auto 5px auto",padding:"2px"}).html(e)}(e,o))),setTimeout(w,5e3)}function y(e){0!==e.error?x("Error: "+e.msg,"rgb(164, 28, 28)"):window.location=d+p+"breakdown&m=1"}function j(){(function(o){return e({type:"POST",data:{cmd:"composing",subcmd:"dobreakdown",item_list:o},dataType:"json"})})(f).then(y)}function k(e){l&&"breakdown-selected-items"===e.target.id&&function(e){e.stopPropagation(),0!==f.length?j():x("Error: No items selected.","rgb(164, 28, 28)")}(e)}function C(e){if(!r("selectable-item",e.target))return
const o=e.target.id.replace("composing-item-",""),t=f.indexOf(o);-1===t?f.push(o):f.splice(t,1)}function B(){l=!l,c("disableBreakdownPrompts",l)}export default function(){o()||(b("composing"),l=t("disableBreakdownPrompts"),s(n,`<table class="fshTblCenter"><tbody>${g("disableBreakdownPrompts")}</tbody></table>`),a(i("breakdown-selected-items").parentNode,k,!0),a(i("composing-items"),C),a(i("disableBreakdownPrompts"),B))}
//# sourceMappingURL=breakdown-5728e038.js.map
