// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Locals {}
	// interface Platform {}
	// interface PrivateEnv {}
	// interface PublicEnv {}
}

interface UserInfo {
	email: string;
	firstname: string;
	lastname: string;
	profilePicture: string;
}

interface PostInfo {
	title: string;
	subtitle: string;
	imgSrc: string;
	postId: number;
	content: string;
	author: {
		imgSrc: string;
		firstname: sting;
	};
}

interface PostEdit {
	title: string;
	subtitle: string;
	content: string;
	imgSrc: string;
}
