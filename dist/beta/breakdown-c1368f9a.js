import{cb as e,z as t,G as o,i as n,p as s,o as i,A as a,a4 as r,v as c,cc as d,at as m}from"./calfSystem-2fb02284.js"
import"./isChecked-bae5ae68.js"
import{s as p}from"./simpleCheckbox-7edf0371.js"
import"./getInventory-8a12d958.js"
import"./getInventoryById-bd7cfe34.js"
import{p as g}from"./perfFilter-b7bdc45e.js"
let l
const b=[]
function f(e){e.hide()}function u(e,t){e.animate({height:0},500,t)}function h(){const e=$("#composingMessageContainer")
e.animate({opacity:0},500,c(u,e,c(f,e)))}function w(e,t){$("#composingMessageContainer").remove(),$("#composingMessage").append($("<div/>",{id:"composingMessageContainer",width:"100%"}).append(function(e,t){return $("<div/>",{id:"composingMessageText"}).css({width:"90%","text-align":"center","background-color":t,color:"rgb(255, 255, 255)",margin:"5px auto 5px auto",padding:"2px"}).html(e)}(e,t))),setTimeout(h,5e3)}function k(e){0!==e.error?w("Error: "+e.msg,"rgb(164, 28, 28)"):window.location=d+m+"breakdown&m=1"}function y(){(function(t){return e({type:"POST",data:{cmd:"composing",subcmd:"dobreakdown",item_list:t},dataType:"json"})})(b).then(k)}function x(e){l&&"breakdown-selected-items"===e.target.id&&function(e){e.stopPropagation(),0!==b.length?y():w("Error: No items selected.","rgb(164, 28, 28)")}(e)}function j(e){if(!e.target.classList.contains("selectable-item"))return
const t=e.target.id.replace("composing-item-",""),o=b.indexOf(t);-1===o?b.push(t):b.splice(o,1)}function v(){l=!l,r("disableBreakdownPrompts",l)}export default function(){t()||(g("composing"),l=o("disableBreakdownPrompts"),n(s,`<table class="fshTblCenter"><tbody>${p("disableBreakdownPrompts")}</tbody></table>`),i(a("breakdown-selected-items").parentNode,x,!0),i(a("composing-items"),j),i(a("disableBreakdownPrompts"),v))}
//# sourceMappingURL=breakdown-c1368f9a.js.map
