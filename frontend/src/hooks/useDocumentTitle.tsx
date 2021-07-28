import {useEffect, useState} from "react";

const useDocumentTitle = (t: string) => {
    const [title, setTitle] = useState(t);
    useEffect(() => {
        document.title = title;
    }, [title]);

    return [title, setTitle];
};

export {useDocumentTitle};