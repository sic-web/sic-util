const cbuebi = (props) => {
    console.log("1");
    const link = document.createElement("a");
    link.href = "ce";
    link.download = "ce";
    link.addEventListener("error", () => {
        link.remove();
    });
    link.addEventListener("click", () => {
        link.remove();
    });
    document.body.appendChild(link);
    link.click();
};

export { cbuebi };
