import setValue from './setValue';

export default function setValueJSON(name, value) {
  setValue(name, JSON.stringify(value));
}
