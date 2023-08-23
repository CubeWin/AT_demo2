import { createContext } from 'react'
import { projectStore } from '../helpers/ProjectStore'

export const ProjectContext = createContext()

export const ProjectProvider = ({ children }) => {
  const { project, setProject, query, setQuery, setField, queryField, table, setTable, setQueryField, sheet, setSheet } = projectStore()
  return (
    <ProjectContext.Provider
      value={{
        project,
        setProject,
        query,
        setQuery,
        setField,
        queryField,
        table,
        setTable,
        setQueryField,
        sheet,
        setSheet
      }}
    >
      {children}
    </ProjectContext.Provider>
  )
}
