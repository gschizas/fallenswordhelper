import{e}from"./calfSystem-72fdbe97.js"
import{i as n}from"./isChecked-66e1d489.js"
import{h as t}from"./simpleCheckbox-c6b19142.js"
import{i as o}from"./isSelected-2c686564.js"
function s(){return`Hunting Buffs${t("Hunting Buffs","Customize which buffs are designated as hunting buffs. You must type the full name of each buff, separated by commas. Use the checkbox to enable/disable them.")}:`}function i(){return'<input name="showHuntingBuffs" '+`class="fshVMid" type="checkbox" value="on"${n(e.showBuffs)}>`}function u(){return`Enabled Hunting Mode${t("Enabled Hunting Mode","This will determine which list of buffs gets checked on the world screen.")}:<select name="enabledHuntingMode">`+`<option value="1"${o(e.enabledHuntingMode,"1")}>${e.buffsName}</option>`+`<option value="2"${o(e.enabledHuntingMode,"2")}>${e.buffs2Name}</option>`+`<option value="3"${o(e.enabledHuntingMode,"3")}>${e.buffs3Name}</option>`+"</select>"}function f(){return`${s()+i()} ${u()}`}function a(){return`<tr><td class="fshRight">${s()}</td><td colspan="3">${i()} ${u()}</td></tr>`}export{f as a,a as h}
//# sourceMappingURL=huntingBuffs-d093493e.js.map
