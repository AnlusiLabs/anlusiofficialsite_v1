import { motion, AnimatePresence } from 'framer-motion'
import type { CurtainTransitionProps } from '../../types'

export default function CurtainTransition({ isActive }: CurtainTransitionProps) {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ y: '-100%' }}
          animate={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ 
            duration: 0.8, 
            ease: [0.25, 0.46, 0.45, 0.94] 
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ 
            background: 'var(--primary-bg)',
            pointerEvents: isActive ? 'auto' : 'none' 
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className="text-2xl font-semibold"
            style={{ color: 'var(--primary-text)' }}
          >
            Loading...
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
