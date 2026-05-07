/** @format */

interface ProductDescriptionProps {
  description: string;
}

const ProductDescription = ({ description }: ProductDescriptionProps) => {
  return (
    <div className="space-y-1 text-base leading-7 text-(--color-primary)">
      <p>{description}</p>
    </div>
  );
};

export default ProductDescription;
