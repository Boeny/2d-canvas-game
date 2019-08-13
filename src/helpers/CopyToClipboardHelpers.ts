
export abstract class CopyToClipboardHelpers {

    public static copyToClipboard() {
        document.execCommand("copy");
    }
}
