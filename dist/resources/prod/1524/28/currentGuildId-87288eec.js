import{g as t,B as c}from"./calfSystem-a5da5210.js"
let o
function a(t){const a=c(t).match(/\s+guildId: ([0-9]+),/)
a&&(o=Number(a[1]))}function r(){return o||t("script",document.body).forEach(a),o}export{r as c}
//# sourceMappingURL=currentGuildId-87288eec.js.map
