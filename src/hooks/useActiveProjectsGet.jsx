import { useEffect, useState } from "react"
import { getProjectList } from "../services/ApiProjects";

export default () => {
    const [isLoading, setIsLoading] = useState(true);
    const [projects, setProjects] = useState([])

    const getDataProject = async () => {
        const response = await getProjectList();
        console.log(response);
        setProjects(response)
        setIsLoading(false)
    }

    useEffect(() => {
        setIsLoading(true)
        getDataProject()
    }, [])

    return [isLoading, projects]
}