import { ReactNode } from "react"
import { TextField } from "./fields/TextField"
import { TitleField } from "./layouts/TitleField"
import { SubTitleField } from "./layouts/SubTitleField"
import { ParagraphField } from "./layouts/ParagraphField"
import { SeparatorField } from "./layouts/SeparatorField"
import { SpacerField } from "./layouts/SpacerField"
import { NumberField } from "./fields/NumberFIeld"
import { TextAreaField } from "./fields/TextAreaField"
import { DateField } from "./fields/DateField"

export type ElementsType = "TextField" | "TitleField" | "SubTitleField" | "ParagraphField" | "SeparatorField" | "SpacerField" | "NumberField" | "TextAreaField" | "DateField"

export type SubmitFunction = (key: string, value: string) => void

export type FormElement = {
    type: ElementsType
    btnElement: {
        icon: ReactNode,
        label: string
    },
    designerComponent: React.FC<{ elementInstance: FormElementInstance }>,
    propertiesComponent: React.FC<{ elementInstance: FormElementInstance }>,
    previewComponent: React.FC<{ elementInstance: FormElementInstance, submitValue?: SubmitFunction, isInValid: boolean, defaultValue?: string }>

    constract: (id: string) => FormElementInstance;
    validate: (formElement: FormElementInstance, curentValue: string) => boolean;
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
    TextField: TextField,
    TitleField: TitleField,
    SubTitleField: SubTitleField,
    ParagraphField: ParagraphField,
    SeparatorField: SeparatorField,
    SpacerField: SpacerField,
    NumberField: NumberField,
    TextAreaField: TextAreaField,
    DateField: DateField
}