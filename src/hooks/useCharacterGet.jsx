import { useEffect, useState } from "react"
import getCharacters from "../services/getCharacters";

export default () => {
    const [isLoading, setIsLoading] = useState(true);
    const [characters, setCharacters] = useState([])

    const getDataCharacters = async () => {
        const response = await getCharacters();
        setCharacters(response)
        setIsLoading(false)
    }

    useEffect(() => {
        setIsLoading(true)
        getDataCharacters()
    }, [])

    return [isLoading, characters]
}