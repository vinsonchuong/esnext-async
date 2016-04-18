function parameterNames(fn) {
  const [, names] = fn.toString().match(/^.*?\((.*?)\)/);
  return names.split(/\s*,\s*/).filter(Boolean);
}

const definitions = {};
export default function signal(name, definition = definitions[name]) {
  definitions[name] = definition;
  const signals = parameterNames(definition).map((param) => signal(param));
  return definition(...signals);
}

signal.discrete = function discrete(name, source) {
  let currentValue;

  const definition = () => currentValue;
  definition.subscribers = [];

  signal(name, definition);
  source((newValue) => {
    currentValue = newValue;
    for (const read in definition.subscribers) {
      read(newValue);
    }
  });
};

signal.subscribe = function subscribe(read) {
  const dependencies = parameterNames(read);
  for (const dependency of dependencies) {
    definitions[dependency].subscribers = read;
  }
}

signal('time', () => new Date().valueOf());
