import{g as a,bH as i,B as n,c as t,bS as o,bT as s}from"./calfSystem-3bdf319e.js"
import{i as c}from"./insertHtmlAfterEnd-56f50dfb.js"
function e(a){if(!n(a).includes("New attack group created."))return
let i=""
i=t.enableMaxGroupSizeToJoin?`<a href="${s}"><span class="notification-icon"></span><p class="notification-content">Join all attack groups less than size ${t.maxGroupSizeToJoin}.</p></a>`:`<a href="${o}"><span class="notification-icon"></span><p class="notification-content">Join all attack groups.</p></a>`,c(a,`<li class="notification">${i}</li>`)}function f(){a("li",i).forEach(e)}export default f
//# sourceMappingURL=injectJoinAllLink-145f64c3.js.map
