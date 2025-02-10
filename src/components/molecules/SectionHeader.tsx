import { SectionHeaderProps } from "@/types";

export function SectionHeader({ subHeader, mainHeader }: SectionHeaderProps) {
    return (
        <div className="text-center pt-12 pb-6">
            <h2 className="uppercase font-semibold text-gray-600 text-xl leading-normal">
                {subHeader}
            </h2>
            <h1 className="text-4xl text-primary italic font-bold">
                {mainHeader}
            </h1>
        </div>
    )
}