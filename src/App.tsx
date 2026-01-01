import { useState } from 'react';
import { Header } from './components/Header/Header';
import { BingoCard } from './components/BingoCard/BingoCard';
import { Controls } from './components/Controls/Controls';
import { LoadingScreen } from './components/LoadingScreen/LoadingScreen';
import { WinCelebration } from './components/WinCelebration/WinCelebration';
import { BackdropImage } from './components/BackdropImage/BackdropImage';
import { useBingoCard } from './hooks/useBingoCard';
import { useWinDetection } from './hooks/useWinDetection';
import styles from './App.module.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { card, toggleSquare, resetCard } = useBingoCard();
  const { isWon, winPattern } = useWinDetection(card);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handleReset = () => {
    resetCard();
  };

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div className={styles.app}>
      <BackdropImage />
      <Header />
      <main className={styles.main}>
        <BingoCard
          card={card}
          onSquareClick={toggleSquare}
          winPattern={winPattern}
        />
      </main>
      <Controls onReset={handleReset} isWon={isWon} />
      <WinCelebration isVisible={isWon} />
    </div>
  );
}

export default App;
