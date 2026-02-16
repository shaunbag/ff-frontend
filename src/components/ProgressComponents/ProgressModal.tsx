import { useState, type FormEvent } from "react";
import { useCharacterStore } from "../../store";
import { addProgress, updateProgressById } from "../../utils/api";
import type { ProgressDto } from "../../utils/Types";

type Props = {
    setShowProgressModal: (value: boolean) => void;
    getAllMyProgress: (id: number) => void;
}

export default function ProgressModal({ setShowProgressModal, getAllMyProgress }: Props) {

    const { character, currentBook } = useCharacterStore();
    const [name, setName] = useState<string>("");
    const [section, setSection] = useState<number>(0);
    const [toggle, setToggle] = useState<boolean>(false);

    function reset() {
        setName("")
        setSection(0)
        setToggle(false)
        setShowProgressModal(false)
    }

    function addNewBookAndSection(e: FormEvent<HTMLFormElement>,book: string, section: number){
        e.preventDefault()
        const progressDto: ProgressDto = {
            book: book,
            section: section,
            characterId: character.id
        } 
        addProgress(progressDto).then(res => {
            console.log(res)
            getAllMyProgress(character.id)
        }).catch((error: Error) => {
            console.log(error)
        })
        reset()
    }

    function updateCurrentBook(e: FormEvent<HTMLFormElement>,section: number){
        e.preventDefault()
        const progressDto: ProgressDto = {
            book: currentBook.book,
            section: section,
            characterId: character.id
        }
        updateProgressById(currentBook.id, progressDto).then(res => {
            console.log(res)
            getAllMyProgress(character.id)
        }).catch((error: Error) => {
            console.log(error)
        })
        reset()
    }

    return (
        <div className='modal-background'>
            <div className='modal-container'>
                <h3>Press To Toggle Adding New Or Updating Current</h3>
                <button onClick={() => setToggle(prev => !prev)}>{toggle ? "Add New Book" : "Update Progress"}</button>
                {
                    toggle ?
                        <>
                            <h3>Update Progress</h3>
                            <form onSubmit={(e) => updateCurrentBook(e, section)} style={{ display: 'flex', flexDirection: 'column' }}>
                                <label htmlFor='book-name'>Current Book: </label>
                                <p>Current Book: {currentBook.book}</p>
                                <label htmlFor='book-section'>New Section: </label>
                                <input id='book-section' type='text' value={section} onChange={(e) => setSection(Number(e.target.value))} />
                                <button type='submit'>Submit</button>
                            </form>
                        </>

                        :

                        <>
                            <h3>Add New Book And Progress</h3>
                            <form onSubmit={(e) => addNewBookAndSection(e, name, section)} style={{ display: 'flex', flexDirection: 'column' }}>
                                <label htmlFor='book-name'>Book Name: </label>
                                <input id='book-name' type='text' value={name} onChange={(e) => setName(e.target.value)} />
                                <label htmlFor='book-section'>Book Section: </label>
                                <input id='book-section' type='text' value={section} onChange={(e) => setSection(Number(e.target.value))} />
                                <button type='submit'>Submit</button>
                            </form>
                        </>


                }

                <button onClick={() => setShowProgressModal(false)}>Close</button>
            </div>
        </div>
    )
}