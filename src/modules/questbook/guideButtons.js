import './guideButtons.postcss';
import {guideUrl} from '../support/constants';
import {imageServer} from '../system/system';

export default function guideButtons(questID, questName) {
  return '<div class="parent">' +
    '<a href="' + guideUrl + 'quests&' +
    'subcmd=view&quest_id=' + questID + '" class="tip-static" ' +
    'data-tipped="Search for this quest on the Ultimate Fallen Sword Guide" ' +
    'style="background-image: url(\'' + imageServer +
    '/temple/1.gif\');" target="_blank"></a>&nbsp;' +
    '<a href="https://wiki.fallensword.com/index.php?title=' +
    questName.replace(/ /g, '_') + '" class="tip-static" ' +
    'data-tipped="Search for this quest on the Wiki" ' +
    'style="background-image: url(\'' + imageServer +
    '/skin/fs_wiki.gif\');" target="_blank"></a></div>';
}
