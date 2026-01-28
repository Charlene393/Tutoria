import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type ForgotPasswordProps = {
	onPress: () => void;
};

export function ForgotPassword({ onPress }: ForgotPasswordProps) {
	return (
		<TouchableOpacity onPress={onPress} style={styles.container}>
			<Text style={styles.text}>Forgot password?</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		marginLeft: 'auto',
	},
	text: {
		color: '#000080',
		fontWeight: '500',
		fontSize: 14,
	},
});
