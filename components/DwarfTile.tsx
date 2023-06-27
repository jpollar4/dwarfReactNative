import { Text, TextProps, View } from "./Themed";
import {
	Platform,
	StyleSheet,
	Image,
	ImageBackground,
	Pressable,
} from "react-native";
import Images from "../assets/images/images";
import { DwarfData } from "../utils/gameLogic";
import { useRouter } from "expo-router";
import DwarfPortrait from "./DwarfPortrait";

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
			<DwarfPortrait dwarfData={dwarfData} size={64}></DwarfPortrait>
			<Text>{dwarfData.name}</Text>
		</Pressable>
	);
};

export default DwarfTile;
