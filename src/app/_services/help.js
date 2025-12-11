export function isImage(file) {
    return /\.(jpg|jpeg|png|gif|webp|bmp|svg)$/i.test(file);
}

export function isVideo(file) {
    return /\.(mp4|webm|ogg|mov|avi|mkv)$/i.test(file);
}
