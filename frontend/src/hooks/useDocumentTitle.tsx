import {useEffect, useState} from "react";

const useDocumentTitle = (t: string): [string, (title: string) => void] => {
    const [title, setTitle] = useState(t);
    useEffect(() => {
        document.title = title + " | Lesempolem";
    }, [title]);

    return [title, setTitle];
};

export {useDocumentTitle};
