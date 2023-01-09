import moment, { isDate } from "moment"
import { isStringLiteral } from "typescript"

export const formatDate = (date: Date | string) => {
    if (isDate(date)) return moment(date).format('DD.MM.YYYY')
    return date
}