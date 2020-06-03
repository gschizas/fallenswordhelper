import{q as e,w as t,D as o,i as s,p as n,o as i,x as a,W as r,s as c,bI as d,an as m}from"./calfSystem-8b6534a5.js"
import"./isChecked-cb800ed0.js"
import{s as p}from"./simpleCheckbox-c60a3930.js"
import"./getArrayByClassName-6b8fb696.js"
import"./indexAjaxJson-b43ddbcc.js"
import"./cmdExport-a4cd29b8.js"
import"./getInventory-1e8cb5f4.js"
import"./getInventoryById-182cb218.js"
import{p as g}from"./perfFilter-cdd073d1.js"
let b
const l=[]
function f(e){e.hide()}function u(e,t){e.animate({height:0},500,t)}function w(){const e=$("#composingMessageContainer")
e.animate({opacity:0},500,c(u,e,c(f,e)))}function h(e,t){$("#composingMessageContainer").remove(),$("#composingMessage").append($("<div/>",{id:"composingMessageContainer",width:"100%"}).append(function(e,t){return $("<div/>",{id:"composingMessageText"}).css({width:"90%","text-align":"center","background-color":t,color:"rgb(255, 255, 255)",margin:"5px auto 5px auto",padding:"2px"}).html(e)}(e,t))),setTimeout(w,5e3)}function x(e){0!==e.error?h("Error: "+e.msg,"rgb(164, 28, 28)"):window.location=d+m+"breakdown&m=1"}function j(){(function(t){return e({type:"POST",data:{cmd:"composing",subcmd:"dobreakdown",item_list:t},dataType:"json"})})(l).then(x)}function k(e){b&&"breakdown-selected-items"===e.target.id&&function(e){e.stopPropagation(),0!==l.length?j():h("Error: No items selected.","rgb(164, 28, 28)")}(e)}function y(e){if(!e.target.classList.contains("selectable-item"))return
const t=e.target.id.replace("composing-item-",""),o=l.indexOf(t);-1===o?l.push(t):l.splice(o,1)}function C(){b=!b,r("disableBreakdownPrompts",b)}export default function(){t()||(g("composing"),b=o("disableBreakdownPrompts"),s(n,`<table class="fshTblCenter"><tbody>${p("disableBreakdownPrompts")}</tbody></table>`),i(a("breakdown-selected-items").parentNode,k,!0),i(a("composing-items"),y),i(a("disableBreakdownPrompts"),C))}
//# sourceMappingURL=breakdown-480cd793.js.map
