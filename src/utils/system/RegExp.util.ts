export default {
    headers: /<h[1-6]>/,
    special_charts: /[!@#$%^&*()_+{}\[\]:;<>,.?/\\~\-]/,
    integers: /[0-9]/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    rtl: /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/,
    ltr: /[\u0041-\u005A\u0061-\u007A\u00C0-\u00FF]/
}