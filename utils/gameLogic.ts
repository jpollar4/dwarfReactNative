import AsyncStorage from "@react-native-async-storage/async-storage";
import { getData, storeObject } from "./storage";

export interface DwarfData {
	awaitingExpedition: boolean;
	id: number;
	name: string;
}

// In MemoryData
let nextID = -999;

const dwarvesByID: { [key: number]: DwarfData } = {};

// END In MemoryData
export const initNewGame = async () => {
	for (let i = 0; i < 10; i++) {
		const newDwarf = await generateNewDwarf();
	}
};
export const loadGame = async () => {
	const dwarfKeys: string[] = [];

	await AsyncStorage.getAllKeys(async (err, keys: any) => {
		for (const k of keys) {
			if (k.includes("dwarfData_")) {
				dwarfKeys.push(k);
			}
		}
	});
	const values = await AsyncStorage.multiGet(dwarfKeys);
	for (const dwarfData of values) {
		const d = JSON.parse(dwarfData[1] || "");
		dwarvesByID[d.id] = d;
	}
};

const generateNewDwarf = async () => {
	const id = await getNextID();
	const dwarf: DwarfData = {
		id: id,
		awaitingExpedition: true,
		name: "Steve_" + `${id}`,
	};

	const key = `dwarfData_${id}`;
	await storeObject(key, dwarf);
	dwarvesByID[id] = dwarf;

	return dwarf;
};

export const getDwarfByID = async (id: number) => {
	if (dwarvesByID[id]) {
		return dwarvesByID[id];
	} else {
		const key = `dwarfData_${id}`;
		const dwarf = await getData(key);
		if (dwarf) {
			dwarvesByID[id] = dwarf;
			return dwarf;
		}
	}
	return null;
};

export const getAllDwarvesAwaiting = async () => {
	console.log("getAllDwarvesAwaiting");
	const dwarves = [];

	for (const dwarfData of Object.values(dwarvesByID)) {
		if (dwarfData.awaitingExpedition) {
			dwarves.push(dwarfData);
		}
	}
	return dwarves;
};

const getNextID = async () => {
	if (nextID <= 0) {
		const idData = await getData("nextID");
		if (idData !== null) {
			nextID = parseInt(idData.nextID);
		} else {
			nextID = 1;
		}
	}
	nextID += 1;
	await storeObject("nextID", { nextID });
	return nextID;
};
