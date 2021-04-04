const APP_PRIMARY_COLOR = '#0374e8'; // previously #6205ee
const formatAvatarText = (name) => {
    const splitBySpace = name.split(" ").slice(0, 2)
    let formattedData = ""
    for (const data of splitBySpace) {
        formattedData += data.charAt(0).toUpperCase()
    }
    return formattedData;
}

export { APP_PRIMARY_COLOR, formatAvatarText }