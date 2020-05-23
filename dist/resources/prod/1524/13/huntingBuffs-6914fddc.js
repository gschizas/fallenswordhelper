import{e}from"./calfSystem-e6a24264.js"
import{i as n}from"./isChecked-2896c552.js"
import{h as t}from"./simpleCheckbox-1004d6af.js"
import{i as o}from"./isSelected-f6990aa9.js"
function s(){return`Hunting Buffs${t("Hunting Buffs","Customize which buffs are designated as hunting buffs. You must type the full name of each buff, separated by commas. Use the checkbox to enable/disable them.")}:`}function i(){return`<input name="showHuntingBuffs" class="fshVMid" type="checkbox" value="on"${n(e.showBuffs)}>`}function a(){return`Enabled Hunting Mode${t("Enabled Hunting Mode","This will determine which list of buffs gets checked on the world screen.")}:<select name="enabledHuntingMode"><option value="1"${o(e.enabledHuntingMode,"1")}>${e.buffsName}</option><option value="2"${o(e.enabledHuntingMode,"2")}>${e.buffs2Name}</option><option value="3"${o(e.enabledHuntingMode,"3")}>${e.buffs3Name}</option></select>`}function u(){return`${s()+i()} ${a()}`}function f(){return`<tr><td class="fshRight">${s()}</td><td colspan="3">${i()} ${a()}</td></tr>`}export{u as a,f as h}
//# sourceMappingURL=huntingBuffs-6914fddc.js.map
