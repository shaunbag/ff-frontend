import { useRef, useEffect, useState } from "react";
import { useCharacterStore } from "../../store"
import { getTreasureByCharacterId, deleteTreasureById } from "../../utils/api";
import TreasureModal from "./TreasureModal";

export default function Treasure(){

    const { treasure, setTreasure, character } = useCharacterStore();
    const characterRef = useRef(character);
    const [showTreasureModel, setShowTreasureModal] = useState(false);

    useEffect(() => {
        getTreasure();
        characterRef.current = character;
    },[character])

    function getTreasure(){
        getTreasureByCharacterId(characterRef.current.id).then(res => {
          setTreasure(res);  
        })
    }

    function deleteTreasureFromList(id: number){
        deleteTreasureById(id).then(res => {
            console.log(res)
        }).finally(() => {
            getTreasure()
        })
    }

    return(
        <div>
            <h3>Treasure</h3>
            <button onClick={() => setShowTreasureModal(true)} style={{ margin: 10 }}>Add Treasure</button>
            <table>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Value</td>
                        <td>DELETE</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        treasure.map(item => {
                            return <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.value}</td>
                                <td><button onClick={() => deleteTreasureFromList(item.id)}>DELETE</button></td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
            {
                showTreasureModel && (
                    <TreasureModal setShowTreasureModal={setShowTreasureModal} updateTreasure={getTreasure}/>
                )
            }
        </div>
    )
} 