import CatalogArts from "@/features/Catalog/CatalogArts";
import CatalogNav from "@/features/Catalog/CatalogNav";
import CatalogSort from "@/features/Catalog/CatalogSort";

export default function Catalog() {
  return (
    <div className="grid grid-cols-[10Svw_auto] gap-6 px-[20vw]">
      <div className="mb-[70px] mt-[90px] items-center border-r-[1px]">
        <CatalogNav></CatalogNav>
      </div>
      <div className="mt-[90px] space-y-5">
        <CatalogSort></CatalogSort>
        <CatalogArts></CatalogArts>
      </div>
    </div>
  );
}
