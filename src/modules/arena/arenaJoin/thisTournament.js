import getUrlParameter from '../../system/getUrlParameter';

export const thisTournament = () => Number(getUrlParameter('pvp_id'));
