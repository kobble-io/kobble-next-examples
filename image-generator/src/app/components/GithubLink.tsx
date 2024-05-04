import GithubLogo from '@/app/assets/img/github-mark-white.svg';
import Image from "next/image";

export const GithubLink = () => {
	return (
		<a
			href="https://github.com/kobble-io/kobble-next-examples/tree/main/image-generator"
			className="rounded-full border border-[#fff] bg-[#112220] text-[#fff] py-1 px-3 flex items-center justify-center gap-2">
			<Image src={GithubLogo} alt={'github logo'} width={20} height={20} />
			Fork on GitHub
		</a>
	);
};
