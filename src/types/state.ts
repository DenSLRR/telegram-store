export const USER_STATE = {
    MAIN: 'MAIN',
    START_ORDER: 'START_ORDER',
    ASKING_COUNT: 'ASKING_COUNT',
    ADD_OR_NO: 'ADD_OR_NO',

}

export type UserStateValues = typeof USER_STATE[keyof typeof USER_STATE];