import{ca as e,y as t,F as o,i as n,p as s,o as a,z as i,a3 as r,u as c,cb as d,as as m}from"./calfSystem-371c414c.js"
import"./isChecked-b460a43d.js"
import{s as p}from"./simpleCheckbox-5ce6e544.js"
import"./getInventory-998297f9.js"
import"./getInventoryById-9da95555.js"
import{p as g}from"./perfFilter-9ea40de7.js"
let l
const u=[]
function f(e){e.hide()}function b(e,t){e.animate({height:0},500,t)}function h(){const e=$("#composingMessageContainer")
e.animate({opacity:0},500,c(b,e,c(f,e)))}function w(e,t){$("#composingMessageContainer").remove(),$("#composingMessage").append($("<div/>",{id:"composingMessageContainer",width:"100%"}).append(function(e,t){return $("<div/>",{id:"composingMessageText"}).css({width:"90%","text-align":"center","background-color":t,color:"rgb(255, 255, 255)",margin:"5px auto 5px auto",padding:"2px"}).html(e)}(e,t))),setTimeout(h,5e3)}function k(e){0!==e.error?w("Error: "+e.msg,"rgb(164, 28, 28)"):window.location=d+m+"breakdown&m=1"}function y(){(function(t){return e({type:"POST",data:{cmd:"composing",subcmd:"dobreakdown",item_list:t},dataType:"json"})})(u).then(k)}function x(e){l&&"breakdown-selected-items"===e.target.id&&function(e){e.stopPropagation(),0!==u.length?y():w("Error: No items selected.","rgb(164, 28, 28)")}(e)}function j(e){if(!e.target.classList.contains("selectable-item"))return
const t=e.target.id.replace("composing-item-",""),o=u.indexOf(t);-1===o?u.push(t):u.splice(o,1)}function C(){l=!l,r("disableBreakdownPrompts",l)}export default function(){t()||(g("composing"),l=o("disableBreakdownPrompts"),n(s,`<table class="fshTblCenter"><tbody>${p("disableBreakdownPrompts")}</tbody></table>`),a(i("breakdown-selected-items").parentNode,x,!0),a(i("composing-items"),j),a(i("disableBreakdownPrompts"),C))}
//# sourceMappingURL=breakdown-9b20bed8.js.map
