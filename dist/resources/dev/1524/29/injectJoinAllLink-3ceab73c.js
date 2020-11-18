import{g as a,bN as i,B as n,c as t,bY as o,bZ as s}from"./calfSystem-02c48ff5.js"
import{i as c}from"./insertHtmlAfterEnd-b7d6a20f.js"
function e(a){if(!n(a).includes("New attack group created."))return
let i=""
i=t.enableMaxGroupSizeToJoin?`<a href="${s}"><span class="notification-icon"></span><p class="notification-content">Join all attack groups less than size ${t.maxGroupSizeToJoin}.</p></a>`:`<a href="${o}"><span class="notification-icon"></span><p class="notification-content">Join all attack groups.</p></a>`,c(a,`<li class="notification">${i}</li>`)}function f(){a("li",i).forEach(e)}export default f
//# sourceMappingURL=injectJoinAllLink-3ceab73c.js.map
