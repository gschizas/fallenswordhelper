import { allowBack } from './loader';
import runDefault from '../../common/runDefault';

const showAllQuestSteps = () => {
  runDefault(import('../../guide/showAllQuestSteps'));
};

export default {
  '-': { '-': allowBack },
  view: { '-': showAllQuestSteps },
};
