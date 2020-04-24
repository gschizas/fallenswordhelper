import getUrlParameter from '../../system/getUrlParameter';

const thisTournament = () => Number(getUrlParameter('pvp_id'));

export default thisTournament;
