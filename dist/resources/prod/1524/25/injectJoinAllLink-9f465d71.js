import{g as a,y as i,B as n,H as t,bT as o,bU as s}from"./calfSystem-71b9378d.js"
import{i as c}from"./insertHtmlAfterEnd-8f485add.js"
function e(a){if(!n(a).includes("New attack group created."))return
let i=""
if(t("enableMaxGroupSizeToJoin")){const a=t("maxGroupSizeToJoin")
i=`<a href="${s}"><span class="notification-icon"></span><p class="notification-content">Join all attack groups less than size ${a}.</p></a>`}else i=`<a href="${o}"><span class="notification-icon"></span><p class="notification-content">Join all attack groups.</p></a>`
c(a,`<li class="notification">${i}</li>`)}function l(){a("li",i("pCL")).forEach(e)}export default l
//# sourceMappingURL=injectJoinAllLink-9f465d71.js.map
