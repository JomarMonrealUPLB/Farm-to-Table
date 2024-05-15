import React from 'react';

const findEntries = (entries,string) => {
    const filteredEntries = []
    entries.forEach(entry => {
        const keys = Object.keys(entry)

        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if(typeof entry[key] === "string"){
                if(entry[key].toLowerCase().includes(string.toLowerCase())){
                    filteredEntries.push(entry)
                    break
                }
            } else if(entry[key].$$typeof === Symbol.for("react.element")){
                if(findTextInJSX(entry[key].props.children, string.toLowerCase())){
                    filteredEntries.push(entry)
                    break
                }
            }
        }
    })

    return filteredEntries
}

export const findEntriesByKey = (entries,string,key) => {
  const filteredEntries = []
  entries.forEach(entry => {
    if(typeof entry[key] === "string"){
        if(entry[key].toLowerCase().includes(string.toLowerCase())){
            filteredEntries.push(entry)
        }
    } else if(entry[key].$$typeof === Symbol.for("react.element")){
        if(findTextInJSX(entry[key].props.children, string.toLowerCase())){
            filteredEntries.push(entry)
        }
    }
  })

  return filteredEntries
}

const findTextInJSX = (element, text) => {
    // Base case: If the element's text matches the target text
    if (typeof element === 'string' && element.toLowerCase().includes(text)) {
      return true;
    }
  
    // Recursive case: If the element has children, search within them
    if (Array.isArray(element)) {
      return element.some((child) => findTextInJSX(child, text));
    }
  
    if (element && element.props && element.props.children) {
      return findTextInJSX(element.props.children, text);
    }
  
    return false;
  };

export default findEntries