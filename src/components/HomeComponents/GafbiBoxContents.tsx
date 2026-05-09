/** @format */
"use client";
import GafbiBoxItem from "./GafbiBoxItem";

interface BoxItem {
  id: string;
  name: string;
  quantity: string;
  imageSrc?: string;
}

interface GafbiBoxContentsProps {
  items: BoxItem[];
}

const GafbiBoxContents = ({ items }: GafbiBoxContentsProps) => {
  return (
    <div className="mt-6 md:mt-8">
      <h2 className="text-base md:text-lg font-semibold text-primary mb-4">
        Your next Gafbi box contents
      </h2>
      <div className="space-y-3">
        {items.map((item) => (
          <GafbiBoxItem
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            imageSrc={item.imageSrc}
          />
        ))}
      </div>
    </div>
  );
};

export default GafbiBoxContents;
