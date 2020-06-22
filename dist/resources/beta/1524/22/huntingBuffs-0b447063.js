import{c as e}from"./calfSystem-1b876afa.js"
import{i as n}from"./isChecked-a8ba6bb9.js"
import{h as t}from"./simpleCheckbox-3997639f.js"
import{i as o}from"./isSelected-ffb8ab29.js"
function s(){return`Hunting Buffs${t("Hunting Buffs","Customize which buffs are designated as hunting buffs. You must type the full name of each buff, separated by commas. Use the checkbox to enable/disable them.")}:`}function i(){return`<input name="showHuntingBuffs" class="fshVMid" type="checkbox" value="on"${n(e.showBuffs)}>`}function a(){return`Enabled Hunting Mode${t("Enabled Hunting Mode","This will determine which list of buffs gets checked on the world screen.")}:<select name="enabledHuntingMode"><option value="1"${o(e.enabledHuntingMode,"1")}>${e.buffsName}</option><option value="2"${o(e.enabledHuntingMode,"2")}>${e.buffs2Name}</option><option value="3"${o(e.enabledHuntingMode,"3")}>${e.buffs3Name}</option></select>`}function f(){return`${s()+i()} ${a()}`}function u(){return`<tr><td class="fshRight">${s()}</td><td colspan="3">${i()} ${a()}</td></tr>`}export{f as a,u as h}
//# sourceMappingURL=huntingBuffs-0b447063.js.map
