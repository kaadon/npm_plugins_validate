export function isChsAlphaNum(s) {
    return /^[\u4e00-\u9fa5_a-zA-Z0-9]{4,32}$/.test(s)
}