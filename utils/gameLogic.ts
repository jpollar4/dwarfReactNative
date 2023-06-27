import AsyncStorage from "@react-native-async-storage/async-storage";
import { getData, storeObject } from "./storage";

export interface DwarfData {
	awaitingExpedition: boolean;
	id: number;
	name: string;
	eyeVariation: number;
	headVariation: number;
	beardVariation: number;
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
		name: generateName(),
		eyeVariation: Math.ceil(Math.random() * 4),
		headVariation: Math.ceil(Math.random() * 4),
		beardVariation: Math.ceil(Math.random() * 4),
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

const generateName = () => {
	const name_parts = {
		prefixes: [
			"Bal",
			"Dain",
			"Dur",
			"Gim",
			"Thra",
			"Thor",
			"Aza",
			"Ki",
			"Fi",
			"Glo",
			"Oi",
			"Nor",
			"Do",
			"O",
			"Bi",
			"Bo",
			"Bom",
			"Fló",
			"Fre",
			"Fra",
			"Fro",
			"Gro",
			"Ná",
			"Ná",
			"Na",
			"Nó",
			"Thr",
			"Ví",
			"Kaz",
			"Zir",
			"Kor",
			"Bor",
			"Thur",
			"Zar",
			"Mar",
			"Rur",
			"Tur",
			"Ulf",
		],
		suffixes: [
			"lin",
			"rin",
			"in",
			"li",
			"rin",
			"in",
			"ghâl",
			"li",
			"li",
			"in",
			"in",
			"ri",
			"ri",
			"ri",
			"fur",
			"fur",
			"bur",
			"i",
			"in",
			"ar",
			"di",
			"or",
			"in",
			"i",
			"i",
			"i",
			"ór",
			"li",
			"ak",
			"ur",
			"in",
			"in",
			"gul",
			"in",
			"ak",
			"uk",
			"ir",
			"grim",
		],
	};

	const prefixIndex = Math.floor(Math.random() * name_parts.prefixes.length);
	const suffixIndex = Math.floor(Math.random() * name_parts.suffixes.length);
	return `${name_parts.prefixes[prefixIndex]}${name_parts.suffixes[suffixIndex]}`;
};
