const showloading = (text) => {
    return {
        type: "SHOWLOADING",
        payload: text
    }
}

const hideloading = () => {
    return {
        type: "HIDELOADING"
    }
}

export default {
    showloading,
    hideloading
}