import { ReactNode } from "react"
import { TextField } from "./fields/TextField"

export type ElementsType = "TextField"


export type FormElement = {
    type: ElementsType
    btnElement: {
        icon: ReactNode,
        label: string
    },
    designerComponent: React.FC<{elementInstance:FormElementInstance}>,
    propertiesComponent: React.FC<{elementInstance:FormElementInstance}>,
    previewComponent: React.FC<{elementInstance:FormElementInstance}>

    constract: (id: string) => FormElementInstance;
}

export type FormElementInstance = {
    id: string,
    type: ElementsType,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    extraAttributes: Record<string, any>
}

type FormElementsType = {
    [key in ElementsType]: FormElement
}
export const FormElements: FormElementsType = {
    TextField: TextField
}