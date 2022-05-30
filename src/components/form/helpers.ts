import * as models from './models'
import { eFieldType } from './enumerations'

export const getFieldName = (obj: models.Field | models.FieldContainer): string => {
    return obj?.name?.values?.$values
        .map(txt => txt.value)
        .join(" | ") as string;
}

export const getSelectedFieldLabels = (options: models.Option[]): string => {
    return options?.filter(opt => opt.selected)
        .map(opt => opt.optionText?.values.$values
            .map(txt => txt.value)
            .join(" / ")
        )
        .join(", ")
}

export const getFieldType = (field: models.Field): eFieldType => {
    let typeName: string = field?.$type.substring(0, field.$type.indexOf(","));
    typeName = typeName?.substring(typeName.lastIndexOf(".") + 1);
    return (<any>eFieldType)[typeName];
}

export const testFieldType = (field: models.Field, type: eFieldType): boolean => {
    return getFieldType(field) === type;
}