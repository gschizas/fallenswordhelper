import{U as e,o as t,A as n,h as s,a1 as i,a2 as a,a3 as o,a4 as l,S as r,a5 as u,e as d,a6 as h,G as c,a7 as p,a8 as g,a9 as f,aa as b,z as m}from"./calfSystem-70b0df7f.js"
import{n as y}from"./numberIsNaN-888b325e.js"
import{i as v}from"./isChecked-c96092db.js"
import{s as w,n as S,h as k,i as L,j as G,a as B}from"./simpleCheckbox-13baa371.js"
import{c as T}from"./createBr-9b6d3893.js"
import{d as x}from"./dialogMsg-0ef0d146.js"
import{t as M}from"./toggleVisibilty-537a0cb4.js"
import{j as N}from"./jConfirm-3c372311.js"
import{i as C}from"./isSelected-a73fc347.js"
import{h as R}from"./huntingBuffs-43c11d16.js"
var P=["navigateToLogAfterMsg","gameHelpLink","guildSelf","guildSelfMessage","guildFrnd","guildFrndMessage","guildPast","guildPastMessage","guildEnmy","guildEnmyMessage","showAdmin","ajaxifyRankControls","detailedConflictInfo","disableItemColoring","enableLogColoring","enableChatParsing","enableCreatureColoring","hideNonPlayerGuildLogMessages","buyBuffsGreeting","renderSelfBio","renderOtherBios","defaultMessageSound","showSpeakerOnWorld","playNewMessageSound","highlightPlayersNearMyLvl","highlightGvGPlayersNearMyLvl","showCombatLog","showMonsterLog","showCreatureInfo","keepLogs","enableGuildInfoWidgets","enableOnlineAlliesWidgets","hideGuildInfoMessage","hideGuildInfoBuff","hideGuildInfoSecureTrade","hideGuildInfoTrade","huntingBuffs","huntingBuffsName","huntingBuffs2","huntingBuffs2Name","huntingBuffs3","huntingBuffs3Name","showHuntingBuffs","moveGuildList","moveOnlineAlliesList","moveFSBox","moveDailyQuest","hideQuests","hideQuestNames","hideRecipes","hideRecipeNames","doNotKillList","enableBioCompressor","sendGoldonWorld","goldRecipient","goldAmount","keepBuffLog","showQuickSendLinks","showQuickDropLinks","sendClasses","itemRecipient","currentGoldSentTotal","enableAllyOnlineList","enableEnemyOnlineList","allyEnemyOnlineRefreshTime","quickLinksTopPx","quickLinksLeftPx","draggableQuickLinks","enableActiveBountyList","bountyListRefreshTime","enableWantedList","wantedNames","wantedGuildMembers","fsboxlog","huntingMode","enableAttackHelper","hideRelicOffline","enterForSendMessage","storeLastQuestPage","addAttackLinkToLog","showStatBonusTotal","newGuildLogHistoryPages","useNewGuildLog","enhanceChatTextEntry","enableMaxGroupSizeToJoin","maxGroupSizeToJoin","enableTempleAlert","enableUpgradeAlert","enableComposingAlert","autoFillMinBidPrice","showPvPSummaryInLog","enableQuickDrink","enhanceOnlineDots","hideBuffSelected","hideHelperMenu","keepHelperMenuOnScreen","draggableHelperMenu","showNextQuestSteps","hideChampionsGroup","hideElitesGroup","hideSEGroup","hideTitanGroup","hideLegendaryGroup","disableDeactivatePrompts","moveComposingButtons","showExtraLinks","expandMenuOnKeyPress","highlightPvpProtection","enableHistoryCompressor"]
function H(e,t){return r(`#fshSettingsTable ${e}[name="${t}"]`)}function E(e){return H("input",e)}function A(e){return H("select",e)}function O(e){const t=$('input[name^="blockedSkillList"]:visible',"#settingsTabs-4"),n=$(e.target)
t.prop("checked","Tick all buffs"===n.text()),"Tick all buffs"===n.text()?n.text("Untick all buffs"):n.text("Tick all buffs")}function z(){N("Clear localStorage","Are you sure you want to clear you localStorage?",()=>{localStorage.clear()})}function I(e){const t=E(e)
"checkbox"===t.type?u(e,t.checked):u(e,t.value)}function Q(e,t,n){const s=E(e),i=Number(s.value);(y(i)||i<=t)&&(s.value=n)}function W(){Q("newGuildLogHistoryPages",1,25),Q("maxGroupSizeToJoin",1,11),function(e){const t=A(e)
u(e,Number(t.value))}("combatEvaluatorBias"),function(e){const t=A(e)
u(e,t.value)}("enabledHuntingMode"),P.forEach(I),x("FS Helper Settings Saved")}function F(){i("settingsPage","injectNotepadShowLogs"),a(o)}function q(){i("settingsPage","injectMonsterLog"),a(l)}function j(e){t(n(e[0]),e[1])}function D(e){t(n(e),M)}function J(){!function(){const i=e({id:"fshAllBuffs",className:"fshLink",textContent:"Tick all buffs"})
t(i,O)
const a=n("settingsTabs-4").children[0].rows[0].cells[0]
s(a,T()),s(a,i)}(),[["fshClearStorage",z],["Helper:SaveOptions",W],["Helper:ShowLogs",F],["Helper:ShowMonsterLogs",q]].forEach(j),["toggleShowGuildSelfMessage","toggleShowGuildFrndMessage","toggleShowGuildPastMessage","toggleShowGuildEnmyMessage"].forEach(D)}function K(e){d[e[0]]=c(e[1])}function U(){[["showBuffs","showHuntingBuffs"],["buffs","huntingBuffs"],["buffsName","huntingBuffsName"],["buffs2","huntingBuffs2"],["buffs2Name","huntingBuffs2Name"],["buffs3","huntingBuffs3"],["buffs3Name","huntingBuffs3Name"]].forEach(K),["doNotKillList","bountyListRefreshTime","wantedNames","combatEvaluatorBias","enabledHuntingMode"].forEach(h),d.storage=(JSON.stringify(localStorage).length/5242880*100).toFixed(2)}function V(e,t){return e+w(t)}function Y(e){return e.reduce(V,"")}function X(){return`<tr><th colspan="2"><b>Bounty hunting preferences</b></th></tr>${`<tr><td align= "right">${S}Show Active Bounties${k("Show Active Bounties","This will show your active bounties on the right hand side")}:</td><td colspan="3"><input name="enableActiveBountyList" `+`type = "checkbox" value = "on"${v(d.enableActiveBountyList)}>&nbsp;`+`<input name="bountyListRefreshTime" size="3" value="${d.bountyListRefreshTime}"> seconds refresh</td></tr>`}${`<tr><td align= "right">${S}Show Wanted Bounties${k("Show Wanted Bounties","This will show when someone you want is on the bounty board, the list is displayed on the right hand side")}:</td><td colspan="3"><input name="enableWantedList" `+`type="checkbox" value="on"${v(d.enableWantedList)}> Refresh time is same as Active Bounties`}${`<tr><td align= "right">Wanted Names${k("Wanted Names","The names of the people you want to see on the bounty board separated by commas (or * for all)")}:</td><td colspan="3">`+`<input name="wantedNames" size="60" value="${d.wantedNames}"></td></tr>`}${Y(["wantedGuildMembers","enableAttackHelper","showPvPSummaryInLog"])}`}function _(){return'<tr><th colspan="2"><b>Equipment screen preferences</b></th></tr>'+`${Y(["showExtraLinks","disableItemColoring"])}${`<tr><td class="fshRight">Show Quick Send Item${k("Show Quick Send on Manage Backpack","This will show a link beside each item which gives the option to quick send the item to this person")}:</td><td><input name="showQuickSendLinks" type="checkbox" `+`value="on"${L("showQuickSendLinks")}>`+"&nbsp;&nbsp;Send Items To "+`<input name="itemRecipient" size="10" value="${c("itemRecipient")}">`}${w("showQuickDropLinks")}${`<tr><td class="fshRight">Quick Select all of type in Send Screen${k("Quick Select all of type in Send Screen","This allows you to customize what quick links you would like displayed in your send item screen.<br>Use the format [&quot;name&quot;,&quot;itemid&quot;],[&quot;othername&quot;,&quot;itemid2&quot;].<br>WARNING: NO REFUNDS ON ERROR")}:</td><td><input name="sendClasses" size="60" value="${p(c("sendClasses"))}">`}`}const Z=["moveGuildList","moveOnlineAlliesList"],ee=["enableOnlineAlliesWidgets","moveFSBox","moveDailyQuest","fsboxlog","gameHelpLink","enableTempleAlert","enableUpgradeAlert","enableComposingAlert","enhanceOnlineDots","hideBuffSelected","hideHelperMenu","keepHelperMenuOnScreen","draggableHelperMenu"],te=["draggableQuickLinks","expandMenuOnKeyPress"]
function ne(){return'<tr><th colspan="2"><b>General preferences '+`(apply to most screens)</b></th></tr>${'<tr><td class="fshRight"><label for="enableGuildInfoWidgets">'+`Enable Guild Info Widgets${k("Enable Guild Info Widgets","Enabling this option will enable the Guild Info Widgets (coloring on the Guild Info panel)")}:</label></td><td>`+'<input id="enableGuildInfoWidgets" name="enableGuildInfoWidgets" '+`type="checkbox" value="on"${v(d.enableGuildInfoWidgets)}>`+"&nbsp;<label>Hide Message&gt;"+`<input name="hideGuildInfoMessage" type="checkbox" value="on"${v(d.hideGuildInfoMessage)}></label>`+"&nbsp;<label>Hide Buff&gt;"+`<input name="hideGuildInfoBuff" type="checkbox" value="on"${v(d.hideGuildInfoBuff)}></label>`+"&nbsp;<label>Hide ST&gt;"+`<input name="hideGuildInfoSecureTrade" type="checkbox" value="on"${v(d.hideGuildInfoSecureTrade)}></label>`+"&nbsp;<label>Hide Trade&gt;"+`<input name="hideGuildInfoTrade" type="checkbox" value="on"${v(d.hideGuildInfoTrade)}></label></td></tr>`}${Y(Z)}${`<tr><td class="fshRight">${S}Show Online Allies/Enemies${k("Show Online Allies/Enemies","This will show the allies/enemies online list on the right.")}:</td>`+"<td><label>Allies&nbsp;"+`<input name="enableAllyOnlineList" type="checkbox" value="on"${v(d.enableAllyOnlineList)}></label>&nbsp;&nbsp;`+"<label>Enemies&nbsp;"+`<input name="enableEnemyOnlineList" type="checkbox" value="on"${v(d.enableEnemyOnlineList)}></label>&nbsp;&nbsp;`+`<input name="allyEnemyOnlineRefreshTime" size="3" value="${c("allyEnemyOnlineRefreshTime")}"> seconds refresh</td></tr>`}${Y(ee)}${`<tr><td class="fshRight">Quick Links Screen Location${k("Quick Links Screen Location","Determines where the quick links dialog shows on the screen. Default is top 22, left 0.")}:</td>`+`<td>Top: <input name="quickLinksTopPx" size="3" value="${c("quickLinksTopPx")}"> `+`Left: <input name="quickLinksLeftPx" size="3" value="${c("quickLinksLeftPx")}"></td></tr>`}${Y(te)}`}function se(e){let t="",n=""
return"Self"===e&&(t=' title="This is automatically detected"',n=" disabled"),`<input${t} name="guild${e}" size="60" value="${c(`guild${e}`)}"${n}>`+'<span class="fshPoint" '+`id="toggleShowGuild${e}Message" data-linkto="showGuild${e}Message"> &#x00bb;</span>`+`<div id="showGuild${e}Message" class="fshHide">`+`<input name="guild${e}Message" size="60" value="${c(`guild${e}Message`)}">`+"</div>"}function ie(){return'<tr><th colspan="2"><b>Guild>Manage preferences'+`</b></th></tr>${'<tr><td colspan="2">Enter guild names, separated by commas</td></tr>'+`<tr><td class="fshRight">Own Guild</td><td>${se("Self")}</td></tr>`+`<tr><td class="fshRight">Friendly Guilds</td><td>${se("Frnd")}</td></tr>`+`<tr><td class="fshRight">Old Guilds</td><td>${se("Past")}</td></tr>`+`<tr><td class="fshRight">Enemy Guilds</td><td>${se("Enmy")}</td></tr>`}${`<tr><td class="fshRight">Highlight Valid PvP Targets${k("Highlight Valid PvP Targets","Enabling this option will highlight targets in OTHER guilds that are within your level range to attack for PvP or GvG.")}:</td><td>PvP: <input name="highlightPlayersNearMyLvl" `+`type="checkbox" value="on"${L("highlightPlayersNearMyLvl")}> GvG: <input name="highlightGvGPlayersNearMyLvl" `+`type="checkbox" value="on"${L("highlightGvGPlayersNearMyLvl")}></td></tr>`}${Y(["showAdmin","ajaxifyRankControls","detailedConflictInfo","enableHistoryCompressor"])}`}function ae(){return`<tr><th colspan="2"><b>Log screen preferences</b></th></tr>${Y(["hideNonPlayerGuildLogMessages","useNewGuildLog"])}${`<tr><td class="fshRight">New Guild Log History${k("New Guild Log History (pages)","This is the number of pages that the new guild log screen will go back in history.")}:</td><td><input name="newGuildLogHistoryPages" size="3" value="${c("newGuildLogHistoryPages")}"></td></td></tr>`}${w("enableLogColoring")}${`<tr><td class="fshRight">New Log Message Sound${k("New Log Message Sound","The .wav or .ogg file to play when you have unread log messages. This must be a .wav or .ogg file. This option can be turned on/off on the world page. Only works in Firefox 3.5+")}:</td><td colspan="3"><input name="defaultMessageSound" size="60" `+`value="${c("defaultMessageSound")}"></td></tr>`}${`<tr><td class="fshRight">Play sound on unread log${k("Play sound on unread log","Should the above sound play when you have unread log messages? (will work on Firefox 3.5+ only)")}:</td><td><input name="playNewMessageSound" type="checkbox" `+`value="on"${L("playNewMessageSound")}>`+` Show speaker on world${k("Show speaker on world","Should the toggle play sound speaker show on the world map? (This icon is next to the Fallensword wiki icon and will only display on Firefox 3.5+)")}:<input name="showSpeakerOnWorld" type="checkbox" value="on"${L("showSpeakerOnWorld")}></tr></td>`}${Y(["enableChatParsing","keepBuffLog","addAttackLinkToLog","enhanceChatTextEntry"])}`}function oe(){return`<tr><th colspan="2"><b>Other preferences</b></th></tr>${w("autoFillMinBidPrice")}${`<tr><td class="fshRight">Hide Specific Recipes${k("Hide Specific Recipes","If enabled, this hides recipes whose name matches the list (separated by commas). This works on Recipe Manager")}:</td><td colspan="3"><input name="hideRecipes" `+`type="checkbox" value="on"${L("hideRecipes")}>`+`&nbsp;<input name="hideRecipeNames" size="60" value="${c("hideRecipeNames")}"></td></tr>`}${Y(["hideRelicOffline","enterForSendMessage","navigateToLogAfterMsg"])}${`<tr><td align= "right">Max Group Size to Join${k("Max Group Size to Join","This will disable HCSs Join All functionality and will only join groups less than a set size. ")}:</td><td colspan="3"><input name="enableMaxGroupSizeToJoin" `+`type = "checkbox" value = "on"${L("enableMaxGroupSizeToJoin")}>&nbsp;&nbsp;Max Size: `+`<input name="maxGroupSizeToJoin" size="3" value="${c("maxGroupSizeToJoin")}"></td></tr>`}${w("moveComposingButtons")}`}function le(e,t,n,s){return`<tr><td class="fshRight">${e} Hunting Buff List${k(`${e} Hunting Buff List`,`${e} list of hunting buffs.`)}:</td><td colspan="3"><input name="${t}" title="Hunting mode name" size="7" value="${e}"><input name="${n}" size="49" value="${s}"></td></tr>`}function re(){return'<tr><th colspan="2"><b>'+`World screen/Hunting preferences</b></th></tr>${`<tr><td class="fshRight">Hide Create Group Button${k("Hide Create Group Button","Enabling this option will hide the Create Group button")}:</td><td>`+`<input name="hideChampionsGroup" type="checkbox" value="on"${L("hideChampionsGroup")}>`+"&nbsp;Champions&nbsp;&nbsp;"+`<input name="hideElitesGroup" type="checkbox" value="on"${L("hideElitesGroup")}>`+"&nbsp;Elites&nbsp;&nbsp;"+`<input name="hideSEGroup" type="checkbox" value="on"${L("hideSEGroup")}>`+"&nbsp;Super Elite&nbsp;&nbsp;"+`<input name="hideTitanGroup" type="checkbox" value="on"${L("hideTitanGroup")}>`+"&nbsp;Titan&nbsp;&nbsp;"+`<input name="hideLegendaryGroup" type="checkbox" value="on"${L("hideLegendaryGroup")}>`+"&nbsp;Legendary</td></tr>"}${`<tr><td class="fshRight">Keep Combat Logs${k("Keep Combat Logs","Save combat logs to a temporary variable. Press <u>Show logs</u> on the right to display and copy them")}:</td><td><input name="keepLogs" type="checkbox" value="on"${L("keepLogs")}>&nbsp;&nbsp;`+'<input type="button" class="custombutton" value="Show Logs" id="Helper:ShowLogs"></td></tr>'}${Y(["showCombatLog","enableCreatureColoring","showCreatureInfo"])}${[`<tr><td class="fshRight">Combat Evaluator Bias${k("Combat Evaluator Bias","This changes the bias of the combat evaluator for the damage and HP evaluation. It will not change the attack bias (1.1053).<br>Conservative = 1.1053 and 1.1 (Safest)<br>Semi-Conservative = 1.1 and 1.053<br>Adventurous = 1.053 and 1 (Bleeding Edge)<br>Conservative+ = 1.1053 and 1 with the attack calculation changed to +-48 per RJEM")}:</td><td><select name="combatEvaluatorBias">`+`<option value="0"${C(d.combatEvaluatorBias,0)}>Conservative</option>`+`<option value="1"${C(d.combatEvaluatorBias,1)}>Semi-Conservative</option>`+`<option value="2"${C(d.combatEvaluatorBias,2)}>Adventurous</option>`+`<option value="3"${C(d.combatEvaluatorBias,3)}>Conservative+</option></select></td></tr>`,`<tr><td class="fshRight">${G("showMonsterLog")}</td><td>${B("showMonsterLog")}&nbsp;&nbsp;<input type="button" class="custombutton" `+'value="Show" id="Helper:ShowMonsterLogs"></td></tr>',`<tr><td class="fshRight">Show Send Gold${k("Show Gold on World Screen","This will show an icon below the world map to allow you to quickly send gold to a Friend.")}:</td><td><input name="sendGoldonWorld" type="checkbox" value="on"${L("sendGoldonWorld")}>`+`&nbsp;&nbsp;Send <input name="goldAmount" size="5" value="${c("goldAmount")}"> `+`gold to <input name="goldRecipient" size="10" value="${c("goldRecipient")}">`+` Current total: <input name="currentGoldSentTotal" size="5" value="${c("currentGoldSentTotal")}"></td></tr>`,`<tr><td class="fshRight">Do Not Kill List${k("Do Not Kill List","List of creatures that will not be killed by quick kill. You must type the full name of each creature, separated by commas. Creature name will show up in red color on world screen and will not be killed by keyboard entry (but can still be killed by mouseclick). Quick kill must be enabled for this function to work.")}:</td><td colspan="3"><input name="doNotKillList" size="60" value="${d.doNotKillList}"></td></tr>`,R(),le(d.buffsName,"huntingBuffsName","huntingBuffs",d.buffs)+le(d.buffs2Name,"huntingBuffs2Name","huntingBuffs2",d.buffs2)+le(d.buffs3Name,"huntingBuffs3Name","huntingBuffs3",d.buffs3)].join("")}${w("huntingMode")}`}function ue(){return`<tr><th colspan="2"><b>Profile preferences</b></th></tr>${Y(["renderSelfBio","renderOtherBios","enableBioCompressor"])}${`<tr><td class="fshRight">Buy Buffs Greeting${k("Buy Buffs Greeting","This is the default text to open a message with when asking to buy buffs. You can use {playername} to insert the target players name. You can also use {buffs} to insert the list of buffs. You can use {cost} to insert the total cost of the buffs.")}:</td><td colspan="3"><input name="buyBuffsGreeting" size="60" `+`value="${c("buyBuffsGreeting")}"></td></tr>`}${Y(["showStatBonusTotal","enableQuickDrink","disableDeactivatePrompts","highlightPvpProtection"])}`}function de(){return'<tr><th colspan="2"><b>Quest preferences</b></th></tr>'+`<tr><td class="fshRight">Hide Specific Quests${k("Hide Specific Quests","If enabled, this hides quests whose name matches the list (separated by commas).")}:</td><td colspan="3"><input name="hideQuests" type="checkbox" `+`value="on"${L("hideQuests")}>`+`&nbsp;<input name="hideQuestNames" size="60" value="${c("hideQuestNames")}"></td></tr>${Y(["storeLastQuestPage","showNextQuestSteps"])}`}function he(e,t,n,s){let i=`${e}<a href="${b}${t[0]}">${t[1]}</a>`
return n===s.length-2?i+=" and ":n!==s.length-1&&(i+=", "),i}function ce(e){return e.reduce(he,"")}function pe(){d.configData='<form><table id="fshSettingsTable"><thead><th colspan="2"><b>Fallen Sword Helper configuration '+`Settings</b></th></thead>${'<tr><td align=center><input id="fshClearStorage" type="button" class="awesome magenta tip-static" value="Clear Storage" data-tipped="<span class=\'fshHelpTitle\'>Clear Storage</span><br><br>This will clear all localStorage related to fallensword.com<br>It will reset all your Helper settings to defaults<br>Use it if your storage has overflowed or become corrupt"></td><td align=center>'+`<span style="font-size:x-small">(Current version: ${d.fshVer}(${d.calfVer})) (Storage Used: ${d.storage}% Remaining: ${(100-d.storage).toFixed(2)}%)</span></td></tr>`}<tr><td colspan="2" align=center><span style="font-weight:bold;">Visit the <a href="https://github.com/fallenswordhelper/fallenswordhelper">Fallen Sword Helper web site</a> for any suggestions, requests or bug reports</span></td></tr>${[ne,ie,re,ae,_,de,ue,X,oe].map(g).join("")}<tr><td colspan="2" align=center><input type="button" class=`+'"custombutton" value="Save" id="Helper:SaveOptions"></td></tr><tr><td colspan="2" align=center>'+`<a href="${f}savesettings">`+`Export or Load Settings!</a></td></tr>${'<tr><td colspan="2" align=center>'+`<span class="fshXXSmall">Fallen Sword Helper was coded by ${ce([["1393340","Coccinella"],["1599987","yuuzhan"],["1963510","PointyHair"],["1346893","Tangtop"],["2536682","dkwizard"],["1570854","jesiegel"],["2156859","ByteBoy"],["2169401","McBush"]])}, with valuable contributions by ${ce([["524660","Nabalac"],["37905","Ananasii"]])}</span></td></tr>`}</table></form>`}function ge(e){var t
U(),pe(),(t=e).find(".ui-tabs-nav").append('<li><a href="#fshSettings">FSH</a></li>'),t.append(`<div id="fshSettings"><p>${d.configData}</p></div>`),t.tabs("refresh"),J(),u("minGroupLevel",r('input[name="min_group_level"]').value)}export default function(){if(m())return
const e=$("#settingsTabs")
e.tabs("instance")&&ge(e)}
//# sourceMappingURL=injectSettings-700dedfc.js.map
