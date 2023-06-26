import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Button } from "react-native";

import { Text, View } from "../components/Themed";
import { useRouter } from "expo-router";

export default function StartScreen() {
	const router = useRouter();

	const onPressLearnMore = () => {
		router.push({
			pathname: "/prepare",
			params: { data: "random" },
		});
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Dwarf Quest</Text>

			<Button
				onPress={onPressLearnMore}
				title="Start Game"
				color="#841584"
				//accessibilityLabel="Learn more about this purple button"
			/>
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
	image: {
		flex: 1,
	},
});
