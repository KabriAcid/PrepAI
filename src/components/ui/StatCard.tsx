import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
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
      className="stat-card group relative bg-gradient-to-br from-primary/30 via-primary/20 to-card rounded-xl p-6 overflow-hidden"
    >
      {/* Decorative Gradient Circles */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      {/* Content */}
      <div className="relative">
        {/* Top Section: Title/Value (Left) + Icon (Right) */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
              {title}
            </h3>
            <p className="text-2xl md:text-3xl font-display font-bold text-foreground">
              {value}
            </p>
          </div>

          <div className="ml-4 p-3 rounded-xl bg-accent/20 group-hover:bg-accent/30 transition-colors flex-shrink-0">
            <Icon className="w-6 h-6 text-accent" />
          </div>
        </div>

        {/* Bottom Section: Subtitle (Left) + Trend (Right) */}
        <div className="flex items-end justify-between pt-3">
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}

          {trend && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: delay + 0.2 }}
              className={`flex items-center gap-1.5 text-sm font-semibold ml-auto ${
                trend.isPositive ? "text-success" : "text-destructive"
              }`}
            >
              {trend.isPositive ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span>
                {trend.isPositive ? "+" : ""}
                {trend.value}%
              </span>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;
