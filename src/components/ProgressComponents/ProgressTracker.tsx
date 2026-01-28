import { useEffect, useState } from "react"
import { useCharacterStore } from "../../store"
import ProgressModal from "./ProgressModal"
import { getProgressByCharacterId } from "../../utils/api"

export default function ProgressTracker() {

    const { currentBook, setCurrentBook, progress, setProgress, character } = useCharacterStore();
    const [showProgressModal, setShowProgressModal] = useState<boolean>(false);
    
    useEffect(() => {
        if(character.id)
        getAllMyProgress(character.id)
    }, [character.id])

    function getAllMyProgress(id: number) {
        if (!id || id < 0) return

        getProgressByCharacterId(id).then(res => {
            if (res){
                setProgress(res)
                if(res.length === 1){
                    setCurrentBook(res[0])
                }
            }
        }).catch((error: Error) => {
            console.log(error)
        })
    }

    function updateCurrentBook(id: number) {
        console.log("Firing")
        const book = progress.find(b => b.id === id);
        console.log("Chosen Book: ", book?.book)
        if(book) setCurrentBook(book)
    }

    return (
        <div>
            <h3>Progress</h3>
            <section style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <div>
                    <h4>Current Book: {currentBook.book}</h4>
                    <p>Current Section: {currentBook.section}</p>
                    <button onClick={() => setShowProgressModal(true)}>Update/Add Progress</button>
                </div>
                <div>
                    <select value={currentBook?.id ?? ""} onChange={(e) =>{
                        updateCurrentBook(Number(e.target.value))}}>
                        {
                            progress.map(item => {
                                return <option value={item.id} key={item.id}>Book: {item.book}, Section: {item.section}</option>
                            })
                        }
                    </select>
                </div>
            </section>
            {
                showProgressModal && (
                    <ProgressModal setShowProgressModal={setShowProgressModal} getAllMyProgress={getAllMyProgress}/>
                )
            }
        </div>
    )
}