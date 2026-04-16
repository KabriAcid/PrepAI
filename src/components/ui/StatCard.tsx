import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string | null;
  icon: LucideIcon;
  trend?: {
    value: string | number;
    label?: string;
    isPositive: boolean;
  };
  delay?: number;
}

const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  delay = 0,
}: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="rounded-xl border border-spiritual-200 bg-white p-5 shadow-soft"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="mb-1 text-xs uppercase tracking-wide text-spiritual-500">
            {title}
          </h3>
          <p className="text-2xl font-bold text-spiritual-900 md:text-3xl">
            {value}
          </p>
        </div>

        <div className="ml-3 rounded-lg bg-primary-50 p-2.5">
          <Icon className="h-5 w-5 text-primary-600" />
        </div>
      </div>

      <div className="mt-3 flex items-end justify-between border-t border-spiritual-100 pt-3">
        <p className="text-xs text-spiritual-500">{subtitle ?? ' '}</p>
        {trend && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: delay + 0.15 }}
            className={`ml-auto flex items-center gap-1 text-xs font-semibold ${trend.isPositive ? "text-success-600" : "text-error-600"}`}
          >
            {trend.isPositive ? (
              <TrendingUp className="h-3.5 w-3.5" />
            ) : (
              <TrendingDown className="h-3.5 w-3.5" />
            )}
            <span>
              {trend.value}
              {trend.label ? ` ${trend.label}` : ""}
            </span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default StatCard;
