import { useState } from "react"
import { useCharacterStore } from "../../store"
import { updateCharacterStats } from "../../utils/utilityFunctions";

type Props = {
    setShowLuckModal: (value: boolean) => void;
};


export default function LuckCheckModal({ setShowLuckModal }: Props) {

    const { character, setCharacter } = useCharacterStore();
    const [result, setResult] = useState("");

    function checkLuck() {
        const dieRoll = Math.floor((Math.random() * 12) + 1);
        setResult(dieRoll <= character.luck ? "👍 You Have Been Lucky 👍" : "👎 You Have Been Unlucky 👎");
        const playerUpdate = { ...character, luck: character.luck - 1 }
        setCharacter(playerUpdate)
        updateCharacterStats(playerUpdate)
    }


    return (
        <div className="modal-background">
            <div className="modal-container">
                <h3>Current Luck: {character.luck}</h3>
                <p>Testing Luck decreases Your Luck By 1!!</p>
                <br />
                <button onClick={() => checkLuck()}>Test Luck</button>
                <button onClick={() => {
                    setResult("")
                    setShowLuckModal(false)
                }
                }>Close</button>
                {result}
            </div>
        </div>
    )
}