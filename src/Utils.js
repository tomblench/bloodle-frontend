class Utils {
    static rewriteLink(l) {
        return l.replace(":8080", ":3000");
    }
    static fetchData(url, onData, onError, options) {
        fetch(url, options)
            .then((response) => {
                if (!response.ok) {
                    onError(response.statusText);
                } else {
                    return response.json();
                }
            })
            .then(
                (result) => {
                    onData(result);
                },
                (error) => {
                    onError(error);
                }
            );
    }

}

export default Utils;
