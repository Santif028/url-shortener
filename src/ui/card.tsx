import Link from "next/link"

interface CardProps {
    original_url: string,
    short_url: string,
}

export const Card = (props: CardProps) => {

    const copyToClipboard = async (txt: string) => {
        try {
            const clipboardItem = new ClipboardItem({
                "text/plain": new Blob([txt], { type: "text/plain" }),
            });
            await navigator.clipboard.write([clipboardItem]);
        } catch (error) {
            await navigator.clipboard.writeText(txt);
        }
    };


    return (
        <div className=" max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

            <div className="flex items-center gap-5 mb-2">
                <Link href={`http://localhost:3000/s/${props.short_url}`} target="_blank" className=" text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{`/s/${props.short_url}`}</Link>
                <button onClick={() =>
                    copyToClipboard(`https://slug.vercel.app/s/${props.short_url}`)
                }>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-copy" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" stroke-linecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" /><path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" /></svg>
                </button>
            </div>
            <p className="font-normal text-gray-700 dark:text-gray-400">{props.original_url}</p>
        </div>
    )
}