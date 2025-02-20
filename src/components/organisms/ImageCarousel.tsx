"use client";

import { SectionHeader } from "../molecules";
import { useEffect, useState } from "react";
import { MenuItemType } from "@/types";
import { getRandomItems } from "@/lib/utils";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export function ImageCarousel() {
    const [randomItems, setRandomItems] = useState<MenuItemType[]>([]);
    useEffect(() => {
        fetch("/api/menu-items").then(res => {
            res.json().then(allItems => {
                setRandomItems(getRandomItems(allItems, 5));
            })
        })
    }, [])
    return (
        <>
            <SectionHeader mainHeader="Favorite Pick" subHeader="the best of" />
            {randomItems.length > 1 && (
                <div className="pb-12 relative text-center">
                    <Swiper modules={[Pagination, Autoplay]} spaceBetween={30} slidesPerView={1} pagination={{ clickable: true, el: '.swiper-pagination'}} autoplay={{ delay: 5000}} loop={true}>
                        {randomItems.map((item, index) => (
                            <SwiperSlide key={index}>
                                <img src={item.image || "/dishes.jpg"} alt={item.name} className="w-[400px] h-[200px] md:w-[500px] md:h-[350px] object-cover mx-auto rounded-lg" />
                                <h2 className="text-2xl font-bold text-gray-500 pt-4">
                                    {item.name}
                                </h2>
                                <p className="text-gray-400 line-clamp-3 max-w-md mx-auto mt-4">
                                    {item.description}
                                </p>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className="swiper-pagination bottom-4"></div>
                </div>
            )}
        </>
    )
}