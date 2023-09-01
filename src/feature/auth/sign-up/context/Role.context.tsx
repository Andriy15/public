import { createContext, useContext, useState } from 'react'

interface IRoleContext {
	role: string
	setRole: (role: string) => void
}

export const RoleContext = createContext<IRoleContext>({
	role: '',
	setRole: () => {}
})

export const RoleState: React.FC<{ children: React.ReactNode }> = ({
	children
}) => {
	const [role, setRole] = useState('')

	const setRoleState = (newRole: string) => {
		setRole(newRole)
	}

	return (
		<RoleContext.Provider value={{ role, setRole: setRoleState }}>
			{children}
		</RoleContext.Provider>
	)
}

export const useRole = () => {
	const { role, setRole } = useContext(RoleContext)

	return { role, setRole }
}
