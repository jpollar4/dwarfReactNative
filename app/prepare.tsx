import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import Images from "../assets/images/images";
import DwarfTile from "../components/DwarfTile";
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";
import { clearGameData, getData, showAll, storeObject } from "../utils/storage";
import {
	DwarfData,
	getAllDwarvesAwaiting,
	initNewGame,
	loadGame,
} from "../utils/gameLogic";

export default function PrepareExpedition() {
	const navigation = useNavigation();
	const router = useRouter();
	const params = useLocalSearchParams();

	const [curDwarfs, setCurDwarfs] = useState<DwarfData[]>([]);

	useEffect(() => {
		(async () => {
			const currentGame = await getData("currentGame");

			if (!currentGame) {
				await initNewGame();
				await storeObject("currentGame", { game: true });
				// setCurDwarfs(dwarfData);
			} else {
				console.log("load game???");
				await loadGame();
			}
			const dwarvesAwaiting = await getAllDwarvesAwaiting();
			setCurDwarfs(dwarvesAwaiting);
		})();
	}, []);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>You must prepare!</Text>
			<View
				style={styles.separator}
				lightColor="#eee"
				darkColor="rgba(255,255,255,0.1)"
			/>
			<View style={styles.imageBox}>
				{curDwarfs.map((d) => {
					return <DwarfTile key={d.id} dwarfData={d}></DwarfTile>;
				})}
			</View>

			{/* Use a light status bar on iOS to account for the black space above the modal */}
			<StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	imageBox: {
		flexDirection: "row",
		flexWrap: "wrap",
		width: "100%",
		height: "20%",
		justifyContent: "center",
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: "80%",
	},
});
