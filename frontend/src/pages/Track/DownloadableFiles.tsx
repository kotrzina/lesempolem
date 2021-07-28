import {FC} from "react";
import * as React from "react";

type DownloadableFilesProps = {
    files: {
        name: string;
        path: string;
    }[]
}

export const DownloadableFiles: FC<DownloadableFilesProps> = (props: DownloadableFilesProps) => {
    return (
        <>
            <h2>Ke stažení:</h2>
            <ul>
                {props.files.map(file => (
                    <li>
                        <a download href={file.path}>{file.name}</a>
                    </li>
                ))}
            </ul>
        </>
    )
}