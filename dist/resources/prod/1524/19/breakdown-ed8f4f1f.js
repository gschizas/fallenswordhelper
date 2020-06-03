import{q as e,w as t,D as o,i as s,p as n,o as a,x as i,W as r,s as c,bI as d,an as m}from"./calfSystem-6fc0cc1b.js"
import"./isChecked-ce5ca840.js"
import{s as p}from"./simpleCheckbox-a0ada781.js"
import"./getArrayByClassName-50cbc2c4.js"
import"./indexAjaxJson-608117f0.js"
import"./cmdExport-ce8b0402.js"
import"./getInventory-9044dbdf.js"
import"./getInventoryById-1fb78caf.js"
import{p as g}from"./perfFilter-b0fa5c58.js"
let l
const f=[]
function b(e){e.hide()}function u(e,t){e.animate({height:0},500,t)}function w(){const e=$("#composingMessageContainer")
e.animate({opacity:0},500,c(u,e,c(b,e)))}function h(e,t){$("#composingMessageContainer").remove(),$("#composingMessage").append($("<div/>",{id:"composingMessageContainer",width:"100%"}).append(function(e,t){return $("<div/>",{id:"composingMessageText"}).css({width:"90%","text-align":"center","background-color":t,color:"rgb(255, 255, 255)",margin:"5px auto 5px auto",padding:"2px"}).html(e)}(e,t))),setTimeout(w,5e3)}function x(e){0!==e.error?h("Error: "+e.msg,"rgb(164, 28, 28)"):window.location=d+m+"breakdown&m=1"}function j(){(function(t){return e({type:"POST",data:{cmd:"composing",subcmd:"dobreakdown",item_list:t},dataType:"json"})})(f).then(x)}function k(e){l&&"breakdown-selected-items"===e.target.id&&function(e){e.stopPropagation(),0!==f.length?j():h("Error: No items selected.","rgb(164, 28, 28)")}(e)}function y(e){if(!e.target.classList.contains("selectable-item"))return
const t=e.target.id.replace("composing-item-",""),o=f.indexOf(t);-1===o?f.push(t):f.splice(o,1)}function C(){l=!l,r("disableBreakdownPrompts",l)}export default function(){t()||(g("composing"),l=o("disableBreakdownPrompts"),s(n,`<table class="fshTblCenter"><tbody>${p("disableBreakdownPrompts")}</tbody></table>`),a(i("breakdown-selected-items").parentNode,k,!0),a(i("composing-items"),y),a(i("disableBreakdownPrompts"),C))}
//# sourceMappingURL=breakdown-ed8f4f1f.js.map
