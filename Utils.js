const SERVER_URL = 'http://localhost/api/v1/vault-records';

const formatAvatarText = (name) => {
    const splitBySpace = name.split(" ").slice(0, 2)
    let formattedData = ""
    for (const data of splitBySpace) {
        formattedData += data.charAt(0).toUpperCase()
    }
    return formattedData;
}

export {SERVER_URL, formatAvatarText}