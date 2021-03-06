import React, { useContext } from "react";
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Context as BlogContext } from "../contexts/BlogContext";

const IndexScreen = ({ navigation }) => {
	const { state, deleteBlogPost } = useContext(BlogContext);

	return (
		<View>
			<Text style={styles.caption}>Posts</Text>
			{state.length > 0 ? (
				<FlatList
					data={state}
					keyExtractor={(post) => post.id.toString()}
					renderItem={({ item }) => {
						return (
							<TouchableOpacity
								onPress={() =>
									navigation.navigate("ShowScreen", { id: item.id })
								}
							>
								<View style={styles.row}>
									<Text style={styles.title}>{item.title}</Text>
									<TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
										<Feather name="trash" style={styles.icon} />
									</TouchableOpacity>
								</View>
							</TouchableOpacity>
						);
					}}
				/>
			) : (
				<Text style={styles.notFound}>No posts found...</Text>
			)}
		</View>
	);
};

IndexScreen.navigationOptions = ({ navigation }) => {
	return {
		headerRight: () => (
			<TouchableOpacity
				onPress={() => navigation.navigate("CreateScreen")}
				style={styles.plus}
			>
				<Feather name="plus" size={30} />
			</TouchableOpacity>
		),
	};
};

const styles = StyleSheet.create({
	caption: {
		fontSize: 20,
		textAlign: "center",
		textDecorationLine: "underline",
		padding: 10,
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginVertical: 10,
		padding: 20,
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderColor: "gray",
	},
	title: {
		fontSize: 18,
	},
	icon: {
		fontSize: 24,
	},
	plus: {
		marginRight: 10,
	},
	notFound: {
		fontSize: 18,
		textAlign: "center",
	},
});

export default IndexScreen;
