import Image from "next/image";
import { SectionHeader } from "../molecules";

export function ImageCarousel() {
    return (
        <>
            <SectionHeader mainHeader="Image Carousel" />
            <Image src="/pizza.png" alt="image" width={100} height={100} />
        </>
    )
}