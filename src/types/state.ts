export const USER_STATE = {
    MAIN: 'MAIN',

}

export type UserStateValues = typeof USER_STATE[keyof typeof USER_STATE];