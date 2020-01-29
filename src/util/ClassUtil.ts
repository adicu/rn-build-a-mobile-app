/**
 * NOTE: This code is provided as-is, and should not be changed for the purpose of this
 *       tutorial.
 */

export class ClassUtil {

    // Returns true if val is an array, false otherwise.
    static isArray(val:any) {
        return val && val.constructor === Array
    }

    // Returns true if val is a string.
    static isString(val:any) {
        return typeof val === 'string' || val instanceof String;
    }

    // Returns true if val is a number.
    static isNumber(val:any) {
        return typeof val === 'number' && isFinite(val);
    }

    // Returns true if val is an object, false otherwise.
    static isObject(val:any) {
        return val && typeof val === 'object';
    }

    // Returns true if val is null.
    static isNull(val:any) {
        return val === null;
    }
        
    // Returns true if val is undefined.
    static isUndefined(val:any) {
        return typeof val === 'undefined';
    }

    // Makes a clone out of any object
    static clone(obj:any) {
        if (null == obj || "object" != typeof obj) return obj;
        var copy = obj.constructor();
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
        }
        return copy;
    }

}