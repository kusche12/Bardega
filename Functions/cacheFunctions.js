import * as FileSystem from 'expo-file-system';

export const cacheImages = async (uri, docID) => {
    await FileSystem.downloadAsync(
        uri,
        FileSystem.documentDirectory + docID.toString() + ".jpg"
    ).then(({ uri }) => {
        return uri
    }).catch(() => {
        return null;
    })
}

export const cacheFirebaseAssets = (ref) => {
    ref.onSnapshot((querySnapShot) =>
        querySnapShot.forEach((doc) => cacheImages(doc.data.image, doc.id))
    )
}

export const getCachedImage = async (docID) => {
    let urlString = FileSystem.documentDirectory + docID.toString() + ".jpg";
    // let { exists } = await FileSystem.getInfoAsync(urlString);
    // if (exists) {
    //     return urlString;
    // }
    // return null;
}