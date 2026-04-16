import React from 'react'
import clsx from 'clsx'

interface SkeletonLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number
  height?: string | number
  circle?: boolean
}

const SkeletonLoader = React.forwardRef<HTMLDivElement, SkeletonLoaderProps>(
  ({ className, width, height, circle = false, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'bg-spiritual-200 animate-pulse',
          circle && 'rounded-full',
          !circle && 'rounded-lg',
          className
        )}
        style={{
          width: width ?? '100%',
          height: height ?? '1rem',
          ...style,
        }}
        {...props}
      />
    )
  }
)

SkeletonLoader.displayName = 'SkeletonLoader'

export const SkeletonStatCard: React.FC = () => (
  <div className="space-y-3 rounded-xl border border-white/20 bg-white/90 p-4 shadow-soft sm:p-6">
    <div className="flex justify-between">
      <SkeletonLoader width="40px" height="40px" circle />
      <SkeletonLoader width="60px" height="24px" />
    </div>
    <SkeletonLoader width="80%" height="20px" />
    <SkeletonLoader width="60%" height="32px" />
    <SkeletonLoader width="100%" height="4px" />
  </div>
)

export const SkeletonExamCard: React.FC = () => (
  <div className="space-y-3 rounded-xl border border-white/20 bg-white/90 p-4 shadow-soft sm:p-5">
    <SkeletonLoader width="70%" height="24px" />
    <div className="flex gap-2">
      <SkeletonLoader width="100px" height="20px" />
      <SkeletonLoader width="100px" height="20px" />
    </div>
    <SkeletonLoader width="100%" height="40px" />
  </div>
)

export const SkeletonChart: React.FC = () => (
  <div className="space-y-4 rounded-xl border border-white/20 bg-white/90 p-4 shadow-soft sm:p-6">
    <SkeletonLoader width="60%" height="24px" />
    <div className="space-y-2">
      {[1, 2, 3, 4].map((i) => (
        <SkeletonLoader key={i} width="100%" height="40px" />
      ))}
    </div>
    <div className="grid grid-cols-2 gap-4">
      <SkeletonLoader width="100%" height="40px" />
      <SkeletonLoader width="100%" height="40px" />
    </div>
  </div>
)

export default SkeletonLoader
