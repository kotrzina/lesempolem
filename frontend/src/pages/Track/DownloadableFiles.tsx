import {FC} from "react";

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
                {props.files.map((file, fileIdx) => (
                    <li key={fileIdx}>
                        <a download href={file.path}>{file.name}</a>
                    </li>
                ))}
            </ul>
        </>
    )
}
