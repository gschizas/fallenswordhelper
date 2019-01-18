import injectInvent from './injectInvent';
import injectViewRecipe from './injectViewRecipe';
import jQueryPresent from '../common/jQueryPresent';

export default function inventing() {
  if (jQueryPresent()) {
    injectViewRecipe();
    injectInvent();
  }
}
