import { Text, TextProps, View } from "./Themed";
import { Platform, StyleSheet, Image, Pressable } from "react-native";
import Images from "../assets/images/images";
import { DwarfData } from "../utils/gameLogic";
import { useRouter } from "expo-router";

const DwarfTile = ({ dwarfData }: { dwarfData: DwarfData }) => {
	const router = useRouter();
	const onPressFunction = (e: any) => {
		router.push({
			pathname: "/dwarfData",
			params: { id: dwarfData.id },
		});
	};

	return (
		<Pressable onPress={onPressFunction}>
			<Image style={styles.image} source={Images.icon} />
			<Text>{dwarfData.name}</Text>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	image: {
		// flex: 1,
		width: 64,
		height: 64,
		margin: 8,
		//resizeMode: "contain",
	},
	// pressable: {
	// 	flex: 1,
	// },
});

export default DwarfTile;
