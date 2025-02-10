import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "../atoms";

export function Hero() {
  return (
    <section>
      {/* for mobile */}
      <div className="md:hidden px-16 pt-4">
        <h1 className="text-6xl font-bold text-gray-600 leading-snug">
          Everything
          <br />
          is better
          <br />
          with a&nbsp;
          <span className="text-primary">Pizza</span>
        </h1>
        <p className="py-4 text-gray-500">
          Pizza is the missing piece that makes everyday complete, a simple yet
          delicious in life
        </p>
        <div className="text-sm font-bold flex gap-8 items-center justify-center mt-8">
          <Link href={"/menu"}>
            <button className="bg-primary text-white px-8 py-3 rounded-full uppercase flex gap-2 items-center">
              order now
              <ChevronRight strokeWidth={3} />
            </button>
          </Link>
          <Link href={"/#about"}>
            <button className="text-gray-700 flex gap-2 items-center">
              Learn more
              <ChevronRight strokeWidth={2} />
            </button>
          </Link>
        </div>
      </div>

      {/* for larger screen */}
      <div className="hero ps-4">
        <div className="pt-8">
            <h1 className="text-4xl font-bold text-gray-600 leading-snug">
                Everything
                <br />
                is better
                <br />
                with a&nbsp;
                <span className="text-primary">Pizza</span>
            </h1>
            <p className="text-gray-500 py-4">
                Pizza is the missing piece that makes everyday complete, a simple yet
                delicious joy in life
            </p>
            <div className="text-sm font-bold text-gray-700 flex gap-4 items-center pt-4">
                <Link href="/menu">
                    <button className="bg-primary text-white px-8 py-2 flex gap-2 items-center rounded-full uppercase">
                        order now
                        <ChevronRight strokeWidth={2} />
                    </button>
                </Link>
                <Link href="/#about">
                    <button className="flex gap-2 items-center">
                        Learn more
                        <ChevronRight strokeWidth={2} />
                    </button>
                </Link>
            </div>
        </div>
        <div className="relative">
          <Image
            src={"/pizza.png"}
            alt="pizza"
            style={{ objectFit: "contain" }}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
            placeholder="blur"
            blurDataURL="/pizza.png"
          />
        </div>
      </div>
    </section>
  );
}
