import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowDownLeft, ArrowUpRight, ShoppingCart } from 'lucide-react'; // Example icons

type TransactionType = 'income' | 'expense' | 'transfer';

interface TransactionListItemProps {
  id: string | number;
  title: string;
  category?: string; // e.g., 'Groceries', 'Salary'
  amount: number;
  date: string | Date; // Can be a string or Date object
  type: TransactionType;
  icon?: React.ReactNode;
  onClick?: (id: string | number) => void;
  className?: string;
}

const TransactionListItem: React.FC<TransactionListItemProps> = ({
  id,
  title,
  category,
  amount,
  date,
  type,
  icon,
  onClick,
  className,
}) => {
  console.log(`Rendering TransactionListItem: ${title}, Amount: ${amount}`);

  const formattedDate = typeof date === 'string' ? date : date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  const isIncome = type === 'income';

  const defaultIcon = isIncome ? <ArrowDownLeft className="h-5 w-5 text-green-500" /> : <ArrowUpRight className="h-5 w-5 text-red-500" />;

  return (
    <div
      className={cn(
        "flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors",
        onClick ? "cursor-pointer" : "",
        className
      )}
      onClick={onClick ? () => onClick(id) : undefined}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => (e.key === 'Enter' || e.key === ' ') && onClick(id) : undefined}
    >
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100">
          {icon || defaultIcon}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-800 truncate">{title}</p>
          {category && <p className="text-xs text-gray-500 truncate">{category}</p>}
        </div>
      </div>
      <div className="text-right">
        <p className={cn("text-sm font-semibold", isIncome ? "text-green-600" : "text-red-600")}>
          {isIncome ? '+' : '-'}${Math.abs(amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
        <p className="text-xs text-gray-400">{formattedDate}</p>
      </div>
    </div>
  );
};

export default TransactionListItem;