/**
 String representation of component state for styling with class names.

 Expects an array of strings OR a string/object pair:
 - className(['comp', 'comp-arg', 'comp-arg-2'])
   @returns 'react-select__comp react-select__comp-arg react-select__comp-arg-2'
 - className('comp', { some: true, state: false })
   @returns 'react-select__comp react-select__comp--some'
*/
export const applyPrefixToName = (prefix: string) => (name: string) => {
  if (!name) {
    return prefix;
  } else if (name[0] === "-") {
    return prefix + name;
  } else {
    return prefix + "__" + name;
  }
}
