"use client"

import React, {
  useEffect,
  useMemo,
  useState,
  type ComponentPropsWithoutRef,
} from "react"
import { AnimatePresence, motion, type MotionProps } from "motion/react"

import { cn } from "@/lib/utils"

export function AnimatedListItem({ children }: { children: React.ReactNode }) {
  const animations: MotionProps = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1, originY: 0 },
    exit: { scale: 0, opacity: 0 },
    transition: { type: "spring", stiffness: 350, damping: 40 },
  }

  return (
    <motion.div {...animations} layout className="mx-auto w-full">
      {children}
    </motion.div>
  )
}

export interface AnimatedListProps extends ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode
  delay?: number
}

export const AnimatedList = React.memo(
  ({ children, className, delay = 1000, ...props }: AnimatedListProps) => {
    const [items, setItems] = useState<{ element: React.ReactNode; id: number }[]>([])
    const nextIdRef = React.useRef(0)
    const childrenArray = useMemo(
      () => React.Children.toArray(children),
      [children]
    )

    useEffect(() => {
      if (childrenArray.length === 0) return

      // Add the first item immediately
      const firstId = nextIdRef.current++
      setItems([{ element: childrenArray[0], id: firstId }])

      let currentIndex = 1

      const interval = setInterval(() => {
        const wrappedIndex = currentIndex % childrenArray.length
        const id = nextIdRef.current++
        setItems((prev) => [{ element: childrenArray[wrappedIndex], id }, ...prev])
        currentIndex++
      }, delay)

      return () => clearInterval(interval)
    }, [delay, childrenArray])

    return (
      <div
        className={cn(
          `flex flex-col items-center gap-4 overflow-hidden`,
          className
        )}
        {...props}
      >
        <AnimatePresence>
          {items.map((item) => (
            <AnimatedListItem key={item.id}>
              {item.element}
            </AnimatedListItem>
          ))}
        </AnimatePresence>
      </div>
    )
  }
)

AnimatedList.displayName = "AnimatedList"