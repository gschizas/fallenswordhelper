import{e}from"./calfSystem-fb94ddf0.js"
import{i as n}from"./isChecked-b3e3c765.js"
import{h as t}from"./simpleCheckbox-67fe70a6.js"
import{i as o}from"./isSelected-25bedb0e.js"
function s(){return`Hunting Buffs${t("Hunting Buffs","Customize which buffs are designated as hunting buffs. You must type the full name of each buff, separated by commas. Use the checkbox to enable/disable them.")}:`}function i(){return'<input name="showHuntingBuffs" '+`class="fshVMid" type="checkbox" value="on"${n(e.showBuffs)}>`}function f(){return`Enabled Hunting Mode${t("Enabled Hunting Mode","This will determine which list of buffs gets checked on the world screen.")}:<select name="enabledHuntingMode">`+`<option value="1"${o(e.enabledHuntingMode,"1")}>${e.buffsName}</option>`+`<option value="2"${o(e.enabledHuntingMode,"2")}>${e.buffs2Name}</option>`+`<option value="3"${o(e.enabledHuntingMode,"3")}>${e.buffs3Name}</option>`+"</select>"}function u(){return`${s()+i()} ${f()}`}function a(){return`<tr><td class="fshRight">${s()}</td><td colspan="3">${i()} ${f()}</td></tr>`}export{u as a,a as h}
//# sourceMappingURL=huntingBuffs-70ef6c77.js.map
