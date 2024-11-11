import { FlatList, SafeAreaView, Text, View, Image, RefreshControl, Alert } from 'react-native'
import { images } from '../../constants';
import SearchInput from '../../components/SearchInput';
import Trending from '../../components/Trending';
import EmptyState from "../../components/EmptyState";
import { useState } from 'react';
import { getAllPost, getLatestPost } from '../../lib/appwrite';
import useAppwrite from '../../lib/useAppwrite';
import VideoCard from '../../components/VideoCard';

const Home = () => {

	const { data: posts, refetch } = useAppwrite(getAllPost);
	const { data: latestPosts } = useAppwrite(getLatestPost);

	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = async () => {
		setRefreshing(true);
		try {
			await refetch();
		}
		catch (error) {
			//show error notification
		}
		finally {
			setRefreshing(false);
		}
	};

	return (
		<SafeAreaView className="bg-primary h-full w-full">
			<FlatList
				data={posts}
				keyExtractor={(item) => item.$id}
				renderItem={({ item }) => (
					<VideoCard video={item} />
				)}
				ListHeaderComponent={() => (
					<View className="my-6 px-4 space-y-6">
						<View className="justify-between items-start flex-row mb-6">
							<View>
								<Text className="font-pmedium text-sm text-gray-100">Welcome Back</Text>
								<Text className="text-2xl font-psemibold text-white">Desire</Text>
							</View>
							<View className="mt-1.5">
								<Image source={images.logoSmall}
									className="w-12 h-14"
									resizeMode='contain' />
							</View>
						</View>
						<SearchInput initialQuery="" />
						<View className="w-full flex-1 pt-5 pb-8">
							<Text className="text-gray-100  text-xl font-pregular mb-3">
								Latest Videos
							</Text>
							<Trending posts={latestPosts} />
						</View>
					</View>
				)}
				ListEmptyComponent={() => (
					<EmptyState
						title="No Videos Found"
						subtitle="Be the first to upload a video"
					/>
				)}
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
			/>
		</SafeAreaView>
	)
}

export default Home;