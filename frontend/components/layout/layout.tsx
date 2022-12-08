import React, { ReactNode } from 'react'
import { motion } from 'framer-motion'

type Props = {
    children: ReactNode
    title: string
    description: string
}

const variants = {
    hidden: { opacity: 0, x: 0, y: 200 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: 100 },
}

const Layout = ({ children}: Props): JSX.Element => (
    <div>
        <motion.main
            initial="hidden"
            animate="enter"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.5, delay:0.2,  type: 'linear' }}>
            {children}
        </motion.main>
    </div>
)

export default Layout