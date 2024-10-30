import Link from 'next/link';

import styles from '@/app/app.module.css';

export const Cards = () => {
  return (
    <div className={styles.grid}>
      <Link
        href="https://t.me/Yield_Maximizer_AI_bot"
        className={styles.card}
        target='_blank'
        rel="noopener noreferrer"
      >
        <h2>
          Our Wallet <span>-&gt;</span>
        </h2>
        <p>Checkout our wallet in telegram bot</p>
      </Link>

      <Link
        href="https://t.me/pixel_fight_yieldai_bot/MCMGW3H"
        className={styles.card}
        rel="noopener noreferrer"
      >
        <h2>
          Play2Earn Game <span>-&gt;</span>
        </h2>
        <p>Also you can try our game to win rewards</p>
      </Link>

      <Link
        href="/hello-near"
        className={styles.card}
        rel="noopener noreferrer"
      >
        <h2>
          Yield Maximizer <span>-&gt;</span>
        </h2>
        <p>Try out our new tool for yielding with AI</p>
      </Link>
    </div>
  );
};