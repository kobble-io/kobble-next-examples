import React from 'react';
import { Card } from './Card';
import Image, {StaticImageData} from "next/image";

interface ImageCardProps {
	url: string | StaticImageData;
}

export const ImageCard: React.FC<ImageCardProps> = ({ url }) => {
	return (
		<Card className="w-[400px]">
			<Image src={url} alt={'generated image'} width={400} height={400} />
		</Card>
	);
};
