import React from 'react'
import clsx from 'clsx'

interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  maxValue?: number
  showLabel?: boolean
  animated?: boolean
}

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ className, value, maxValue = 100, showLabel = true, animated = true, ...props }, ref) => {
    const percentage = Math.min(Math.max((value / maxValue) * 100, 0), 100)

    return (
      <div ref={ref} className={clsx('w-full', className)} {...props}>
        {showLabel && (
          <div className="mb-1 flex justify-between text-xs font-medium text-spiritual-600">
            <span>Progress</span>
            <span>{Math.round(percentage)}%</span>
          </div>
        )}
        <div className="h-2 w-full overflow-hidden rounded-full bg-spiritual-200">
          <div
            className={clsx(
              'h-full rounded-full bg-gradient-to-r from-primary-500 to-secondary-500',
              animated && 'transition-all duration-500 ease-out'
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    )
  }
)

ProgressBar.displayName = 'ProgressBar'

export default ProgressBar
