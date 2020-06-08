import{r as e,x as t,G as o,i as s,p as n,o as a,y as i,k as r,Z as c,t as d,bI as m,as as p}from"./calfSystem-a2862afc.js"
import"./isChecked-e0d689b2.js"
import{s as g}from"./simpleCheckbox-c8f3914c.js"
import"./indexAjaxJson-afc1ac85.js"
import"./cmdExport-356fd6f3.js"
import"./guildStore-559bcd67.js"
import"./getInventory-77b8ed5e.js"
import"./getInventoryById-7e10dff9.js"
import"./getArrayByClassName-c1e64010.js"
import{p as f}from"./perfFilter-43858aae.js"
let l
const b=[]
function u(e){e.hide()}function h(e,t){e.animate({height:0},500,t)}function j(){const e=$("#composingMessageContainer")
e.animate({opacity:0},500,d(h,e,d(u,e)))}function k(e,t){$("#composingMessageContainer").remove(),$("#composingMessage").append($("<div/>",{id:"composingMessageContainer",width:"100%"}).append(function(e,t){return $("<div/>",{id:"composingMessageText"}).css({width:"90%","text-align":"center","background-color":t,color:"rgb(255, 255, 255)",margin:"5px auto 5px auto",padding:"2px"}).html(e)}(e,t))),setTimeout(j,5e3)}function w(e){0!==e.error?k("Error: "+e.msg,"rgb(164, 28, 28)"):window.location=m+p+"breakdown&m=1"}function x(){(function(t){return e({type:"POST",data:{cmd:"composing",subcmd:"dobreakdown",item_list:t},dataType:"json"})})(b).then(w)}function y(e){l&&"breakdown-selected-items"===e.target.id&&function(e){e.stopPropagation(),0!==b.length?x():k("Error: No items selected.","rgb(164, 28, 28)")}(e)}function C(e){if(!r("selectable-item",e.target))return
const t=e.target.id.replace("composing-item-",""),o=b.indexOf(t);-1===o?b.push(t):b.splice(o,1)}function B(){l=!l,c("disableBreakdownPrompts",l)}export default function(){t()||(f("composing"),l=o("disableBreakdownPrompts"),s(n,`<table class="fshTblCenter"><tbody>${g("disableBreakdownPrompts")}</tbody></table>`),a(i("breakdown-selected-items").parentNode,y,!0),a(i("composing-items"),C),a(i("disableBreakdownPrompts"),B))}
//# sourceMappingURL=breakdown-9364b7d6.js.map
