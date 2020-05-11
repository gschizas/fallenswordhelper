import{cb as e,z as t,G as o,i as n,p as s,o as i,A as a,a4 as r,v as c,cc as d,at as m}from"./calfSystem-99da704d.js"
import"./isChecked-f9f6f632.js"
import{s as p}from"./simpleCheckbox-6f867e75.js"
import"./getInventory-1445ab2c.js"
import"./getInventoryById-6720d91b.js"
import{p as g}from"./perfFilter-78dee61e.js"
let l
const f=[]
function b(e){e.hide()}function u(e,t){e.animate({height:0},500,t)}function h(){const e=$("#composingMessageContainer")
e.animate({opacity:0},500,c(u,e,c(b,e)))}function w(e,t){$("#composingMessageContainer").remove(),$("#composingMessage").append($("<div/>",{id:"composingMessageContainer",width:"100%"}).append(function(e,t){return $("<div/>",{id:"composingMessageText"}).css({width:"90%","text-align":"center","background-color":t,color:"rgb(255, 255, 255)",margin:"5px auto 5px auto",padding:"2px"}).html(e)}(e,t))),setTimeout(h,5e3)}function k(e){0!==e.error?w(`Error: ${e.msg}`,"rgb(164, 28, 28)"):window.location=`${d+m}breakdown&m=1`}function y(){(function(t){return e({type:"POST",data:{cmd:"composing",subcmd:"dobreakdown",item_list:t},dataType:"json"})})(f).then(k)}function x(e){l&&"breakdown-selected-items"===e.target.id&&function(e){e.stopPropagation(),0!==f.length?y():w("Error: No items selected.","rgb(164, 28, 28)")}(e)}function j(e){if(!e.target.classList.contains("selectable-item"))return
const t=e.target.id.replace("composing-item-",""),o=f.indexOf(t);-1===o?f.push(t):f.splice(o,1)}function v(){l=!l,r("disableBreakdownPrompts",l)}export default function(){t()||(g("composing"),l=o("disableBreakdownPrompts"),n(s,`<table class="fshTblCenter"><tbody>${p("disableBreakdownPrompts")}</tbody></table>`),i(a("breakdown-selected-items").parentNode,x,!0),i(a("composing-items"),j),i(a("disableBreakdownPrompts"),v))}
//# sourceMappingURL=breakdown-6aec1ce8.js.map
