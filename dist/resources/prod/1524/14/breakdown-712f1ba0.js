import{c5 as e,y as t,F as o,i as n,p as s,o as i,z as a,a3 as r,u as c,c6 as d,as as m}from"./calfSystem-d587d232.js"
import"./isChecked-75e8367b.js"
import{s as p}from"./simpleCheckbox-d7dd72e2.js"
import"./getInventory-0d251a2b.js"
import"./getInventoryById-a2479f17.js"
import{p as g}from"./perfFilter-48784a64.js"
let l
const u=[]
function f(e){e.hide()}function b(e,t){e.animate({height:0},500,t)}function h(){const e=$("#composingMessageContainer")
e.animate({opacity:0},500,c(b,e,c(f,e)))}function w(e,t){$("#composingMessageContainer").remove(),$("#composingMessage").append($("<div/>",{id:"composingMessageContainer",width:"100%"}).append(function(e,t){return $("<div/>",{id:"composingMessageText"}).css({width:"90%","text-align":"center","background-color":t,color:"rgb(255, 255, 255)",margin:"5px auto 5px auto",padding:"2px"}).html(e)}(e,t))),setTimeout(h,5e3)}function k(e){0!==e.error?w("Error: "+e.msg,"rgb(164, 28, 28)"):window.location=d+m+"breakdown&m=1"}function y(){(function(t){return e({type:"POST",data:{cmd:"composing",subcmd:"dobreakdown",item_list:t},dataType:"json"})})(u).then(k)}function x(e){l&&"breakdown-selected-items"===e.target.id&&function(e){e.stopPropagation(),0!==u.length?y():w("Error: No items selected.","rgb(164, 28, 28)")}(e)}function j(e){if(!e.target.classList.contains("selectable-item"))return
const t=e.target.id.replace("composing-item-",""),o=u.indexOf(t);-1===o?u.push(t):u.splice(o,1)}function C(){l=!l,r("disableBreakdownPrompts",l)}export default function(){t()||(g("composing"),l=o("disableBreakdownPrompts"),n(s,`<table class="fshTblCenter"><tbody>${p("disableBreakdownPrompts")}</tbody></table>`),i(a("breakdown-selected-items").parentNode,x,!0),i(a("composing-items"),j),i(a("disableBreakdownPrompts"),C))}
//# sourceMappingURL=breakdown-712f1ba0.js.map
