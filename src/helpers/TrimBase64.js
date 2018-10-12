const trimBase64 = base64String => {
    const trimLength = base64String.indexOf('base64');
    const result = base64String.slice(trimLength + 7)
    
    return result;
}

export default trimBase64;