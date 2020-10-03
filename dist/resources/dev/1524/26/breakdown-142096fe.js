import{r as e,x as t,H as o,i as s,p as n,o as i,y as a,l as r,Z as d,t as c,bG as m,as as p}from"./calfSystem-4991bf5b.js"
import"./isChecked-4820f42a.js"
import{s as g}from"./simpleCheckbox-07c276d2.js"
import"./indexAjaxJson-b9139aa9.js"
import"./cmdExport-f5c9af35.js"
import"./guildStore-dcedb79d.js"
import"./getInventory-9b5d4291.js"
import"./getInventoryById-5eb1ebd7.js"
import"./getArrayByClassName-7efc50e3.js"
import{p as l}from"./perfFilter-7c52fcdb.js"
let b
const f=[]
function u(e){e.hide()}function h(e,t){e.animate({height:0},500,t)}function j(){const e=$("#composingMessageContainer")
e.animate({opacity:0},500,c(h,e,c(u,e)))}function w(e,t){$("#composingMessageContainer").remove(),$("#composingMessage").append($("<div/>",{id:"composingMessageContainer",width:"100%"}).append(function(e,t){return $("<div/>",{id:"composingMessageText"}).css({width:"90%","text-align":"center","background-color":t,color:"rgb(255, 255, 255)",margin:"5px auto 5px auto",padding:"2px"}).html(e)}(e,t))),setTimeout(j,5e3)}function x(e){0!==e.error?w("Error: "+e.msg,"rgb(164, 28, 28)"):window.location=m+p+"breakdown&m=1"}function y(){(function(t){return e({type:"POST",data:{cmd:"composing",subcmd:"dobreakdown",item_list:t},dataType:"json"})})(f).then(x)}function k(e){b&&"breakdown-selected-items"===e.target.id&&function(e){e.stopPropagation(),0!==f.length?y():w("Error: No items selected.","rgb(164, 28, 28)")}(e)}function C(e){if(!r("selectable-item",e.target))return
const t=e.target.id.replace("composing-item-",""),o=f.indexOf(t);-1===o?f.push(t):f.splice(o,1)}function B(){b=!b,d("disableBreakdownPrompts",b)}function P(){t()||(l("composing"),b=o("disableBreakdownPrompts"),s(n,`<table class="fshTblCenter"><tbody>${g("disableBreakdownPrompts")}</tbody></table>`),i(a("breakdown-selected-items").parentNode,k,!0),i(a("composing-items"),C),i(a("disableBreakdownPrompts"),B))}export default P
//# sourceMappingURL=breakdown-142096fe.js.map
