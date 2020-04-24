import indexAjax from './indexAjax';

export default function indexAjaxJson(data) {
  return indexAjax({ data, dataType: 'json' });
}
