const userlogin = (userinfo) => {
    return {
        type: "USERLOGIN",
        payload: userinfo
    }
}

const userlogout = () => {
    return {
        type: "USERLOGOUT"
    }
}

const systemconfigenv = (info) => {
    return {
        type: "SYSTEMCONFIGENV",
        payload: info
    }
}

export default {
    userlogin,
    userlogout,
    systemconfigenv
}