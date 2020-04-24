import{e}from"./calfSystem-c91e004c.js"
import{i as n}from"./isChecked-ba1d4cd2.js"
import{h as t}from"./simpleCheckbox-0fc09da7.js"
import{i as o}from"./isSelected-23025101.js"
function s(){return`Hunting Buffs${t("Hunting Buffs","Customize which buffs are designated as hunting buffs. You must type the full name of each buff, separated by commas. Use the checkbox to enable/disable them.")}:`}function i(){return'<input name="showHuntingBuffs" '+`class="fshVMid" type="checkbox" value="on"${n(e.showBuffs)}>`}function u(){return`Enabled Hunting Mode${t("Enabled Hunting Mode","This will determine which list of buffs gets checked on the world screen.")}:<select name="enabledHuntingMode">`+`<option value="1"${o(e.enabledHuntingMode,"1")}>${e.buffsName}</option>`+`<option value="2"${o(e.enabledHuntingMode,"2")}>${e.buffs2Name}</option>`+`<option value="3"${o(e.enabledHuntingMode,"3")}>${e.buffs3Name}</option>`+"</select>"}function a(){return`${s()+i()} ${u()}`}function f(){return`<tr><td class="fshRight">${s()}</td><td colspan="3">${i()} ${u()}</td></tr>`}export{a,f as h}
//# sourceMappingURL=huntingBuffs-5fb67c52.js.map
