export default function cElement(type, props) {
  var el = document.createElement(type);
  if (props) {
    Object.keys(props).forEach(function(prop) {
      el[prop] = props[prop];
    });
  }
  return el;
}
