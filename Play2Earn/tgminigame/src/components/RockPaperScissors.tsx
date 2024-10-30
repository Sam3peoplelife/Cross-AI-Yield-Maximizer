import { useState } from "react";
import { ConnectButton, TransactionButton, useActiveAccount, useActiveWallet, useDisconnect, useReadContract } from "thirdweb/react";
import { client } from "../client";
import { inAppWallet } from "thirdweb/wallets";
import { shortenAddress } from "thirdweb/utils";
import { getContract } from "thirdweb";
import { sepolia } from "thirdweb/chains";
import { claimTo, getBalance } from "thirdweb/extensions/erc20";

type Choice = 'Rock' | 'Paper' | 'Scissors' | 'Lizard' | 'Spock';
type Result = 'Win' | 'Lose' | 'Tie';
type Theme = 'default' | 'dark' | 'ocean' | 'forest' | 'space';
type SparkleMultiplier = 'standart' |'double' | 'triple' | 'fiveTimes';

const choices: Choice[] = ['Rock', 'Paper', 'Scissors', 'Lizard', 'Spock'];
const themes: Theme[] = ['default', 'dark', 'ocean', 'forest', 'space'];
const avatars: string[] = ['🤖', '🧙‍♂️', '🧟', '🧛‍♂️', '👨‍🚀', '🦸‍♂️', '🧞‍♂️', '👨‍💻', '👨‍⚕️', '👨‍🏫'];
const sparkles: SparkleMultiplier[] = ['standart' ,'double', 'triple', 'fiveTimes'];
const sparkleIcons = {standart: '⭐' ,double: '✨', triple: '💫', fiveTimes: '🌟' };

const getComputerChoice = (): Choice => choices[Math.floor(Math.random() * choices.length)];

const determineWinner = (playerChoice: Choice, computerChoice: Choice): Result => {
    if (playerChoice === computerChoice) return 'Tie';
    if (
        (playerChoice === 'Rock' && ['Scissors', 'Lizard'].includes(computerChoice)) ||
        (playerChoice === 'Paper' && ['Rock', 'Spock'].includes(computerChoice)) ||
        (playerChoice === 'Scissors' && ['Paper', 'Lizard'].includes(computerChoice)) ||
        (playerChoice === 'Lizard' && ['Spock', 'Paper'].includes(computerChoice)) ||
        (playerChoice === 'Spock' && ['Scissors', 'Rock'].includes(computerChoice))
    ) {
        return 'Win';
    }
    return 'Lose';
};

interface GameResult {
    playerChoice: Choice;
    computerChoice: Choice;
    gameResult: Result;
}

const choiceEmojis: { [key in Choice]: string } = {
    Rock: '🌎',
    Paper: '📝',
    Scissors: '✂️',
    Lizard: '🦎',
    Spock: '🖖️',
};

const itemPrices = {
    theme: { dark: 10, ocean: 15, forest: 15, space: 20 },
    avatar: 5,
    sparkle: { double: 5, triple: 10, fiveTimes: 15, standart: 0 }
};

const ChoiceAnimation = ({ playerChoice, computerChoice, isAnimating }: { playerChoice: Choice, computerChoice: Choice, isAnimating: boolean }) => {
    return (
        <div className={`choice-animation ${isAnimating ? 'animate' : ''}`}>
            <div className="player-choice">{choiceEmojis[playerChoice]}</div>
            <div className="computer-choice">{choiceEmojis[computerChoice]}</div>
        </div>
    );
};

