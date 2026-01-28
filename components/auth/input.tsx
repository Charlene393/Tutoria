import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type InputProps = {
	value: string;
	onChangeText: (text: string) => void;
	placeholder: string;
	secureTextEntry?: boolean;
	label?: string;
};

export function AuthInput({ value, onChangeText, placeholder, secureTextEntry = false, label }: InputProps) {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const isPassword = secureTextEntry;

	return (
		<View style={styles.container}>
			{label && <Text style={styles.label}>{label}</Text>}
			<View style={styles.inputWrapper}>
				<TextInput
					style={styles.input}
					value={value}
					onChangeText={onChangeText}
					placeholder={placeholder}
					autoCapitalize={isPassword ? 'none' : 'sentences'}
					secureTextEntry={isPassword && !isPasswordVisible}
					keyboardType={placeholder.toLowerCase().includes('email') ? 'email-address' : 'default'}
				/>
				{isPassword && (
					<TouchableOpacity onPress={() => setIsPasswordVisible(v => !v)}>
						<Text style={styles.toggle}>{isPasswordVisible ? 'Hide' : 'Show'}</Text>
					</TouchableOpacity>
				)}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
		container: {
			marginBottom: 20,
			width: '90%',
		},
	label: {
		fontSize: 16,
		fontWeight: '500',
		marginBottom: 6,
		color: '#222',
	},
			inputWrapper: {
				flexDirection: 'row',
				alignItems: 'center',
				borderWidth: 1,
				borderColor: '#ccc',
				borderRadius: 10,
				paddingHorizontal: 18,
				backgroundColor: '#fff',
				minHeight: 60,
				marginTop: 4,
				width: '100%',
			},
			input: {
				flex: 1,
				width: '100%',
				height: 56,
				fontSize: 18,
				color: '#222',
				paddingVertical: 10,
			},
	toggle: {
		color: '#000080',
		fontWeight: 'bold',
		marginLeft: 8,
	},
});
