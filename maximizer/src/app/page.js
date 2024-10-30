import Image from 'next/image';
import NearLogo from '/public/near.svg';
import NextLogo from '/public/next.svg';
import { Cards } from '@/components/cards';
import styles from './app.module.css';
import Logo from '../logo.jpg'; 

export default function Home() {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <Image src={Logo} alt="Maximizer Logo" width={50} height={50} className={styles.logo} />
        </div>
        <h1 className={styles.title}>Cross-AI Yield Maximizer</h1>
      </header>

      <div className={styles.content}>
        <section className={styles.section}>
          <p>
            The Cross-AI Yield Maximizer is a decentralized finance (DeFi) platform designed to help users optimize 
            their yield farming investments using advanced AI predictions. By leveraging artificial intelligence, 
            the platform continuously analyzes various protocols across multiple blockchains, 
            such as Ethereum and NEAR, to identify the best opportunities for maximizing returns.
          </p>
        </section>

        <section className={styles.section}>
          <p>
            <strong>AI-Powered Investment Proposals:</strong> The platform's AI engine continuously evaluates 
            DeFi protocols and presents users with yield farming opportunities 
            based on real-time analysis of Total Value Locked (TVL), risk level, and expected returns.
          </p>
        </section>

        <section className={styles.grid}>
          <Cards />
        </section>
      </div>
    </main>
  );
}
