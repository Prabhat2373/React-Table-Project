// import moment from "moment";


export const fileDownload = async (
    url: RequestInfo | URL,
    fileName: string,
    setIsLoading?: (arg0: boolean) => any
) => {
    let date = new Date();
    let arr = url?.toString()?.split(".");

    return await fetch(url, {
        method: "GET",
    })
        .then((response) => {
            return response.blob();
        })
        .then((response) => {
            console.log("FILE RES :",response);
            
            const url = window.URL.createObjectURL(new Blob([response]));
            
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute(
                "download",
                `users.csv`
            );
            
            document.body.appendChild(link);
            link.click();
            link?.parentNode?.removeChild(link);
        })
        .finally(() => {
            setIsLoading && setIsLoading(false);
        });
};
