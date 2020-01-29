import { AsyncStorage } from 'react-native'

import { ClassUtil } from './ClassUtil'

/**
 * NOTE: This code is provided as-is, and should not be changed for the purpose of this
 *       tutorial.
 */

export class StorageUtil {

	// Set an object, string, or number is storage
	public static async set(key: string, value: object | string | number | boolean) {
		if (ClassUtil.isObject(value)) {
			// Item is an object
			const item = JSON.stringify(value)
			await AsyncStorage.setItem(key, item)
		} else if (ClassUtil.isNumber(value)) {
			// Item is a number
			const item = `${value}`
			await AsyncStorage.setItem(key, item)
		} else {
			// Item is a string
			const item = value as string
			await AsyncStorage.setItem(key, item)
		}
	}

	// Get an object, string, or number from storage
	public static async get(key: string) {
        
        const item = await AsyncStorage.getItem(key)
        
		if (!ClassUtil.isNull(item)) {
			try {
				// Try to parse the JSON object
				const jsonItem = JSON.parse(item!)
				return jsonItem
			} catch (e) {
				// Could not parse the item, that means its a string
				if (!isNaN(item as any)) {
					// Item is a number, return it parsed
					return +item!
				} else if (item === Boolean(item).toString()) {
					// Item is a boolean, return it as a boolean
					return Boolean(item)
				}
				// Item is not an object nor a string
				return item
			}
		}
		return null
	}

	// Check if an object exists in the storage
	public static async has(key: string) {
		return !ClassUtil.isNull(await StorageUtil.get(key))
	}

	// Remove an item from storage
	public static async remove(key: string) {
		return await AsyncStorage.removeItem(key)
	}

	// Clear storage
	public static async clear() {
		return await AsyncStorage.clear()
	}
}
