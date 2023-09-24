import { Notify } from 'quasar'

export function show_informer(message_text: string) {
    Notify.create({
        icon: ':)',
        type: 'positive',
        message: message_text
    })
}

export function show_warning(message_text: string) {
    Notify.create({
        type: '!',
        message: message_text
    })
}

export function show_error(message_text: string) {
    Notify.create({
        type: ':(',
        message: message_text
    })
}