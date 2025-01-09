export const USER_STATE = {
    MAIN: 'MAIN',
    START_ORDER: 'START_ORDER',
    ASKING_COUNT: 'ASKING_COUNT',
    ADD_OR_NO: 'ADD_OR_NO',
    GET_PERSON_NAME: 'GET_PERSON_NAME',
    GET_ADDRESS: 'GET_ADDRESS',
    GET_PERSON_PHONE: 'GET_PERSON_PHONE',
    CONFIRM_ORDER: 'CONFIRM_ORDER'


}

export type UserStateValues = typeof USER_STATE[keyof typeof USER_STATE];