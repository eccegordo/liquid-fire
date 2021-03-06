import Transitions from "./transitions";
import Modals from "./modals";
import rules from "./internal-rules";

export function initialize(container, config) {
  var tm = Transitions.map(config);
  tm.map(rules);
  tm.container = container;
  container.register('transitions:map', tm,
                     {instantiate: false});


  ['outlet', 'with', 'if'].forEach(function(viewName) {
    container.injection('view:liquid-' + viewName, 'transitions', 'transitions:map');
  });

  container.register('liquid-modals:main', Modals);
}
