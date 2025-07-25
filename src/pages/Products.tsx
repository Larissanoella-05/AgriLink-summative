import ProductsCrops from "@/features/Products/ProductsCrops"
import ProductsNav from "@/features/Products/ProductsNav"
import ProductsSort from "@/features/Products/ProductsSort"

export default function Products() {
  return (
    <div className="grid grid-cols-[10Svw_auto] gap-6 px-[20vw] bg-background min-h-screen">
      <div className="mb-[70px] mt-[90px] items-center border-r-[1px] border-border">
        <ProductsNav></ProductsNav>
      </div>
      <div className="mt-[90px] space-y-5">
        <ProductsSort></ProductsSort>
        <ProductsCrops></ProductsCrops>
      </div>
    </div>
  )
}
