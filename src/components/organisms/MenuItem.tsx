import { MenuItemType } from "@/types";


export function MenuItem(item: MenuItemType) {
  return (
    <div className="bg-gray-300 pt-8 pb-4 px-6 rounded-lg text-center hover:bg-gray-100 hover:shadow hover:shadow/50 duration-300 hover:scale-105 flex flex-col justify-between">
      <img src={"/pizza.png"} alt={"pizza"} className="max-h-32 mx-auto" />
      <h2 className="text-2xl font-semibold text-gray-600 pt-4 pb-2">
        {"Pizza"}
      </h2>

      {/* line-clam-3 will reduce extra text to only ... */}
      <p className="text-gray-500 grow line-clamp-3">
        {
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis quas expedita obcaecati dolore sit eos! Nihil dignissimos, doloribus rem nobis incidunt odio, cumque cum sapiente eius pariatur sunt nam deleniti?"
        }
      </p>
      <button className="bg-primary px-8 py-2 text-white text-sm font-bold mt-4 rounded-full">
        Add to cart $11
      </button>
    </div>
  );
}
