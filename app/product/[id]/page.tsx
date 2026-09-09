import ProductPageClient from "./ProductPageClient";

export function generateStaticParams() {
  return [
    { id: "gece-yarisi" },
    { id: "sessiz-ozur" },
    { id: "ilk-gun" },
  ];
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <ProductPageClient id={id} />;
}
