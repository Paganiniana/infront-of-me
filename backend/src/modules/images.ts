
const ACCEPTABLE_FORMAT_STRINGS = ["jpg", "jpeg", "png"] as const;
type VALID_IMAGE_FORMAT = typeof ACCEPTABLE_FORMAT_STRINGS[number];

export function getSerializedUrl(image: Buffer, mime:string) {
    // convert to base64 representation
    const encoding = "base64";
    let image64  = image.toString(encoding);

    // 3. format and return
    let res = `data:${mime};${encoding},${image64}`;
    console.log(res);
    return res
}