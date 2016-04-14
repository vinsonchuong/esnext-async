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

signal('time', () => new Date().valueOf());
