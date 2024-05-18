import { writable } from "svelte/store"

export const APP_STATUS = {
    INIT:0,
    LOADING:1,
    CHAT_MODE:2,
    ERROR:-1
}

export const appStatus = writable(APP_STATUS.INIT)

export const SetAppStatusLoading = () => {
    appStatus.set(APP_STATUS.LOADING)
}

export const SetAppStatusError =() => {
    appStatus.set(APP_STATUS.ERROR)
}

export const SetAppStatusChatMode =(response: any) => {
    appStatus.set(APP_STATUS.CHAT_MODE)
}

