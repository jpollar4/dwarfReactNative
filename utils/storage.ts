import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY_PREFIX = "DWARF_TK421";

export const storeObject = async (key: string, value: any) => {
	console.log(`store key ${key}`);
	try {
		await AsyncStorage.setItem(`${KEY_PREFIX}${key}`, JSON.stringify(value));
		return true;
	} catch (e) {
		// saving error
	}
	return false;
};

export const getData = async (key: string) => {
	console.log(`get key ${key}`);
	try {
		const value = await AsyncStorage.getItem(`${KEY_PREFIX}${key}`);
		if (value !== null) {
			return JSON.parse(value);
		}
	} catch (e) {
		// error reading value
	}
	return null;
};

export const showAll = () => {
	AsyncStorage.getAllKeys((err, keys: any) => {
		AsyncStorage.multiGet(keys, (error, stores) => {
			(stores as any).map((result: any, i: number, store: any) => {
				console.log({ [store[i][0]]: store[i][1] });
				return true;
			});
		});
	});
};

export const clearGameData = async () => {
	const keysToRemove: string[] = [];
	await AsyncStorage.getAllKeys(async (err, keys: any) => {
		for (const k of keys) {
			if (k.includes(KEY_PREFIX)) {
				keysToRemove.push(k);
			}
		}
	});
	console.log(`Remove keys! ${keysToRemove.join(",")}`);
	try {
		await AsyncStorage.multiRemove(keysToRemove);
	} catch (e) {
		// remove error
	}
};
