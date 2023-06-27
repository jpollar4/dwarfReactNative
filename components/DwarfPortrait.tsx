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

const DwarfPortrait = ({
	dwarfData,
	size = 64,
}: {
	dwarfData: DwarfData;
	size: number;
}) => {
	let head = null;
	switch (dwarfData.headVariation) {
		case 0:
			head = require(`./dwarfPortraits/heads/head_0.png`);
			break;
		case 1:
			head = require(`./dwarfPortraits/heads/head_1.png`);
			break;
		case 2:
			head = require(`./dwarfPortraits/heads/head_2.png`);
			break;
		case 3:
			head = require(`./dwarfPortraits/heads/head_3.png`);
			break;
		default:
			head = require(`./dwarfPortraits/heads/head_0.png`);
	}
	let eyes = null;
	switch (dwarfData.eyeVariation) {
		case 1:
			eyes = require(`./dwarfPortraits/eyes/eyes_1.png`);
			break;
		case 2:
			eyes = require(`./dwarfPortraits/eyes/eyes_2.png`);
			break;
		case 3:
			eyes = require(`./dwarfPortraits/eyes/eyes_3.png`);
			break;
		case 4:
			eyes = require(`./dwarfPortraits/eyes/eyes_4.png`);
			break;
		default:
			eyes = require(`./dwarfPortraits/eyes/eyes_1.png`);
	}
	let beard = null;
	switch (dwarfData.beardVariation) {
		case 1:
			beard = require(`./dwarfPortraits/beards/beard_0.png`);
			break;
		case 2:
			beard = require(`./dwarfPortraits/beards/beard_1.png`);
			break;
		case 3:
			beard = require(`./dwarfPortraits/beards/beard_2.png`);
			break;

		default:
			beard = require(`./dwarfPortraits/beards/beard_0.png`);
	}

	return (
		<ImageBackground style={{ width: size, height: size }} source={head}>
			<ImageBackground style={{ width: size, height: size }} source={beard}>
				<ImageBackground style={{ width: size, height: size }} source={eyes} />
			</ImageBackground>
		</ImageBackground>
	);
};

export default DwarfPortrait;
