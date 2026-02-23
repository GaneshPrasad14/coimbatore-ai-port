import { motion } from 'framer-motion';
import { ReactNode } from 'react';

const PageWrapper = ({ children }: { children: ReactNode }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
        {children}
    </motion.div>
);

export default PageWrapper;
