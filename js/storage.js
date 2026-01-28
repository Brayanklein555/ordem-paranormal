const Storage = {
    save(key,value){
        localStorage.setItem(key, JSON.stringify(value));
    },
    load(key,def){
        return JSON.parse(localStorage.getItem(key)) || def;
    }
};
