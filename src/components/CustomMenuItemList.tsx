import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

interface MenuItem {
  id: string | number;
  label: string;
  icon?: React.ReactNode;
  action?: () => void;
  href?: string; // For navigation links
  suffix?: React.ReactNode; // e.g., a badge or toggle
  disabled?: boolean;
}

interface CustomMenuItemListProps {
  items: MenuItem[];
  className?: string;
  itemClassName?: string;
}

const CustomMenuItemList: React.FC<CustomMenuItemListProps> = ({
  items,
  className,
  itemClassName,
}) => {
  console.log("Rendering CustomMenuItemList, items count:", items.length);

  return (
    <div className={cn("space-y-1", className)}>
      {items.map((item) => {
        const commonClasses = cn(
          "flex items-center justify-between w-full p-3 text-sm font-medium text-left rounded-md transition-colors",
          item.disabled
            ? "text-gray-400 cursor-not-allowed bg-gray-50"
            : "text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-gray-100",
          itemClassName
        );

        const content = (
          <>
            <div className="flex items-center space-x-3">
              {item.icon && <span className="w-5 h-5 text-gray-500">{item.icon}</span>}
              <span>{item.label}</span>
            </div>
            <div className="flex items-center space-x-2">
                {item.suffix && <span>{item.suffix}</span>}
                {(item.action || item.href) && !item.suffix && <ChevronRight className="h-4 w-4 text-gray-400" />}
            </div>
          </>
        );

        if (item.href && !item.disabled) {
          // Assuming react-router-dom Link component might be used here, or simple <a>
          // For simplicity, using <a>. Replace with <Link> if using react-router.
          return (
            <a
              key={item.id}
              href={item.href}
              className={commonClasses}
              aria-disabled={item.disabled}
            >
              {content}
            </a>
          );
        }

        return (
          <button
            key={item.id}
            type="button"
            onClick={!item.disabled ? item.action : undefined}
            disabled={item.disabled}
            className={commonClasses}
          >
            {content}
          </button>
        );
      })}
    </div>
  );
};

export default CustomMenuItemList;