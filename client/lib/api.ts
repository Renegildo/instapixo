import axios from 'axios';

const apiUrl = "http://localhost:3333";

export const registerUser = async (
	username: string,
	password: string
) => {
	const response = await axios.post(
		apiUrl + "/register",
		{
			username,
			password,
		},
	);

	return response.data;
};

export const getToken = async (
	username: string,
	password: string,
) => {
	const response = await axios.post(
		apiUrl + "/login",
		{
			username,
			password
		},
	);

	return response.data.token;
};

export const getSelf = async (token: string) => {
	try {
		const response = await axios.get(
			apiUrl + "/self",
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);

		return response.data.user;
	} catch (error) {
		return null;
	}
};

export const createPost = async (content: string, ownerId: string, imageUrl: string) => {
	const response = await axios.post(
		apiUrl + "/post",
		{ content, ownerId, imageUrl },
	);

	return response.data;
};

export const getRecentPosts = async () => {
	const response = await axios.get(
		apiUrl + "/recentPosts",
	);

	return response.data.posts;
};

export const uploadImage = async (image: File, imageId: string) => {
	const formData = new FormData();

	formData.append("imageId", imageId);
	formData.append("image", image);

	const response = await axios.post(
		apiUrl + "/upload",
		formData,
		{
			headers: {
				"Content-Type": "multipart/form-data"
			}
		},
	);
	console.log(response);

	return response.data;
};

export const getPost = async (postId: string) => {
	const response = await axios.get(
		apiUrl + `/post/${postId}`,
	);

	return response.data.post as Post;
};

export const getComments = async (postId: string) => {
	const response = await axios.get(
		apiUrl + `/comments/${postId}`,
	);

	return response.data.comments;
};

export const postComment = async (
	token: string,
	content: string,
	postId: string,
	ownerId: string
) => {
	const response = await axios.post(
		apiUrl + "/comment",
		{
			content,
			ownerId,
			postId: postId,
		},
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		},
	);

	return response;
};

export const likePost = async (postId: string, likerId: string, token: string) => {
	const response = await axios.post(
		apiUrl + "/like",
		{
			postId,
			likerId,
		},
		{
			headers: {
				Authorization: `Bearer ${token}`
			}
		}
	);

	return response.data;
};

export const hasLikedPost = async (postId: string, token: string) => {
	const response = await axios.get(
		apiUrl + `/hasLiked/${postId}`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		},
	);

	return response.data.hasLiked;
};

export const getUserByUsername = async (username: string) => {
	const user = await axios.get(
		apiUrl + `/user/${username}`,
	);

	return user.data.user;
};

export const getFollowers = async (userId: string) => {
	const followers = await axios.get(
		apiUrl + `/followers/${userId}`,
	);

	return followers.data.followers;
};

export const getFollowings = async (userId: string) => {
	const followings = await axios.get(
		apiUrl + `/followings/${userId}`,
	);

	return followings.data.followings;
};

export const followUser = async (userId: string, token: string) => {
	const response = await axios.post(
		apiUrl + "/follow",
		{ userId },
		{
			headers: {
				Authorization: `Bearer ${token}`
			},
		},
	);

	return response.data;
};

export const unfollowUser = async (userId: string, token: string) => {
	const response = await axios.post(
		apiUrl + "/unfollow",
		{ userId },
		{
			headers: {
				Authorization: `Bearer ${token}`
			},
		},
	);

	return response.data;
};

export const isFollowing = async (userId: string, token: string) => {
	const response = await axios.get(
		apiUrl + `/isFollowing/${userId}`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		},
	);

	return response.data.isFollowing;
};

export const removeLike = async (postId: string, token: string) => {
	const response = await axios.delete(
		apiUrl + `/like/${postId}`,
		{
			headers: {
				Authorization: `Bearer ${token}`
			},
		},
	);

	return response.data;
};
