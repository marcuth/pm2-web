import { FC, ReactNode } from "react"

type Props = {
    children: ReactNode
}

const Providers: FC<Props> = ({ children }) => {
    return <>{children}</>
}

export default Providers
