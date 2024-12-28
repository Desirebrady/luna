import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { Tabs, Redirect } from 'expo-router';
import { StatusBar } from "expo-status-bar";
import { icons } from "../../constants";
import { useGlobalContext } from "../../context/GlobalProvider";

const TabIcon = ({ icon, color, name, focused }) => {
	return (
		<View className="flex items-center justify-center gap-2">
			<Image
				source={icon}
				resizeMode="contain"
				tintColor={color}
				className="w-6 h-6"
			/>
			{/* <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} style={{ color: color }}>
				{name}
			</Text> */}
		</View>
	)
}

const TabsLayout = () => {
	const { loading, isLogged } = useGlobalContext();

	if (!loading && !isLogged) return <Redirect href="/sign-in" />;
	return (
		<>
			<Tabs
				screenOptions={{
					tabBarShowLabel: false,
					tabBarActiveTintColor: '#38BDF8',
					tabBarInactiveTintColor: '#CDCDE0',
					tabBarStyle: {
						backgroundColor: '#161622',
						borderTopWidth: 1,
						borderTopColor: '#232533',
						height: 84
					}
				}}
			>
				<Tabs.Screen
					name="home"
					options={{
						title: "Home",
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabIcon
								icon={icons.home}
								color={color}
								name="Home"
								focused={focused}
							/>
						)
					}}
				/>
				<Tabs.Screen
					name="search"
					options={{
						title: "Search",
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabIcon
								icon={icons.search}
								color={color}
								name="Search"
								focused={focused}
							/>
						)
					}}
				/>

				<Tabs.Screen
					name="create"
					options={{
						title: "Create",
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabIcon
								icon={icons.plus}
								color={color}
								name="Create"
								focused={focused}
							/>
						)
					}}
				/>
				<Tabs.Screen
					name="bookmark"
					options={{
						title: "Bookmark",
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabIcon
								icon={icons.bookmark}
								color={color}
								name="Bookmark"
								focused={focused}
							/>
						)
					}}
				/>
				<Tabs.Screen
					name="profile"
					options={{
						title: "Profile",
						headerShown: false,
						tabBarIcon: ({ color, focused }) => (
							<TabIcon
								icon={icons.profile}
								color={color}
								name="Profile"
								focused={focused}
							/>
						)
					}}
				/>
				<Tabs.Screen
					name="settings"
					options={{
						headerStyle: {
							backgroundColor: '#161622',
						},
						headerShadowVisible: false,
						headerTitle: 'Settings and Activity',
						headerTintColor: 'white',
						headerLeftLabelVisible: true,
						href: null,
					}}
				/>
			</Tabs>

			<StatusBar backgroundColor="#161622" style="light" />
		</>
	)
}

export default TabsLayout
