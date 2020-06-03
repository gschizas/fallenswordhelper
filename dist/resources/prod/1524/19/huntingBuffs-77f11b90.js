import{c as e}from"./calfSystem-6fc0cc1b.js"
import{i as n}from"./isChecked-ce5ca840.js"
import{h as t}from"./simpleCheckbox-a0ada781.js"
import{i as o}from"./isSelected-ac8aeb31.js"
function s(){return`Hunting Buffs${t("Hunting Buffs","Customize which buffs are designated as hunting buffs. You must type the full name of each buff, separated by commas. Use the checkbox to enable/disable them.")}:`}function a(){return`<input name="showHuntingBuffs" class="fshVMid" type="checkbox" value="on"${n(e.showBuffs)}>`}function i(){return`Enabled Hunting Mode${t("Enabled Hunting Mode","This will determine which list of buffs gets checked on the world screen.")}:<select name="enabledHuntingMode"><option value="1"${o(e.enabledHuntingMode,"1")}>${e.buffsName}</option><option value="2"${o(e.enabledHuntingMode,"2")}>${e.buffs2Name}</option><option value="3"${o(e.enabledHuntingMode,"3")}>${e.buffs3Name}</option></select>`}function u(){return`${s()+a()} ${i()}`}function f(){return`<tr><td class="fshRight">${s()}</td><td colspan="3">${a()} ${i()}</td></tr>`}export{u as a,f as h}
//# sourceMappingURL=huntingBuffs-77f11b90.js.map
