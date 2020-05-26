import{q as e,w as t,D as o,i as s,p as n,o as i,x as a,V as r,s as d,bW as c,ae as m}from"./calfSystem-1262535f.js"
import"./isChecked-d8a3d688.js"
import{s as p}from"./simpleCheckbox-69fdc6eb.js"
import"./getArrayByClassName-486c0115.js"
import"./indexAjaxJson-f27fbe77.js"
import"./cmdExport-721bbaf9.js"
import"./getInventory-7d61d5d2.js"
import"./getInventoryById-3ff089d4.js"
import{p as g}from"./perfFilter-9d404294.js"
let f
const l=[]
function b(e){e.hide()}function u(e,t){e.animate({height:0},500,t)}function w(){const e=$("#composingMessageContainer")
e.animate({opacity:0},500,d(u,e,d(b,e)))}function h(e,t){$("#composingMessageContainer").remove(),$("#composingMessage").append($("<div/>",{id:"composingMessageContainer",width:"100%"}).append(function(e,t){return $("<div/>",{id:"composingMessageText"}).css({width:"90%","text-align":"center","background-color":t,color:"rgb(255, 255, 255)",margin:"5px auto 5px auto",padding:"2px"}).html(e)}(e,t))),setTimeout(w,5e3)}function x(e){0!==e.error?h("Error: "+e.msg,"rgb(164, 28, 28)"):window.location=c+m+"breakdown&m=1"}function j(){(function(t){return e({type:"POST",data:{cmd:"composing",subcmd:"dobreakdown",item_list:t},dataType:"json"})})(l).then(x)}function k(e){f&&"breakdown-selected-items"===e.target.id&&function(e){e.stopPropagation(),0!==l.length?j():h("Error: No items selected.","rgb(164, 28, 28)")}(e)}function y(e){if(!e.target.classList.contains("selectable-item"))return
const t=e.target.id.replace("composing-item-",""),o=l.indexOf(t);-1===o?l.push(t):l.splice(o,1)}function C(){f=!f,r("disableBreakdownPrompts",f)}export default function(){t()||(g("composing"),f=o("disableBreakdownPrompts"),s(n,`<table class="fshTblCenter"><tbody>${p("disableBreakdownPrompts")}</tbody></table>`),i(a("breakdown-selected-items").parentNode,k,!0),i(a("composing-items"),y),i(a("disableBreakdownPrompts"),C))}
//# sourceMappingURL=breakdown-fd8d0f61.js.map