export default function RockPaperScissors() {
    const account = useActiveAccount();
    const {disconnect} = useDisconnect();
    const wallet = useActiveWallet();

    const contract = getContract({
        client: client,
        chain: sepolia,
        address: "0x414E5167Adc9a4342c53C8A76CCB49bc1AFFA918"
    });

    const [inventory, setInventory] = useState({
        themes: ['default'],
        avatars: ['🤖'],
        sparkles: ['standart'] as SparkleMultiplier[],
    });

    const [result, setResult] = useState<GameResult | null>(null);
    const [showPrize, setShowPrize] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [prizeClaimed, setPrizeClaimed] = useState<boolean>(false);
    const [isAnimating, setIsAnimating] = useState<boolean>(false);
    const [selectedTheme, setSelectedTheme] = useState<Theme>('default');
    const [selectedAvatar, setSelectedAvatar] = useState<string>('🤖');
    const [selectedSparkle, setSelectedSparkle] = useState<SparkleMultiplier | null>(null);

    const purchaseItem = (category: 'themes' | 'avatars' | 'sparkles', item: string) => {
        let price = 0;
        if (category === 'themes') price = itemPrices.theme[item as keyof typeof itemPrices.theme] ?? 0;
        else if (category === 'avatars') price = itemPrices.avatar;
        else if (category === 'sparkles') price = itemPrices.sparkle[item as keyof typeof itemPrices.sparkle] ?? 0;
    
        if (tokenbalance?.displayValue !== undefined) {
            if (account && parseInt(tokenbalance.displayValue) >= price) {
                if (category === 'themes') {
                    setInventory((prevInventory) => ({ ...prevInventory, themes: [...prevInventory.themes, item] }));
                } else if (category === 'avatars') {
                    setInventory((prevInventory) => ({ ...prevInventory, avatars: [...prevInventory.avatars, item] }));
                } else if (category === 'sparkles') {
                    setInventory((prevInventory) => ({ ...prevInventory, sparkles: [...prevInventory.sparkles, item as SparkleMultiplier] }));
                }
            } else {
                console.error('Insufficient funds to purchase item');
            }
        } else {
            alert("Token balance is not available.");
        }
    };

    const applyTheme = (theme: Theme) => {
        if (inventory.themes.includes(theme)) setSelectedTheme(theme);
    };

    const applyAvatar = (avatar: string) => {
        if (inventory.avatars.includes(avatar)) setSelectedAvatar(avatar);
    };

    const applySparkle = (sparkle: SparkleMultiplier) => {
        if (inventory.sparkles.includes(sparkle)) setSelectedSparkle(sparkle);
    };

    const handleChoice = (playerChoice: Choice) => {
        const computerChoice = getComputerChoice();
        const gameResult = determineWinner(playerChoice, computerChoice);
        setResult({ playerChoice, computerChoice, gameResult });
        setIsAnimating(true);
        setTimeout(() => {
            setIsAnimating(false);
            setShowPrize(gameResult === 'Win');
        }, 2000);
    };

    const resetGame = () => {
        setResult(null);
        setShowPrize(false);
        setPrizeClaimed(false);
        setIsAnimating(false);
    };

    const claimPrize = () => {
        setShowModal(true);
    };

    const { data: tokenbalance } = useReadContract(
        getBalance,
        {
            contract: contract,
            address: account?.address!
        }
    );

    return (
        <div className={`game-container theme-${selectedTheme}`} style={{ backgroundColor: '#f0f0f0', color: '#333' }}>
            <div style={{ padding: '2rem', width: '100%', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                <h1>RPC Game</h1>
                <h2>{selectedAvatar} vs Computer</h2>
                {!account ? (
                    <ConnectButton
                        client={client}
                        accountAbstraction={{ chain: sepolia, sponsorGas: true }}
                        wallets={[inAppWallet({ auth: { options:["email"] } })]}
                    />
                ) : (
                    <>
                        <div>
                            <p>{shortenAddress(account.address)}</p>
                            <p>Balance: {tokenbalance?.displayValue}</p>
                            <button onClick={() => disconnect(wallet!)} style={{ padding: '0.5rem', background: '#dc3545', color: 'white' }}>Logout</button>
                        </div>
                        
                        <div style={{ marginTop: '1rem' }}>
                            <h3>Choose your option:</h3>
                            <div className="choice-container">
                                {choices.map((choice) => (
                                    <button key={choice} onClick={() => handleChoice(choice)}>{choiceEmojis[choice]}</button>
                                ))}
                            </div>
                        </div>

                        {result && (
                            <div>
                                <ChoiceAnimation playerChoice={result.playerChoice} computerChoice={result.computerChoice} isAnimating={isAnimating} />
                                <p>Result: {result.gameResult}</p>
                                <button onClick={resetGame}>Try Again</button>
                                {result && showPrize && selectedSparkle !== null && (
                                    <button onClick={claimPrize}>
                                        Claim Prize {sparkleIcons[selectedSparkle]}
                                    </button>
                                )}
                                {showModal && (
                                    <div>
                                        <h2>Claim {selectedSparkle === 'fiveTimes' ? '5 Tokens!' : selectedSparkle === 'triple' ? '3 Tokens!' : selectedSparkle ==='double' ? '2 Tokens!' : ' 1 Token!'}</h2>
                                        <TransactionButton
                                            transaction={() => claimTo({
                                                contract: contract,
                                                to: account.address,
                                                quantity: selectedSparkle === 'fiveTimes' ? "5" : selectedSparkle === 'triple' ? "3" : selectedSparkle === 'double' ? "2" : "1"
                                            })}
                                            onTransactionConfirmed={() => {
                                                alert('Prize claimed!');
                                                setShowModal(false);
                                                setPrizeClaimed(true);
                                            }}
                                        >Claim Prize</TransactionButton>
                                    </div>
                                )}
                            </div>
                        )}

                    <div style={{ marginTop: '2rem' }}>
                    <h3>Shop</h3>
                    <h4>Themes</h4>
                    <div>
                    {themes.map(theme => (
                        <button
                            key={theme}
                            onClick={() => inventory.themes.includes(theme) ? applyTheme(theme) : purchaseItem('themes', theme)}
                            style={{
                            backgroundColor: inventory.themes.includes(theme) ? 'white' : 'gray',
                            color: 'black',
                            borderColor: 'black',
                            cursor: inventory.themes.includes(theme) ? 'pointer' : 'not-allowed'
                            }}
                        >
                            {inventory.themes.includes(theme) ? theme : `🔒 ${theme} (${itemPrices.theme[theme as keyof typeof itemPrices.theme]} Tokens)`}
                        </button>
                        ))}
                    </div>

                    <h4>Avatars</h4>
                    <div>
                        {avatars.map(avatar => (
                            <button
                                key={avatar}
                                onClick={() => inventory.avatars.includes(avatar) ? applyAvatar(avatar) : purchaseItem('avatars', avatar)}
                                style={{
                                    backgroundColor: inventory.avatars.includes(avatar) ? 'white' : 'gray',
                                    color: 'black',
                                    borderColor: 'black',
                                    cursor: inventory.avatars.includes(avatar) ? 'pointer' : 'not-allowed'
                                }}
                            >
                                {inventory.avatars.includes(avatar) ? avatar : `🔒 ${avatar} (${itemPrices.avatar} Tokens)`}
                            </button>
                        ))}
                    </div>

                    <h4>Prize Multipliers</h4>
                    <div>
                        {sparkles.map(sparkle => (
                            <button
                                key={sparkle}
                                onClick={() => inventory.sparkles.includes(sparkle) ? applySparkle(sparkle) : purchaseItem('sparkles', sparkle)}
                                style={{
                                    backgroundColor: inventory.sparkles.includes(sparkle) ? 'white' : 'gray',
                                    color: 'black',
                                    borderColor: 'black',
                                    cursor: inventory.sparkles.includes(sparkle) ? 'pointer' : 'not-allowed'
                                }}
                            >
                                {inventory.sparkles.includes(sparkle) ? `${sparkleIcons[sparkle]} ${sparkle}` : `🔒 ${sparkleIcons[sparkle]} ${sparkle} (${itemPrices.sparkle[sparkle]} Tokens)`}
                            </button>
                        ))}
                    </div>
                </div>
                    </>
                )}
            </div>
        </div>
    );
}
