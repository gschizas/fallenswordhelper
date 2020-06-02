import{q as e,w as t,D as o,i as s,p as n,o as a,x as i,W as r,s as d,bM as c,an as m}from"./calfSystem-9554b525.js"
import"./isChecked-145d8a72.js"
import{s as p}from"./simpleCheckbox-7b8c126a.js"
import"./getArrayByClassName-61d73ad7.js"
import"./indexAjaxJson-24e555fb.js"
import"./cmdExport-d8ee0a12.js"
import"./getInventory-d47f4ff7.js"
import"./getInventoryById-8ed31e70.js"
import{p as g}from"./perfFilter-e59ba5b5.js"
let l
const b=[]
function f(e){e.hide()}function u(e,t){e.animate({height:0},500,t)}function w(){const e=$("#composingMessageContainer")
e.animate({opacity:0},500,d(u,e,d(f,e)))}function h(e,t){$("#composingMessageContainer").remove(),$("#composingMessage").append($("<div/>",{id:"composingMessageContainer",width:"100%"}).append(function(e,t){return $("<div/>",{id:"composingMessageText"}).css({width:"90%","text-align":"center","background-color":t,color:"rgb(255, 255, 255)",margin:"5px auto 5px auto",padding:"2px"}).html(e)}(e,t))),setTimeout(w,5e3)}function x(e){0!==e.error?h("Error: "+e.msg,"rgb(164, 28, 28)"):window.location=c+m+"breakdown&m=1"}function j(){(function(t){return e({type:"POST",data:{cmd:"composing",subcmd:"dobreakdown",item_list:t},dataType:"json"})})(b).then(x)}function k(e){l&&"breakdown-selected-items"===e.target.id&&function(e){e.stopPropagation(),0!==b.length?j():h("Error: No items selected.","rgb(164, 28, 28)")}(e)}function y(e){if(!e.target.classList.contains("selectable-item"))return
const t=e.target.id.replace("composing-item-",""),o=b.indexOf(t);-1===o?b.push(t):b.splice(o,1)}function C(){l=!l,r("disableBreakdownPrompts",l)}export default function(){t()||(g("composing"),l=o("disableBreakdownPrompts"),s(n,`<table class="fshTblCenter"><tbody>${p("disableBreakdownPrompts")}</tbody></table>`),a(i("breakdown-selected-items").parentNode,k,!0),a(i("composing-items"),y),a(i("disableBreakdownPrompts"),C))}
//# sourceMappingURL=breakdown-689a4e01.js.map
