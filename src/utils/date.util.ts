import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

export function formatDate(date: Date | number): string {
    return format(date, "dd/MM/yyyy", { locale: ptBR })
}

export function formatTime(date: Date | number): string {
    return format(date, "HH:mm", { locale: ptBR })
}

export function formatDateTime(date: Date | number): string {
    return format(date, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })
}
