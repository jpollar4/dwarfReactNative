import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";
import { DwarfData, getDwarfByID } from "../utils/gameLogic";

export default function DwarfInfoScreen() {
	const navigation = useNavigation();
	const router = useRouter();
	const params = useLocalSearchParams();

	const [dwarfData, setDwarfData] = useState<DwarfData | null>(null);

	useEffect(() => {
		(async () => {
			const id = parseInt(params?.id as any);
			const dwarf = await getDwarfByID(id);
			setDwarfData(dwarf);
		})();
	}, []);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{dwarfData?.name}</Text>
			<Text style={styles.title}>
				{dwarfData?.awaitingExpedition ? "Awaiting" : "Gone"}
			</Text>
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
