import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router';

const Home = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref });
    const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1.2]);

    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-black to-purple-950">
            {/* Hero Section */}
            <motion.section
                style={{ scale }}
                className="relative h-screen flex items-center justify-center overflow-hidden"
            >
                <div className="absolute inset-0 bg-[url('https://assets.codepen.io/1468070/star-bg.svg')] animate-pulse-slow opacity-20" />

                <div className="relative z-10 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5 }}
                        className="text-7xl font-bold bg-gradient-to-r from-yellow-400 to-slate-100 bg-clip-text text-transparent"
                    >
                        E-commerce Store
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-8"
                    >
                        <Link to="/products">
                            <div className="px-12 py-4 text-white text-xl font-semibold transition-all duration-500 bg-transparent border-2 border-yellow-400 rounded-full hover:bg-yellow-400/10 hover:shadow-glow">
                                Explore Collection
                            </div>
                        </Link>;
                    </motion.div>
                </div>

                {/* Efecto Partículas */}
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(50)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-particle"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${i * 0.1}s`
                            }}
                        />
                    ))}
                </div>
            </motion.section>

            {/* Carrusel de Productos */}


            {/* Estilos Personalizados */}
            <style>{`
                @keyframes infinite-scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }

                .animate-infinite-scroll {
                    animation: infinite-scroll 40s linear infinite;
                }

                @keyframes particle {
                    0% { transform: translateY(0) scale(1); opacity: 0.8; }
                    100% { transform: translateY(-100vh) scale(0); opacity: 0; }
                }

                .animate-particle {
                    animation: particle 8s linear infinite;
                }

                .hover\:shadow-glow:hover {
                    box-shadow: 0 0 40px rgba(59, 130, 246, 0.3);
                }
            `}</style>
        </div>
    );
};

export default Home;