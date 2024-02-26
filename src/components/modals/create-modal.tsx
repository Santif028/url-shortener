import { useForm } from "react-hook-form";
import { checkIfShortUrlExist, createLink } from "@/server/actions/links"
import { User } from "@supabase/supabase-js";

interface LinksProps {
    original_url: string;
    short_url: string;
}

interface ModalProps {
    open: boolean;
    onClose: () => void;
    user: User | null;
}

const CreateModal = ({ open, onClose, user }: ModalProps) => {
    const { register, handleSubmit, setValue, reset } = useForm<LinksProps>();

    const handleGenerateRandomShortUrl = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const randomShortUrl = Math.random().toString(36).substring(7);
        setValue('short_url', randomShortUrl);
    };

    const onSubmit = async (values: LinksProps) => {
        if (values.original_url === values.short_url) {
            console.log('URL and SHORT_URL cannot be the same');
            return
        }

        try {
            const shortUrlExists = await checkIfShortUrlExist(values.short_url);

            if (shortUrlExists) {
                console.log('SHORT_URL already exists');
                return
            };

            if (user) {
                await createLink(values, user);
            } else {
                console.error("User is null.");
                // Manejo de error o mensaje apropiado
            }
        } catch (error) {

        }
        onClose()
        reset();
    }

    return (
        <>

            {open && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="relative p-4 w-full max-w-md max-h-full">

                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Create New Link
                                </h3>
                                <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" onClick={onClose}>
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>

                            <form className="p-4 md:p-5" onSubmit={handleSubmit(onSubmit)}>
                                <div className="grid gap-4 mb-4 grid-cols-2">
                                    <div className="col-span-2">
                                        <label htmlFor="original_url" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Original URL</label>
                                        <input id="original_url" type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="http://example.com" required={true} {...register("original_url")} />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label htmlFor="short_url" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Short URL</label>
                                        <input id="short_url" type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="abcde" required={true} {...register("short_url")} />

                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 mt-7 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" onClick={handleGenerateRandomShortUrl}>Randomize</button>
                                    </div>
                                </div>
                                <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                    Add new Link
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>

    )
}

export default CreateModal
