import getElementById from '../../common/getElement';
import querySelectorAll from '../../common/querySelectorAll';

const calcHeight = (collection) => collection.length * 22;

const byLink = (type) => calcHeight(
  getElementById(`nav-${type}`).nextElementSibling.children,
);

const bySection = (section) => calcHeight(
  querySelectorAll(`#nav-${section} > ul li`),
);

export default function adjustHeight(theNav, myNav) {
  // first the closed saved variables
  // eslint-disable-next-line no-param-reassign
  myNav.heights = [
    null,
    null,
    byLink('character'),
    bySection('actions'),
    bySection('guild'),
    bySection('toprated'),
    bySection('upgrades'),
    byLink('resources'),
    null,
  ];
  if (Number(myNav.state) !== -1) {
    // and now the open one
    // eslint-disable-next-line no-param-reassign
    theNav.children[myNav.state].children[1].style
      .height = `${myNav.heights[myNav.state]}px`;
  }
}
