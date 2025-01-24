"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pick = (object, keys) => {
    const finalObject = {};
    for (const key of keys) {
        if (object && Object.hasOwnProperty.call(object, key)) {
            finalObject[key] = object[key];
        }
    }
    console.log(finalObject);
    return finalObject;
};
exports.default = pick;
