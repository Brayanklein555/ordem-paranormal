const Backup = {
    download(){
        const data = localStorage;
        const blob = new Blob([JSON.stringify(data)],{type:"application/json"});
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "backup.json";
        a.click();
    }
};
